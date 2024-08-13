import styled from "styled-components";

export const NotFoundContainer = styled.div`
  background-color: ${props => props.theme === 'dark' ? '#333333' : '#ebe8e8'};
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;`

export const NotFoundImg = styled.img`
width: 50%;
height: 70%;
margin-top: 70px;

@media (max-width: 768px) {
  height: 60%;
  width: 70%;
}
  
@media (min-width: 768px) and (max-width: 1024px) {
  height: 65%;
  width: 65%
}`

export const NotFoundContent = styled.h1`
color: ${props => props.theme === 'dark' ? 'white' : 'black'};
font-family: Georgia, serif;
font-style: italic;

@media (max-width: 768px) {
  font-size: 23px;
  padding-top: 20px;
}
  
@media (min-width: 768px) and (max-width: 1024px) {
  font-size: 26px;
  padding-top: 25px;
}`

