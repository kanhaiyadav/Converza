import styled from "styled-components";

export const Container = styled.div`
    padding: 5px 10px;
    border-radius: 6px;
    background: linear-gradient(130deg, ${({ theme }) => theme.colors.secondary}, ${({ theme }) => theme.colors.quaternary});
    width: fit-content;
    max-width: 80%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    p{
        font-size: 1rem;
        color: ${({ theme }) => theme.textColors.primary};
        display: inline-block;
        font-family: 'Playwrite De Grund';
    }
    span{
        display: flex;
        flex-direction: row;
        align-items: center;
        font-family: 'Merienda';
        font-size: ${({ theme }) => theme.fontSizes.xxs};
        color: ${({ theme }) => theme.textColors.primary};
    }
`;