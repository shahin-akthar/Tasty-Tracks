import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
import ThemeContext from '../../context/ThemeContext';
import { HomeBgContainer, WelComeMsg, CookingTip, Span, RecipesContainer, LoaderContainer, FailureImage, NoResultContainer, NoResultsMsg, PageButton, PaginationContainer } from "./styledComponents"
import Header from '../Header'
import Recipes from '../Recipes'

const tips = [
    "For better searing and even cooking, always preheat your pan before adding ingredients. This helps in achieving a golden-brown crust and ensures even cooking.",
    "Salt your pasta water to enhance the flavor of the pasta. The water should taste slightly salty, like seawater.",
    "Before cooking, let meat come to room temperature. This ensures even cooking and a more consistent texture.",
    "For baked goods like cookies or pastries, chilling the dough before baking can help achieve better texture and prevent spreading.",
    "Cooking with a lid on your pot or pan can speed up the cooking process and help retain moisture and flavor.",
    " To check if eggs are fresh, place them in a bowl of water. Fresh eggs will sink and lay flat, while old eggs will float.",
    "Oven temperatures can vary. Use an oven thermometer to ensure your oven is at the correct temperature for baking.",
    "After cooking, let meat rest for a few minutes before slicing. This helps the juices redistribute and keeps the meat moist.",
    "A splash of vinegar or a squeeze of lemon can brighten and balance the flavors of your dish, especially if it’s too rich or salty.",
    "For the best texture, cook pasta until it’s al dente, or firm to the bite. This prevents it from becoming mushy when mixed with sauce.",
    "Set a timer for cooking times, especially for baked goods. This helps prevent overcooking and ensures consistent results.",
    "When making baked goods, mix the batter just until combined. Overmixing can lead to tough, dense results.",
    "Blanch vegetables in boiling water for a short time, then shock them in ice water. This helps preserve their color and texture, especially for salads and garnishes.",
    "When cooking rice, use a tight-fitting lid and avoid lifting it while cooking. This helps the rice steam properly and prevents it from becoming mushy.",
    "Soak dried beans in water before cooking to reduce cooking time and improve their texture. It also helps with digestion."
]

const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    return tips[randomIndex];
};

const apiStatusConstants = {
    initial: 'INITIAL',
    inProgress: 'INPROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
  }

const shuffleArray = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

const Home = () => {
    const { isDarkTheme } = useContext(ThemeContext);
    const [searchInput, setSearchInput] = useState('');
    const [tip, setTip] = useState('');
    const [recipesList, setRecipes] = useState([]);
    const [apiStatus, setStatus] = useState(apiStatusConstants.initial);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 20; // Adjust this to the number of recipes you want per page

    const onChangeSearchInput = (event) => {
        setSearchInput(event.target.value);
    };

    useEffect(() => {
        setTip(getRandomTip());
    }, []);

    useEffect(() => {
        const fetchRecipes = async () => {
            setStatus(apiStatusConstants.inProgress);
            const jwtToken = Cookies.get('jwt_token');
            const apiUrl = 'http://localhost:3000/get-recipes';
            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            };

            try {
                const response = await fetch(apiUrl, options);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    const updateList = shuffleArray(
                        data.map((eachRecipe) => ({
                            id: eachRecipe.id,
                            title: eachRecipe.title,
                            readyInMinutes: eachRecipe.ready_in_minutes,
                            servings: eachRecipe.servings,
                            recipeImage: eachRecipe.image,
                        }))
                    );
                    setRecipes(updateList);
                    setStatus(apiStatusConstants.success);
                } else {
                    console.log('error');
                    setStatus(apiStatusConstants.failure);
                }
            } catch (error) {
                console.error('Fetch error:', error);
                setStatus(apiStatusConstants.failure);
            }
        };
        fetchRecipes();
    }, []);

    const renderLoader = () => (
        <LoaderContainer data-testid="loader">
            <ThreeDots color="#0b69ff" height="50" width="50" />
        </LoaderContainer>
    );

    const renderNoResults = () => (
        <NoResultContainer>
            <FailureImage src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150544943.jpg?size=626&ext=jpg&ga=GA1.1.634398133.1721998960&semt=ais_user" alt="failure image" />
            <NoResultsMsg color={isDarkTheme}>Oops... No results found</NoResultsMsg>
        </NoResultContainer>
    );

    const query = searchInput || '';

    const filteredRecipes = recipesList.filter((recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase())
    );

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    
        const visiblePages = [];
        if (totalPages <= 5) {
            visiblePages.push(...pageNumbers);
        } else {
            const firstPage = 1;
            const lastPage = totalPages;
            const delta = 1;
            const left = Math.max(currentPage - delta, firstPage + 1);
            const right = Math.min(currentPage + delta, lastPage - 1);
    
            visiblePages.push(firstPage);
            if (left > firstPage + 1) {
                visiblePages.push('...');
            }
            for (let i = left; i <= right; i++) {
                visiblePages.push(i);
            }
            if (right < lastPage - 1) {
                visiblePages.push('...');
            }
            visiblePages.push(lastPage);
        }
    
        return (
            <PaginationContainer>
                {visiblePages.map((number, index) => (
                    <PageButton
                        key={index}
                        onClick={() => {
                            if (number !== '...') {
                                handlePageChange(number);
                            }
                        }}
                        active={number === currentPage}
                    >
                        {number}
                    </PageButton>
                ))}
            </PaginationContainer>
        );
    };
    

    const renderHomeRecipes = () => (
        <>
        <RecipesContainer>
            {currentRecipes.length === 0
                ? renderNoResults()
                : currentRecipes.map((each) => <Recipes key={each.id} recipe={each} />)}
        </RecipesContainer>
        <PaginationContainer>
            {renderPagination()}
        </PaginationContainer>
        </>
    );

    const renderFailureView = () => (
        <NoResultContainer>
            <FailureImage src="https://ih1.redbubble.net/image.1937257523.0326/st,small,507x507-pad,600x600,f8f8f8.jpg" alt="failure image" />
            <NoResultsMsg color={isDarkTheme}>Please try again later</NoResultsMsg>
        </NoResultContainer>
    );

    let renderBasedOnApiStatus;

    switch (apiStatus) {
        case apiStatusConstants.failure:
            renderBasedOnApiStatus = renderFailureView();
            break;
        case apiStatusConstants.inProgress:
            renderBasedOnApiStatus = renderLoader();
            break;
        case apiStatusConstants.success:
            renderBasedOnApiStatus = renderHomeRecipes();
            break;
        default:
            renderBasedOnApiStatus = '';
            break;
    }

    return (
        <>
            <Header searchChange={onChangeSearchInput} />
            <HomeBgContainer bgColor={isDarkTheme}>
                <WelComeMsg theme={isDarkTheme ? 'dark' : 'light'}>
                    Discover recipes that turn everyday moments into delicious memories.
                </WelComeMsg>
                <CookingTip theme={isDarkTheme ? 'dark' : 'light'}>
                    Cooking Tip:- <Span theme={isDarkTheme ? 'dark' : 'light'}>{tip}</Span>
                </CookingTip>
                {renderBasedOnApiStatus}
            </HomeBgContainer>
        </>
    );
};

export default Home;