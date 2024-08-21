const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(module => module.default(...args));

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const db = new sqlite3.Database('tasty_tracks.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
        process.exit(1);
    }
    console.log('Connected to SQLite database');
});


db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS recipes (
         id TEXT PRIMARY KEY,
        recipe_id INTEGER,
        title TEXT,
        ready_in_minutes INTEGER,
        servings INTEGER,
        image TEXT,
        ingredients TEXT,
        instructions TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS user_info (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE,
        password TEXT
    )`);
});

const API_KEY = '8c06950c724446baa0a418bcdd7eabb2';
const base_url = 'https://api.spoonacular.com/recipes';

async function fetchAndStoreRecipes() {
    const limit = 1000;

    try {
        const response = await fetch(`${base_url}/random?apiKey=${API_KEY}&number=${limit}`);
        const data = await response.json();
        const recipes = data.recipes
        await insertRecipes(recipes);
        return recipes.length;
    } catch (error) {
        console.error('Error fetching and storing recipes:', error);
    }
}

async function insertRecipes(recipes) {
    db.serialize(() => {
        const stmt = db.prepare(`INSERT INTO recipes (id, recipe_id, title, ready_in_minutes, servings, image, instructions, ingredients) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);

        recipes.forEach(recipe => {
            const uuId = uuidv4();
            const {id, title, readyInMinutes, servings, image, extendedIngredients, instructions } = recipe;

            const ingredientsWithUUIDs = extendedIngredients.map(ingredient => ({
                id: uuidv4(), 
                name: ingredient.name,
                amount: ingredient.amount,
                unit: ingredient.unit,
                image: ingredient.image
            }));

            stmt.run(uuId, id, title, readyInMinutes, servings, image, JSON.stringify(instructions), JSON.stringify(ingredientsWithUUIDs));
        });

        stmt.finalize((err) => {
            if (err) {
                console.error('Error inserting recipes:', err.message);
            } else {
                console.log(`Inserted ${recipes.length} recipes successfully`);
            }
        });
    });
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

    db.get(`SELECT * FROM user_info WHERE email = ?`, [email], async (err, user) => {
        if (err) {
            return response.status(500).json({ error: 'Internal Server Error' });
        }

        if (!user) {
            return response.status(400).json({ error: 'User not found' });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (isPasswordMatched) {
            const payload = { email };
            const jwtToken = jwt.sign(payload, process.env.JWT_TOKEN || 'jwt_token');
            response.send({ jwtToken });
        } else {
            response.status(400).json({ error: 'Incorrect Password' });
        }
    });
});

app.post('/sign-up', async (request, response) => {
    const { email, password, confirmPassword } = request.body;

    if (password !== confirmPassword) {
        return response.status(400).send('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4(); // Generate a UUID for the user

    db.run(`INSERT INTO user_info (id, email, password) VALUES (?, ?, ?)`, [userId, email, hashedPassword], function (err) {
        if (err) {
            return response.status(400).json({ error: 'User already exists' });
        }

        const payload = { email };
        const token = jwt.sign(payload, process.env.JWT_TOKEN || 'jwt_token');
        response.status(200).json({ message: 'Account successfully created', token });
    });
});


app.get('/get-recipes', async (request, response) => {
    db.all(`SELECT * FROM recipes`, [], (err, rows) => {
        if (err) {
            response.status(400).send(err.message);
        } else {
            response.json(rows);
        }
    });
});

app.get('/recipes/:id', async (request, response) => {
    const { id } = request.params;

    db.get(`SELECT * FROM recipes WHERE id = ?`, [id], (err, recipe) => {
        if (err) {
            console.error('Error executing query', err.message);
            response.status(500).json(err.message);
        } else if (recipe) {
            response.json(recipe);
        } else {
            response.status(404).json({ error: 'Recipe not found' });
        }
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
