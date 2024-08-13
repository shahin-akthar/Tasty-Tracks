import styled from "styled-components";

const gradientStyles = {
    light: 'linear-gradient(to right, #662D8C, #ED1E79)', 
    dark: 'linear-gradient(to right, #A9F1DF, #FFBBBB)',  
  };

export const ChartContainer = styled.div`
    width: 70%;   
    margin: 20px auto; 
    display: flex;
    align-items: center;
    justify-content: center;

@media (max-width: 768px) {
  width: 100%;
}
  
@media (min-width: 768px) and (max-width: 1024px) {
  width: 80%;
}
`;

export const NutritionsHeading = styled.h1`
padding-left: 30px;
padding-bottom: 0;
background: ${props => gradientStyles[props.theme]};
-webkit-background-clip: text;
color: transparent;
background-clip: text;
font-size: 30px;

@media (max-width: 768px) {
  padding-left: 15px;
  font-size: 26px;
}
  
@media (min-width: 768px) and (max-width: 1024px) {
  font-size: 28px;
}`
