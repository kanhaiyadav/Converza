import styled from "styled-components";


export const CustomStyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    margin: auto;
    font-size: 1.1rem;
    border: none;
    outline: none;
    padding: 4px 10px;
    border-radius: 5px;
    color: white;
    background-color: #4b00e0;
    transition: all 0.1s;
    &:hover{
        box-shadow: 0 0 8px 5px rgba(0,0,0,0.5);
        scale: 1.05;
    }
    &:active{
        box-shadow: 0 0 8px 5px rgba(0,0,0,0.5);
        scale: 0.95;
    }
`