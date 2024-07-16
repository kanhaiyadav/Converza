import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const MenuButton = styled.div`
    margin: 25px 0px 10px 0px;
    border-radius: 5px;
    padding: 8px 12px;
    &:hover{
        background-color: #50af30;

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
        background-color: #50af30;
    }
    &.active{
        background-color: #50af30;
        span{
            position: absolute;
            left: 0px;
            height: 60%;
            width: 3px;
            background-color: white;
            border-radius: 3px;
        }
    }
    i{
    margin-left: 12px;

    }
`;


export const HomeNav = styled.div`
    padding: 0px 4px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    height: 100vh;
    background-color: #399918;
    color: white;
    position: fixed;
    left: 0px;
    width: ${({ $menuOpen }) => ($menuOpen ? '170px' : '50px')};
    z-index: 2;
    p{
        margin-left: 10px;
        display: ${({ $menuOpen }) => ($menuOpen ? 'inline-block' : 'none')};
    }
`; 