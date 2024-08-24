import styled from "styled-components"

export const Form = styled.form`
    display: flex;
    flex: 1 1 auto;
    gap: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid transparent;
    border-radius:${({ theme }) => theme.radii.full}; 
    background-color: ${({ theme }) => theme.colors.quaternary}; 
    box-shadow: ${({ theme }) => theme.shadows.outer};
    padding: 5px 15px;
    &:focus-within{
        border: 1px solid ${({ theme }) => theme.colors.primary};
        box-shadow: none;
    }
    input{
        flex: 1 1 auto;
        border: none;
        outline: none;
        background: transparent;
        font-size: 1.1rem;
        font-family: 'Open Sans';
        color: ${({ theme }) => theme.textColors.primary};
    }
`