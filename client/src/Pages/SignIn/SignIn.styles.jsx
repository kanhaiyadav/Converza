import styled from "styled-components";
import { scaleUp, TextAnimation } from "../../Styles/mixins";

export const AnimatedHeading = styled.h1`
    animation: ${TextAnimation} 1s linear;
`;


export const Header = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1{
        white-space: nowrap;
        overflow: hidden;
        font-size: clamp(2rem, 5vw, 2.5rem);
        color: ${({ theme }) => theme.textColors.primary};
        font-family: ${({ theme }) => theme.fonts.secondary};
        @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}){
            font-size: clamp(2.5rem, 5vw, 3rem);
        }
    }
    p{
        max-width: 70%;
        text-align: center;
        font-size: 1rem;
        color: ${({ theme }) => theme.textColors.tertiary};
        font-family: ${({ theme }) => theme.fonts.handwriting2};
        @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}){
            font-size: 1.2rem;
        }
    }
`;


export const SubContainer = styled.div`
    background-image: url(/signinBgV.svg);
    display: flex;
    aspect-ratio: 2/3;
    width: clamp(300px, 80%, 350px);
    background-color: ${({ theme }) => theme.colors.quaternary};
    border-radius: 10px;
    padding: 20px;
    box-shadow: ${({ theme }) => theme.shadows.outerxl};
    background-size: cover;
    animation: ${scaleUp} 0.5s ease-in-out;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}){
        background-image: url(/signinBg.svg);
        aspect-ratio: 16/9;
        width: clamp(700px, 80%, 900px);
        background-size: auto;
    }
`;


export const Container = styled.div`
    width: 100vw;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.secondary};
    padding: 10px;
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}){
        gap: 20px;
        padding: 20px;
    }
    a{
        color: ${({ theme }) => theme.colors.primary};
        font-family: ${({ theme }) => theme.fonts.secondary};
        font-size: 1rem;
        text-decoration: none;
        @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}){
            font-size: 1.2rem;
        }
        span{
            color: ${({ theme }) => theme.textColors.primary};
            font-weight: 600;
            &:hover{
                text-decoration: underline;
            }
        }
    }
`;