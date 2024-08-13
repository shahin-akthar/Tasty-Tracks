import React from 'react'

const ThemeContext = React.createContext({
    isDarkTheme: false,
    toggleTheme: () => {},
    savedRecipes: [],
    toggleSaveRecipe: () => {},
    profileBgColor: '', 
    setProfileBgColor: () => {}
})

export default ThemeContext