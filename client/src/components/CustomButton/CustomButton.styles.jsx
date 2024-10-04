import styled from "styled-components";


export const CustomStyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    margin: auto;
    width: fit-content;
    flex: 0 0 auto;
    font-size: 1.1rem;
    border: none;
    outline: none;
    padding: 4px 10px;
    border-radius: 5px;
    color: white;
    background-color: #4b00e0;
    &:hover{
        background-color: ${({ theme }) => theme.colors.quaternary};
    }
`