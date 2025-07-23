import styled from "styled-components";

export const Container = styled.div`
    margin-left: 10px;
    padding: 5px 10px;
    border-radius: 10px;
    background: ${({ $isCurrentUser, $isDeleted, theme }) => {
        if ($isDeleted) {
            return "#ff000022";
        } else {
            // console.log($isCurrentUser);
            if ($isCurrentUser) {
                return `linear-gradient(135deg, ${theme.colors.primary}, rgba(255, 255, 255, 0))`;
            } else {
                return `linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))`;
            }
        }
    }};
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    align-self: ${({ $isCurrentUser }) =>
        $isCurrentUser ? "flex-end" : "flex-start"};
    text-align: ${({ $isCurrentUser }) => ($isCurrentUser ? "right" : "left")};
    margin-right: ${({ $isCurrentUser }) => ($isCurrentUser ? "10px" : "0px")};
    width: fit-content;
    max-width: 80%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    ${(props) =>
        props.$isOnlyEmojis &&
        `
        text-align: center;
        p {
          margin: 0.2rem 0;
          user-select: none;
        }
        padding: ${props.$isOnlyEmojis ? "0.5rem" : "your-normal-padding"};
        min-width: auto;
    `}
    p {
        font-size: 0.9rem;
        margin-bottom: 2px;
        color: ${({ theme, $isCurrentUser, $isDeleted }) => {
            if ($isDeleted) {
                return "gray";
            } else {
                return theme.textColors.primary;
            }
        }};
        font-style: ${({ $isDeleted }) => ($isDeleted ? "italic" : "normal")};
        display: inline-block;
        font-family: "Playwrite De Grund";
        @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
            font-size: ${({ theme }) => theme.fontSizes.xs};
        }
    }
    span {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-family: "Merienda";
        font-size: ${({ theme }) => theme.fontSizes.xxs};
        color: ${({ theme }) => theme.textColors.primary};
        @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
            font-size: ${({ theme }) => theme.fontSizes.xxxs};
        }
        svg {
            font-size: 0.7rem;
            @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
                font-size: ${({ theme }) => theme.fontSizes.xxs};
            }
        }
    }
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        padding: 4px 8px;
    }
`;