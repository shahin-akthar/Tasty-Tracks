import Cookies from 'js-cookie';
import { useContext, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'; 

import { IoArrowBackOutline } from "react-icons/io5";
import { MdBookmarkAdd, MdBookmarkAdded } from "react-icons/md";

import Header from '../Header';
import ThemeContext from '../../context/ThemeContext';
import cleanContent from '../../utils/contentUtils'; 
import NutritionalValues from '../NutritionalValues';

import { RecipeItemBgContainer, TitleContainer, RecipeImg, RecipeTitle, RecipeTiming, Icon, UnorderedList, ListItem, SpanEl, BackIcon, LoaderContainer, NoResultContainer, FailureImage, NoResultsMsg, IngredientContainer, IngredientImage, IngredientInfo, ContainerOfTitle, ContainerOfIngredients, IngredientHeading } from './styledComponents';

const apiStatusConstants = {
    initial: 'INITIAL',
    inProgress: 'INPROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
};

const RecipeItem = () => {
    const [recipeDetails, setRecipeDetails] = useState({});
    const [apiStatus, setStatus] = useState(apiStatusConstants.initial);
    const { id } = useParams(); 
    const { isDarkTheme, savedRecipes, toggleSaveRecipe } = useContext(ThemeContext);
    const history = useHistory();

    useEffect(() => {
        const fetchRecipeData = async () => {
            setStatus(apiStatusConstants.inProgress);
            try {
                const jwtToken = Cookies.get('jwt_token');
                const url = `https://aktharrepo.onrender.com/recipes/${id}`;
                const options = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                };

                const response = await fetch(url, options);

                if (response.ok) {
                    const data = await response.json();
                    const convertCase = {
                        id: data.id, 
                        recipeId: data.recipe_id,
                        recipeImage: data.image,
                        title: data.title,
                        readyInMinutes: data.ready_in_minutes,
                        servings: data.servings,
                        ingredients: data.ingredients || '[]', 
                        instructions: data.instructions || '' 
                    };
                    console.log(convertCase)
                    setRecipeDetails(convertCase);
                    setStatus(apiStatusConstants.success);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error(error);
                setStatus(apiStatusConstants.failure);
            }
        };

        fetchRecipeData();
    }, [id]);

    const clickBackIcon = () => {
        history.push('/');
    };

    const ingredientUrl = 'https://img.spoonacular.com/ingredients_100x100/';

    const { recipeImage, title, recipeId, readyInMinutes, servings, ingredients = '[]', instructions } = recipeDetails;
    const cleanedInstructions = cleanContent(instructions);

    const createStepElements = (html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const listItems = Array.from(doc.querySelectorAll('li'));
      
        // If there are no <li> elements, log and return an empty array
        if (listItems.length === 0) {
          console.warn('No <li> elements found in instructions');
          return [];
        }
      
        return listItems.map((li, index) => {
          const textContent = li.textContent.trim();
          const [stepLabel, ...stepContentParts] = textContent.split(':');
          const stepContent = stepContentParts.join(':').trim();
      
          return (
            <li key={index} isLabel>
              <SpanEl theme={isDarkTheme ? 'dark' : 'light'}>{stepLabel}:</SpanEl>
              <ListItem theme={isDarkTheme ? 'dark' : 'light'}>{stepContent}</ListItem>
            </li>
          );
        });
      };
      

    const isSaved = savedRecipes.some(recipe => recipe.id === id);
    console.log(isSaved)

    let parsedIngredients = [];
    try {
        parsedIngredients = JSON.parse(ingredients);
    } catch (error) {
        console.error("Error parsing ingredients:", error);
    }

    const renderLoader = () => (
        <LoaderContainer data-testid="loader">
            <ThreeDots color="#0b69ff" height="50" width="50" />
        </LoaderContainer>
    );

    const renderNoResults = () => (
        <NoResultContainer>
            <FailureImage src='https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150544943.jpg?size=626&ext=jpg&ga=GA1.1.634398133.1721998960&semt=ais_user' alt='failure image'/>
            <NoResultsMsg color={isDarkTheme}>Oops... No results found</NoResultsMsg>
        </NoResultContainer>
    );

    const renderFailureView = () => (
        <NoResultContainer>
            <FailureImage src='https://ih1.redbubble.net/image.1937257523.0326/st,small,507x507-pad,600x600,f8f8f8.jpg' alt='failure image'/>
            <NoResultsMsg color={isDarkTheme}>Please try again later</NoResultsMsg>
        </NoResultContainer>
    )

    const renderSuccessView = () => {
        if (!recipeDetails) {
            return renderNoResults();
        }
    
        return (
            <RecipeItemBgContainer theme={isDarkTheme ? 'dark' : 'light'}>
                <ContainerOfTitle>
                    <BackIcon theme={isDarkTheme ? 'dark' : 'light'}>
                        <IoArrowBackOutline onClick={clickBackIcon} />
                    </BackIcon>
                    <RecipeImg src={recipeImage} alt='recipe image' />
                    <TitleContainer>
                        <RecipeTitle theme={isDarkTheme ? 'dark' : 'light'}>{title}</RecipeTitle>
                        <RecipeTiming theme={isDarkTheme ? 'dark' : 'light'}>
                            Servings: {servings}
                        </RecipeTiming>
                        <RecipeTiming theme={isDarkTheme ? 'dark' : 'light'}>
                            Ready In Minutes: {readyInMinutes}
                        </RecipeTiming>
                        <Icon color={isDarkTheme} onClick={() => toggleSaveRecipe(recipeDetails)}>
                            {isSaved ? <MdBookmarkAdded /> : <MdBookmarkAdd />}
                        </Icon>
                    </TitleContainer>
                </ContainerOfTitle>
                <IngredientHeading theme={isDarkTheme ? 'dark' : 'light'}>
                    Ingredients:-
                </IngredientHeading>
                <ContainerOfIngredients>
                    {parsedIngredients.map(ingredient => (
                        <IngredientContainer key={ingredient.id}>
                            <IngredientImage
                                src={`${ingredientUrl}${ingredient.image}`}
                                alt={ingredient.name}
                            />
                            <IngredientInfo theme={isDarkTheme ? 'dark' : 'light'}>
                                {ingredient.amount} {ingredient.unit} {ingredient.name}
                            </IngredientInfo>
                        </IngredientContainer>
                    ))}
                </ContainerOfIngredients>
                <IngredientHeading theme={isDarkTheme ? 'dark' : 'light'}>
                    Instructions:-
                </IngredientHeading>
                <UnorderedList>
                    {createStepElements(cleanedInstructions)}
                </UnorderedList>
                <NutritionalValues recipeId={recipeId}/>
            </RecipeItemBgContainer>
        );
    }
    
    let renderBasedOnApiStatus

    switch (apiStatus) {
        case apiStatusConstants.failure:
            renderBasedOnApiStatus = renderFailureView()
            break
        case apiStatusConstants.inProgress:
            renderBasedOnApiStatus = renderLoader()
            break
        case apiStatusConstants.success:
            renderBasedOnApiStatus = renderSuccessView()
            break
        default:
            renderBasedOnApiStatus = ''
            break
    }
    return (
        <>
            <Header />
            {renderBasedOnApiStatus}
        </>
    );
}

export default RecipeItem;
