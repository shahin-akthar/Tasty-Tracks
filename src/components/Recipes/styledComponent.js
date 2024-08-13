import styled from 'styled-components'

const gradientStyles = {
    light: 'linear-gradient(to right, #662D8C, #ED1E79)', 
    dark: 'linear-gradient(to right, #A9F1DF, #FFBBBB)',  
  };

export const RecipeList = styled.li`
  background-color: ${props => props.bgColor ? 'black' : 'white'};
  margin: 15px;
  border-radius: 10px;
  width: 300px;
  cursor: pointer;
  box-shadow: ${props => props.bgColor ? '10px 10px 10px rgba(0, 0, 0, 0.5)' : '10px 10px 10px rgba(0, 0, 0, 0.2)'};
`

export const ThumbnailImg = styled.img`
border-top-left-radius: 10px;
border-top-right-radius: 10px;
width: 300px;
`

export const Title = styled.h1`
font-size: 20px;
padding-left: 10px;
background: ${props => gradientStyles[props.theme]};
-webkit-background-clip: text;
color: transparent;
background-clip: text;`

export const DivContainer = styled.div`
display: flex;
justify-content: space-between;`

export const TimingContainer = styled.div`
display: flex;`

export const Icon = styled.button`
background: none;
color: ${props => props.color ? 'white' : 'black'};
font-size: 25px;
margin: 5px;
border: none;
cursor: pointer;`

export const ParaElm = styled.p`
font-size: 20px;
background: ${props => gradientStyles[props.theme]};
-webkit-background-clip: text;
color: transparent;
background-clip: text;
font-weight: 600;`