import styled from "styled-components";

export const NewMessageBanner = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background: linear-gradient(${({ theme }) => theme.colors.secondary}, #2f314200);
    p{
        font-size: 1.1rem;
        color: ${({ theme }) => theme.textColors.primary};
        font-weight: 700;
        font-family: 'Merienda';
    }
`;