import {Link} from 'react-router-dom';
import ThemeContext from '../../context/ThemeContext';
import PopUp from '../PopUp';

import { MdLightMode, MdDarkMode } from "react-icons/md";
import { FaBookBookmark } from "react-icons/fa6";


import {HeaderBgContainer, LogoImage, ThemeIcon, LogoContainer, DetailsContainer, Profile, SearchInput} from './styledComponents';

const Header = props => (
    <ThemeContext.Consumer>
        {value => {
            const {isDarkTheme, toggleTheme, profileBgColor} = value

            const onToggleTheme = () => {
                toggleTheme()
            }

            const {searchChange} = props

            const themeIcon = isDarkTheme ? <MdLightMode/> : <MdDarkMode/>
            const userProfile = localStorage.getItem('user')
            const firstLetter = userProfile ? userProfile[1].toUpperCase() : ''

            return (
                <HeaderBgContainer bgColor={isDarkTheme}>
                    <LogoContainer>
                    <Link to='/'>
                        <LogoImage src='https://res.cloudinary.com/dcqvdcsl9/image/upload/t_background/v1718439060/Paucek_and_Lage_3_1_a930qx.png' alt='logo'/>
                    </Link>
                    </LogoContainer>
                    <DetailsContainer>
                        <SearchInput onChange={searchChange} type="search" bgColor={isDarkTheme} placeholder='Search your recipe...'/>
                        <ThemeIcon onClick={onToggleTheme} color={isDarkTheme}>{themeIcon}</ThemeIcon>
                        <Link to='/saved-recipes'>
                        <ThemeIcon color={isDarkTheme}><FaBookBookmark/></ThemeIcon>
                        </Link>
                        <Profile bgColor={profileBgColor}>{firstLetter}</Profile>
                        <PopUp/>
                    </DetailsContainer>
                </HeaderBgContainer>
            )
        }}
    </ThemeContext.Consumer>
)

export default Header