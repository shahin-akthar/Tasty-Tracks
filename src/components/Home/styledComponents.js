import styled from 'styled-components'

const tip = {
    light: 'linear-gradient(to right, #166D3B, #1E453E, #1B8B00)', 
    dark: 'linear-gradient(319deg, #bbff99 0%, #ffec99 37%, #ff9999 100%)',  
  };

const gradientStyles = {
    light: 'linear-gradient(to right, #662D8C, #ED1E79)', 
    dark: 'linear-gradient(to right, #A9F1DF, #FFBBBB)',  
  };


  export const HomeBgContainer = styled.div`
  background-color: ${props => props.bgColor ? '#333333' : '#ebe8e8'};
  min-height: 100vh;
  padding-top: 50px;
  font-family: Georgia, serif;
  font-style: italic;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;


export const WelComeMsg = styled.p`
background: ${props => gradientStyles[props.theme]};
-webkit-background-clip: text;
color: transparent;
background-clip: text;
padding-top: 20px;
font-size: 21px;
font-weight: 650;
width: 50%;
text-align: center;

@media (max-width: 768px) {
   font-size: 18px;
   width: 70%;
}

@media (min-width: 768px) and (max-width: 1024px) {
   font-size: 19px;
   width: 65%;
}
`

export const CookingTip = styled.p`
color: ${props => props.theme === 'dark' ? 'white' : 'black'};
align-self: flex-start;
font-size: 15px;
font-weight: bold;
padding-left: 20px;
padding-top:0;

@media (max-width: 768px) {
   font-size: 14px;
   padding-left: 10px;
   
}
   
@media (min-width: 768px) and (max-width: 1024px) {
   font-size: 16px;
   padding-left: 15px;
}`

export const Span = styled.span`
background: ${props => tip[props.theme]};
-webkit-background-clip: text;
color: transparent;
background-clip: text;
font-size: 15px;
font-weight: bold;
padding-left: 5px;
padding-top:0;
box-sizing: border-box;

@media (max-width: 768px) {
   font-size: 14px; 
}
   
@media (min-width: 768px) and (max-width: 1024px) {
   font-size: 16px;
   
}`

export const RecipesContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  width: 100%; 
  list-style-type: none; 
  margin: 0;
`

export const RecipeList = styled.li`
background-color: ${props => props.bgColor ? 'black' : 'white'};
margin: 15px;

@media (max-width: 768px) {
  margin: 10px;
}`

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
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
`

export const FailureImage = styled.img`
  height: 60vh;
  border-radius: 10px;

@media (max-width: 768px) {
   height: 50vh;
   width: 60vw;
}
   
@media (min-width: 768px) and (max-width: 1024px) {
   height: 45vh;
   width: 55vw;

}
`

export const NoResultsMsg = styled.p`
  color: ${props => props.color ? 'white' : 'black'};
  font-size: 30px;
  font-weight: 550;

@media (max-width: 768px) {
   font-size: 23px;
}
   
@media (min-width: 768px) and (max-width: 1024px) {
  font-size: 27px;
}
`

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px;
    width: 100%; 
    box-sizing: border-box;
`;

export const PageButton = styled.button`
    padding: 10px 15px;
    margin: 0 5px;
    border: 1px solid #ddd;
    background: ${props => props.active ? '#0b69ff' : '#fff'};
    color: ${props => props.active ? '#fff' : '#0b69ff'};
    cursor: pointer;
    font-family: Georgia, serif;
    font-style: italic;
    font-weight: 600;
    font-size: 15px;
    border-radius: 5px;
    &:hover {
        background: #ddd;
    }
`;

export const Ellipsis = styled.span`
    padding: 10px 15px;
    margin: 0 5px;
    border: 1px solid #ddd;
    background: #fff;
    color: #0b69ff;
`;