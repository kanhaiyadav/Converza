import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const MenuButton = styled.div`
    color: ${({ theme })=> theme.textColors.primary};
    margin: 25px 0px 10px 0px;
    border-radius: 5px;
    padding: 8px 12px;
    &:hover{
        background-color: #7823ce;

    }
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        display: none;
    }
`;
export const NavItem = styled(NavLink)`
    text-decoration: none;
    color: white;
    width: 100%;
    height: 38px;
    border-radius: 5px;
    margin-top: 15px;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    &:hover{
        background-color: #7823ce;
    }
    &.active{
        background-color: rgba(255, 255, 255, 0.2);
        span{
            position: absolute;
            left: 0px;
            height: 60%;
            width: 3px;
            background-color: white;
            border-radius: 3px;
            @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
                display: none;
            }
        }
    }
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        width: 50px;
        align-items: center;
        justify-content: center;
        margin: 0px;
        span {
            display: none;
        }
    }
    i,svg{
        margin-left: 12px;
        @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
            margin-left: 0px;
        }   
    }
`;

export const BottomNav = styled.div`
    padding: 10px 0px;
    margin-top: auto;
    width: 100%;
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        padding: 0px;
        width: auto;
        margin: 0px;
    }
`;


export const HomeNavStyles = styled.div`
    position: relative;
    padding: 0px 4px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    height: 100%;
    background: linear-gradient(130deg, #8E2DE2 0%, #4A00E0 100%);
    color: ${({ theme })=> theme.textColors.secondary};
    /* position: fixed; */
    /* left: 0px; */
    width: ${({ $menuOpen }) => ($menuOpen ? '170px' : '50px')};
    z-index: 20;
    p{
        margin-left: 10px;
        display: ${({ $menuOpen }) => ($menuOpen ? 'inline-block' : 'none')};
    }
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        width: 100%;
        height: 50px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
`;

export const HomeLayoutContainer = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.secondary};
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        flex-direction: column-reverse;
    }
`;