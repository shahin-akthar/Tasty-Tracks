import { Link } from 'react-router-dom';
import ThemeContext from '../../context/ThemeContext';
import './index.css';

import { RiTimerFill } from "react-icons/ri";
import { MdBookmarkAdd, MdBookmarkAdded } from "react-icons/md";
import { FaUtensils } from 'react-icons/fa';

import { ThumbnailImg, Title, RecipeList, DivContainer, TimingContainer, Icon, ParaElm } from './styledComponent';

const Recipes = props => {
  const convertMinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return { hours, minutes: remainingMinutes };
  };

  const displayTime = (time) => {
    if (time > 60) {
      const { hours, minutes } = convertMinutesToHours(time);
      return `${hours} hrs ${minutes} mins`;
    }
    return `${time} mins`;
  };

  return (
    <ThemeContext.Consumer>
      {value => {
        const { isDarkTheme, savedRecipes, toggleSaveRecipe } = value;
        const { recipe } = props;

        const isSaved = savedRecipes.some(recipeId => recipeId.id === recipe.id);
        console.log(isSaved);

        return (
          <RecipeList bgColor={isDarkTheme}>
            <Link to={`recipes/${recipe.id}`} className='link-item'>
              <ThumbnailImg src={recipe.recipeImage} alt='recipe image' />
            </Link>
            <Link to={`recipes/${recipe.id}`} className='link-item'>
              <Title theme={isDarkTheme ? 'dark' : 'light'}>{recipe.title}</Title>
            </Link>
            <DivContainer>
              <div>
                <TimingContainer>
                  <Icon color={isDarkTheme}><FaUtensils /> :</Icon>
                  <ParaElm theme={isDarkTheme ? 'dark' : 'light'}>{recipe.servings}</ParaElm>
                </TimingContainer>
                <TimingContainer>
                  <Icon color={isDarkTheme}>
                    <RiTimerFill /> :
                  </Icon>
                  <ParaElm theme={isDarkTheme ? 'dark' : 'light'}>{displayTime(recipe.readyInMinutes)}</ParaElm>
                </TimingContainer>
              </div>
              <Icon color={isDarkTheme} onClick={() => toggleSaveRecipe(recipe)}>{isSaved ? <MdBookmarkAdded /> : <MdBookmarkAdd />}</Icon>
            </DivContainer>
          </RecipeList>
        );
      }}
    </ThemeContext.Consumer>
  );
};

export default Recipes;
