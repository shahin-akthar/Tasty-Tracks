import styled from 'styled-components'

const step = {
  light: 'linear-gradient(to right, #013818, #1E453E, #1B8B00)', 
  dark: 'linear-gradient(319deg, #bbff99 0%, #ffec99 37%, #ff9999 100%)',  
};

const gradientStyles = {
    light: 'linear-gradient(to right, #662D8C, #ED1E79)', 
    dark: 'linear-gradient(to right, #A9F1DF, #FFBBBB)',  
  };

export const RecipeItemBgContainer = styled.div`
background-color: ${props => props.theme === 'dark' ? '#333333' : '#ebe8e8'};
min-height: 100vh;
padding-top: 50px;
font-family: Georgia, serif;
font-style: italic;
overflow: hidden;
display: flex;
flex-direction: column;
box-sizing: border-box;
`;

export const ContainerOfTitle = styled.div`
display: flex;
margin-top: 40px;
margin-left: 15px;

@media  (max-width: 768px) {
  flex-direction: column;
}`

export const ContainerOfIngredients = styled.div`
display: flex;
margin-top: 10px;
margin-left: 15px;
flex-wrap: wrap;`

export const TitleContainer = styled.div`
padding-top: 40px;
padding-left: 40px;

@media  (max-width: 768px) {
  padding-left: 0;
}`

export const RecipeImg = styled.img`
border-radius: 5px;
margin-left: 50px;

@media  (max-width: 768px) {
  width: 85%;
  align-self: center;
  margin-left: 0;
}

@media (min-width: 768px) and (max-width: 1024px) {
  width: 50%;
}
`

export const RecipeTitle = styled.h1`
background: ${props => gradientStyles[props.theme]};
-webkit-background-clip: text;
color: transparent;
background-clip: text;
font-size: 35px;

@media  (max-width: 768px) {
  font-size: 26px;
}
  
@media (min-width: 768px) and (max-width: 1024px) {
  font-size: 31px;
}`

export const RecipeTiming = styled.p`
background: ${props => gradientStyles[props.theme]};
-webkit-background-clip: text;
color: transparent;
background-clip: text;
font-size: 20px;
font-weight: 600;

@media  (max-width: 768px) {
  font-size: 16px;
}
  
@media (min-width: 768px) and (max-width: 1024px) {
  font-size: 18px;
}`

export const Icon = styled.button`
background: none;
color: ${props => props.color ? 'white' : 'black'};
font-size: 40px;
margin: 5px;
border: none;
cursor: pointer;`

export const UnorderedList = styled.ul`
  list-style-type: none;
  padding-left: 5px;
  padding-right:0;
  padding-top:0;
  padding-bottom:0;
  margin-bottom: 20px;
`;


export const ListItem = styled.span`
font-size: 17px; 
background: ${props => step[props.theme]};
-webkit-background-clip: text;
background-clip: text;
color: transparent;
font-weight: 600;
padding-left: 10px;

@media  (max-width: 768px) {
  font-size: 14px;
}

@media (min-width: 768px) and (max-width: 1024px) {
  font-size: 16px;
}
`;

export const SpanEl = styled.span`
font-size: 18px;
color: ${props => props.theme === 'dark' ? 'white' : 'black'};
font-weight: 600;
padding-left: 50px;
padding-bottom: 10px;
display: inline-block;  

@media  (max-width: 768px) {
  font-size: 14px;
  padding-left: 30px;
}

@media (min-width: 768px) and (max-width: 1024px) {
  font-size: 16px;
}
`

export const BackIcon = styled.div`
color: ${props => props.theme === 'dark' ? 'white' : 'black'};
font-size: 25px;
cursor: pointer;`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 88%;
  min-height: 80vh;
`
export const NoResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;
  width: 100%;
`

export const FailureImage = styled.img`
  height: 60vh;
  border-radius: 10px;
  margin-top: 20px;
`

export const NoResultsMsg = styled.p`
  color: ${props => props.color ? 'white' : 'black'};
  font-size: 30px;
  font-weight: 550;
`

export const IngredientHeading = styled.h1`
padding-left: 30px;
padding-bottom: 0;
background: ${props => gradientStyles[props.theme]};
-webkit-background-clip: text;
color: transparent;
background-clip: text;
font-size: 30px;

@media  (max-width: 768px) {
  font-size: 26px;
  padding-left: 15px;
}
  
@media (min-width: 768px) and (max-width: 1024px) {
  font-size: 28px;
}`

export const IngredientContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
  flex-wrap: wrap;
  padding: 10px;

@media  (max-width: 768px) {
  margin-left: 10px;
  padding: 5px;
}
`;

export const IngredientImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  

@media  (max-width: 768px) {
  width: 55px;
  height: 55px;
}

@media (min-width: 768px) and (max-width: 1024px) {
  height: 60px;
  width: 60px;
}
`;

export const IngredientInfo = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: ${props => props.theme ==='dark' ? 'white' : 'black'};
  
@media  (max-width: 768px) {
  font-size: 13px;
}`