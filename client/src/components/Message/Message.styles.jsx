import styled from "styled-components";

export const Container = styled.div`
    margin-left: 10px;
    padding: 5px 10px;
    border-radius: 6px;
    background: ${({ $isCurrentUser, $isDeleted, theme }) => {
        if ($isDeleted) {
            return "#ff000022";
        } else {
            // console.log($isCurrentUser);
            if ($isCurrentUser) {
                return "linear-gradient(130deg, #4A00E0 0%, #8E2DE2 100%)";
            } else {
                return `linear-gradient(130deg, ${theme.colors.secondary} 0%, ${theme.colors.quaternary} 70%)`;
            }
        }
    }};
    align-self: ${({ $isCurrentUser }) => $isCurrentUser ? 'flex-end' : 'flex-start'};
    text-align: ${({ $isCurrentUser }) => $isCurrentUser ? 'right' : 'left'};
    margin-right: ${({ $isCurrentUser }) => $isCurrentUser ? '10px' : '0px'};
    width: fit-content;
    max-width: 80%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    p{
        font-size: 1rem;
        color: ${({ theme, $isCurrentUser, $isDeleted }) => {
        if ($isDeleted) {
            return "gray";
        } else {
            return $isCurrentUser ? "white" : theme.textColors.primary;
        }
    }};
        font-style: ${({ $isDeleted }) => $isDeleted ? "italic" : "normal"};
        display: inline-block;
        font-family: 'Playwrite De Grund';
        @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}){
            font-size: ${({ theme }) => theme.fontSizes.xs};
        }
    }
    span{
        display: flex;
        flex-direction: row;
        align-items: center;
        font-family: 'Merienda';
        font-size: ${({ theme }) => theme.fontSizes.xxs};
        color: ${({ theme }) => theme.textColors.primary};
        @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}){
            font-size: ${({ theme }) => theme.fontSizes.xxxs};
        }
        svg{
            font-size: 0.7rem;
            @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}){
                font-size: ${({ theme }) => theme.fontSizes.xxs};
            }
        }
    }
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}){
          padding: 4px 8px;  
    }
`;