const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); 
const cors = require('cors');

const fetch = (...args) => import('node-fetch').then(module => module.default(...args));

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'shahin@28',
    database: 'tasty-tracks',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const API_KEY = '8c06950c724446baa0a418bcdd7eabb2';
const base_url = 'https://api.spoonacular.com/recipes';

async function fetchAndStoreRecipes() {
    const limit = 1000;

    try {
        const response = await fetch(`${base_url}/random?apiKey=${API_KEY}&number=${limit}`);
        const data = await response.json();
        const recipes = data.recipes;
        await insertRecipes(recipes);
        return recipes.length;
    } catch (error) {
        console.error('Error fetching and storing recipes:', error);
    }
}

async function insertRecipes(recipes) {
    const query = `INSERT INTO recipes (id, recipe_id, title, ready_in_minutes, servings, image, ingredients, instructions)
                   VALUES ?`;

    const values = recipes.map(recipe => {
        const uuid = uuidv4(); 
        const { id, title, readyInMinutes, servings, image, extendedIngredients, instructions } = recipe;
        const ingredientsJson = JSON.stringify(extendedIngredients.map(ingredient => ({
            id: uuidv4(),
            image: ingredient.image,
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit
        })));
        const instructionsJson = JSON.stringify(instructions);
        return [uuid, id, title, readyInMinutes, servings, image, ingredientsJson, instructionsJson];
    });

    try {
        await pool.query(query, [values]);
        console.log(`Inserted ${values.length} recipes successfully`);
    } catch (error) {
        console.error('Error inserting recipes:', error);
    }
}

app.get('/recipes', async (request, response) => {
    try {
        const storedCount = await fetchAndStoreRecipes();
        response.json({ message: `Stored ${storedCount} recipes successfully` });
    } catch (error) {
        response.status(500).json({ error: 'Failed to fetch and store recipes' });
    }
});

app.post('/login', async (request, response) => {
    const { email, password } = request.body;

    try {
        const [rows] = await pool.execute('SELECT * FROM user_info WHERE email = ?', [email]);
        if (rows.length === 0) {
            return response.status(400).json({ error: 'User not found' });
        }

        const isPasswordMatched = await bcrypt.compare(password, rows[0].password);
        if (isPasswordMatched) {
            const payload = { emailId: email };
            const jwtToken = jwt.sign(payload, "jwt_token");
            response.send({ jwtToken });
        } else {
            response.status(400).json({ error: 'Incorrect Password' });
        }
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/sign-up', async (request, response) => {
    const { email, password, confirmPassword } = request.body;

    if (password !== confirmPassword) {
        return response.status(400).send('Passwords do not match');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv4();

        const [existingUser] = await pool.execute('SELECT * FROM user_info WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return response.status(400).json({error : 'User already exists'});
        } else {
            await pool.execute('INSERT INTO user_info (user_id, email, password) VALUES (?, ?, ?)', [userId, email, hashedPassword]);
        
            const payload = { email };
            const token = jwt.sign(payload, "jwt_token", { expiresIn: '3d' });
            response.status(200).json({
                message: 'Account successfully created',
                token
            });
        }
    } catch (error) {
        response.status(500).json({error: 'Error in creating account'});
    }
});


app.get('/get-recipes', async (request, response) => {
    try {
        const [rows] = await pool.query('SELECT * FROM recipes');
        response.json(rows);
    } catch (error) {
        response.status(400).send(error);
    }
});

app.get('/recipes/:id', async (request, response) => {
    const { id } = request.params; 
    console.log(id)
    try {
      const [rows] = await pool.query('SELECT * FROM recipes WHERE id = ?', [id]);
      if (rows.length > 0) {
        response.json(rows[0]);
      } else {
        response.status(404).json({ error: 'Recipe not found' });
      }
    } catch (error) {
      console.error('Error executing query', error);
      response.status(500).json(error);
    }
  });

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
