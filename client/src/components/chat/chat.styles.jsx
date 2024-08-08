import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const ChatBody = styled.div`
    width: 250px;
    p{
        margin: 0px;
        font-size: 1rem;
        font-weight: 500;
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
    color: black;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    border-radius: 5px;
    /* box-shadow: 1px 1px 3px #ccc; */
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
        border: 1px solid #399918;
    }
    &.active{
        z-index: 1;
        border: 3px solid #399918;
        transform: scale(1.02);
    }
`