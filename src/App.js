import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import { useState } from 'react'

import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import SavedRecipes from './components/SavedRecipes'
import NotFound from './components/Notfound'
import RecipeItem from './components/RecipeItem'
import ProtectedRoute from './components/ProtectedRoute'
import ThemeContext from './context/ThemeContext';

const randomColors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#33FFF5', '#FFBB33', '#8A33FF', '#33FF8A'];

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * randomColors.length);
    return randomColors[randomIndex];
};

const App = () => {
  const [isDarkTheme, setDarkTheme] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [profileBgColor] = useState(getRandomColor());

  const toggleTheme = () => {
    setDarkTheme(prevState => !prevState)
  }

  const toggleSaveRecipe = (recipe) => {
    setSavedRecipes(prevState => {
        const isRecipeSaved = prevState.some(savedRecipe => savedRecipe.id === recipe.id);
        
        if (isRecipeSaved) {
            return prevState.filter(savedRecipe => savedRecipe.id !== recipe.id);
        } else {
            return [...prevState, recipe];
        }
    });
  };


  return(
    <ThemeContext.Provider
      value={{
        isDarkTheme,
        toggleTheme,
        toggleSaveRecipe,
        savedRecipes,
        profileBgColor
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={SignUp}/>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/recipes/:id" component={RecipeItem}/>
          <ProtectedRoute exact path="/saved-recipes" component={SavedRecipes}/>
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </BrowserRouter>
     </ThemeContext.Provider>
  )
}

export default App