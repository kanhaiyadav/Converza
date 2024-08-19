import styled from "styled-components";

export const Button = styled.button`
    font-size: 1.1rem;
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    outline: none;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    &:hover{
        background-color: #2c3e50;
    }
`;