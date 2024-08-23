import styled from "styled-components";


export const CustomStyledButton = styled.button`
    display: flex;
    margin: auto;
    width: fit-content;
    flex: 0 0 auto;
    font-size: 1.1rem;
    background: transparent;
    border: none;
    outline: none;
    padding: 8px 12px;
    border-radius: 5px;
    color: ${({ theme }) => theme.textColors.primary};
    &:hover{
        background-color: ${({ theme }) => theme.colors.quaternary};
    }
`