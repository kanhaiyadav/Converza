import styled from "styled-components";

export const Button = styled.button`
    font-size: 1.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    outline: none;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    &:hover{
        background-color: ${({ theme }) => theme.colors.quaternary};
    }
`;