import Header from '../Header'
import ThemeContext from '../../context/ThemeContext'
import { NotFoundContainer, NotFoundContent, NotFoundImg } from './styledComponents'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
        const {isDarkTheme} = value

        return (
            <>
            <Header/>
            <NotFoundContainer theme={isDarkTheme ? 'dark' : 'light'} className="not-found-container">
                <NotFoundImg
                src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
                alt="not found"
                className="not-found-img"
                />
                <NotFoundContent theme={isDarkTheme ? 'dark' : 'light'}>The page your are looking is not found!</NotFoundContent>
            </NotFoundContainer>
            </>
        )
    }}
  </ThemeContext.Consumer>
)

export default NotFound