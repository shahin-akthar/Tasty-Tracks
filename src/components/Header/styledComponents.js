import styled from 'styled-components'

export const HeaderBgContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 99%;
    height: 50px;
    overflow: hidden;
    position: fixed;
    background-color: ${props => props.bgColor ? 'black' : 'white'};
    padding: 10px;
    color: ${props => props.bgColor ? 'white' : 'black'};
`

export const LogoContainer = styled.div`
flex: 1;`

export const DetailsContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`;

export const SearchInput = styled.input`
background-color: ${props => props.bgColor ? '#333333' : '#ebe8e8'};
padding: 10px;
outline: none;
border-radius: 5px;
border: none;
color: ${props => props.bgColor ? 'white' : 'black'};
font-family: Georgia, serif;
font-style: italic;
font-weight: 600;
width: 300px;

@media (max-width: 768px){
  width: 150px;
  font-size: 10px;
}

@media (min-width: 768px) and (max-width: 1024px) {
   width: 240px;
}

`


export const LogoImage = styled.img`
height: 50px;
margin-left: 15px;
cursor: pointer;
border-radius: 5px;

@media (max-width: 768px) {
width: 65%;
}

@media (min-width: 768px) and (max-width: 1024px) {
   width: 65%;
}
`

export const ThemeIcon = styled.button`
cursor: pointer;
background-color: transparent;
border: none;
font-size: 25px;
padding: 15px;
margin-top: 5px;
color: ${props => props.color ? 'white' : 'black'};

@media (max-width: 768px) {
    padding: 5px;
  }`

export const Profile = styled.p`
font-size: 18px;
font-weight: 700;
color: ${props => props.color ? 'White' : 'black'};
background-color: ${props => props.bgColor};
margin-right: 25px;
margin-left: 10px;
padding: 7px;
border-radius: 50%; 
text-align: center;
color: white;
width: 17px;
height: 17px;
display: flex;
align-items: center;
justify-content: center;
font-family: Georgia, serif;

@media (max-width: 768px) {
    padding: 5px;
  }
`

