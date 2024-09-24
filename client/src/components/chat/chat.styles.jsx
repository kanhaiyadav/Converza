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
        span{
            width: fit-content;
        }
        span:first-child{
            font-size: 1rem;
            font-weight: 500;
            /* color: grey; */
        }
    }
    span{
        display: inline-block;
        width: 100%;
        font-size: 0.9rem;
        color: grey;
        font-weight: 300;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
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
        border-radius: 50%;
        object-fit: contain;
        margin-right: 10px;
        background-color: #ccc;
    }
    &:hover{
        background-color: ${({ theme }) => theme.colors.quaternary};
        border: 1px solid ${({ theme }) => theme.colors.primary};
    }
    &.active{
        z-index: 1;
        border: 1px solid ${({ theme }) => theme.colors.primary};
        background-color: ${({ theme }) => theme.colors.quaternary};
    }
`