import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ThemeContext from '../../context/ThemeContext';
import Header from '../Header';
import Recipes from '../Recipes';

import {
  SavedBgContainer,
  RecipesContainer,
  HeadingEl,
  NoRecipesContainer,
  NoRecipesImg,
  AddButton,
  SavedContainer,
  RowContainer
} from './styledComponents';

const SavedRecipes = () => {
  const { isDarkTheme, savedRecipes, searchQuery } = useContext(ThemeContext);
  const history = useHistory();

  const clickAddBtn = () => {
    history.push('/');
  };

  const query = searchQuery || '';

    const filteredRecipes = savedRecipes.filter(recipe =>
         recipe.title.toLowerCase().includes(query.toLowerCase())
    );

  const renderSavedRecipes = () => (
    <RecipesContainer>
      {savedRecipes.length === 0 ? (
        <NoRecipesContainer>
          <NoRecipesImg
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="No saved recipes available"
          />
          <HeadingEl theme={isDarkTheme ? 'dark' : 'light'}>
            It looks like you haven’t saved any recipes yet. Why not explore and add some to your collection?
          </HeadingEl>
          <AddButton onClick={clickAddBtn} theme={isDarkTheme ? 'dark' : 'light'}>
            Explore Now
          </AddButton>
        </NoRecipesContainer>
      ) : (
        <SavedContainer>
            <HeadingEl theme={isDarkTheme ? 'dark' : 'light'}>
                Your recipe collection is ready for you. Let the cooking adventures begin!
            </HeadingEl>
            <RowContainer>
                {filteredRecipes.map(recipe => (
                    <Recipes key={recipe._id} recipe={recipe} />
                ))}
           </RowContainer>
        </SavedContainer>
      )}
    </RecipesContainer>
  );

  return (
    <>
      <Header />
      <SavedBgContainer bgColor={isDarkTheme}>
        {renderSavedRecipes()}
      </SavedBgContainer>
    </>
  );
};

export default SavedRecipes;
