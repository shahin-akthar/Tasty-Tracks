import { useContext, useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import ThemeContext from '../../context/ThemeContext';
import { ChartContainer, NutritionsHeading } from './styledComponents';

const NutritionalValues = props => {
    const { isDarkTheme } = useContext(ThemeContext);
    const [nutritionalData, setNutritionalData] = useState([]);
    const { recipeId } = props;

    useEffect(() => {
        const fetchRecipeData = async () => {
            try {
                const url = `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=8c06950c724446baa0a418bcdd7eabb2`;
                const options = {
                    method: 'GET',
                };

                const response = await fetch(url, options);

                if (response.ok) {
                    const data = await response.json();

                    const topNutrients = [
                        { name: 'Calories', amount: parseFloat(data.calories), percentOfDailyNeeds: 33.26 },
                        { name: 'Carbohydrates', amount: parseFloat(data.carbs), percentOfDailyNeeds: 38.73 },
                        { name: 'Fat', amount: parseFloat(data.fat), percentOfDailyNeeds: 32.26 },
                        { name: 'Protein', amount: parseFloat(data.protein), percentOfDailyNeeds: 16.53 },
                    ];

                    const additionalNutrients = data.good.reduce((arr, item) => {
                        if (item.title.toLowerCase() === 'calcium') {
                            arr.push({ name: 'Calcium', amount: parseFloat(item.amount), percentOfDailyNeeds: item.percentOfDailyNeeds });
                        } else if (item.title.toLowerCase() === 'fiber') {
                            arr.push({ name: 'Fiber', amount: parseFloat(item.amount), percentOfDailyNeeds: item.percentOfDailyNeeds });
                        }
                        return arr;
                    }, []);

                    const combinedNutrients = [...topNutrients, ...additionalNutrients];
                    setNutritionalData(combinedNutrients);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchRecipeData();
    }, [recipeId]);

    const themeColors = {
        light: {
            primary: '#D64161FF',   
            secondary: '#435E55FF', 
        },
        dark: {
            primary: '#2DA8D8FF',  
            secondary: '#FC766AFF', 
        }
    };

    const currentTheme = isDarkTheme ? themeColors.dark : themeColors.light;

    return (
        <>
        <NutritionsHeading theme={isDarkTheme ? 'dark' : 'light'}>
            Nutritional values of the Recipe:-
        </NutritionsHeading>
        <ChartContainer theme={isDarkTheme ? 'dark' : 'light'}>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={nutritionalData}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke={currentTheme.text} />
                    <XAxis dataKey="name" stroke={currentTheme.text} />
                    <YAxis stroke={currentTheme.text} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="percentOfDailyNeeds" fill={currentTheme.secondary} name="Percent of Daily Needs" />
                    <Bar dataKey="amount" fill={currentTheme.primary} name="Amount in recipe" />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
        </>
    );
}

export default NutritionalValues;
