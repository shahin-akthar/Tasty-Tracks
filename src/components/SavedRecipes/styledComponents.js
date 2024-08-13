import styled from "styled-components";

const gradientStyles = {
    light: 'linear-gradient(to right, #662D8C, #ED1E79)', 
    dark: 'linear-gradient(to right, #A9F1DF, #FFBBBB)',  
  };


export const SavedBgContainer = styled.div`
background-color: ${props => props.bgColor ? '#333333' : '#ebe8e8'};
  min-height: 100vh;
  padding-top: 50px;
  font-family: Georgia, serif;
  font-style: italic;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;`

export const RecipesContainer = styled.ul`
display: flex;
  flex-wrap: wrap;
  padding: 10px;
  box-sizing: border-box;
  width: 100%; 
  list-style-type: none; 
  margin: 0;`

export const NoRecipesContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;`

export const NoRecipesImg = styled.img`
width: 50%;
height: 75%;

@media (max-width: 1024px) {
  height: 60vh;
  width: 75vw;
}`

export const HeadingEl = styled.h1`
background: ${props => gradientStyles[props.theme]};
-webkit-background-clip: text;
color: transparent;
background-clip: text;
font-size: 25px;

@media (max-width: 568px) {
  font-size: 18px;
  text-align: center;
}

@media (min-width: 568px) and (max-width: 768px) {
  font-size: 20px;
  text-align: center;
}
  
@media (min-width: 768px) and (max-width: 1024px) {
  font-size: 22px;
  text-align: center;
}`

export const AddButton = styled.button`
color: ${props => props.theme === 'dark' ? 'white' : 'black'};
background: transparent;
outline: none;
border: 2px solid ${props => props.theme ? 'black' : 'white'};
font-size: 18px;
font-weight: 650;
border-radius: 5px;
cursor: pointer;
outline: none;
font-family: Georgia, serif;
padding: 10px;
margin: 10px;
font-style: italic;

@media (max-width: 768px) {
  font-size: 15px;
}
  
@media (min-width: 768px) and (max-width: 1024px) {
  font-size: 17px;
}`

export const SavedContainer = styled.div`
display: flex;
flex-direction: column;
padding: 10px;`

export const RowContainer = styled.div`
display: flex;`