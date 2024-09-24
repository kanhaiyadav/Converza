import styled from "styled-components";

export const Container = styled.div`
    padding: 5px 10px;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.colors.primary};
    width: fit-content;
    max-width: 80%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    position: relative;
    p{
        font-size: 1rem;
        color: white;
        display: inline-block;
    }
    span{
        font-family: 'Merienda';
        font-size: ${({ theme }) => theme.fontSizes.xxs};
        color: ${({ theme }) => theme.textColors.primary};
    }
`;