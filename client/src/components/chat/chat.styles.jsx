import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const ChatBody = styled.div`
    width: 250px;
    p{
        margin: 0px;
        
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        span:first-child{
            width: fit-content;
            font-size: 1rem;
            font-weight: 500;
            color: #bcbcbc;
        }
        div{
            display: flex;
            align-items: center;
            justify-content: center;    
            min-width: 23px;
            width: fit-content;
            height: fit-content;
            background-color: ${({ theme }) => theme.colors.primary};
            color: white;
            border-radius: 15px;
            padding: 2px 5px;
            font-size: 0.8rem;
            margin-left: auto;
            box-shadow: 1px 1px 2px 0px rgba(0,0,0,1);
        }
    }
    span{
        display: flex;
        font-size: 0.9rem;
        color: grey;
        font-weight: 300;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        span{
            margin-left: auto;
        }
    }
`

export const ChatContainer = styled(NavLink)`
    text-decoration: none;
    color: ${({ theme }) => theme.textColors.primary};
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    border-radius: 5px;
    width: 96%;
    padding: 8px 10px;
    border: 1px solid transparent;
    cursor: default;
    &:active{
        transform: scale(0.98);
    }
    img{
        width: 50px;
        height: 50px;
        padding: 5px;
        border-radius: 50%;
        object-fit: contain;
        margin-right: 10px;
        background-color: #22222a;
    }
    &:hover{
        background-color: ${({ theme }) => theme.colors.quaternary};
        /* border: 1px solid ${({ theme }) => theme.colors.primary}; */
    }
    &.active{
        z-index: 1;
        border: 1px solid ${({ theme }) => theme.colors.primary};
        background-color: ${({ theme }) => theme.colors.quaternary};
    }
`