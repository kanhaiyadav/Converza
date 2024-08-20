import styled from "styled-components";
import { slideUp, scaleUp } from "../../Styles/mixins";


export const Header = styled.div`
    text-align: center;
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
        font-size: 1rem;
        color: ${({ theme }) => theme.textColors.tertiary};
        font-family: ${({ theme }) => theme.fonts.handwriting2};
        @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}){
            font-size: 1.2rem;
        }
    }
`;


export const SubContainer = styled.div`
    background-image: url(/siginBgV.svg);
    display: flex;
    aspect-ratio: 1/2;
    width: clamp(300px, 80%, 350px);
    background-color: ${({ theme }) => theme.colors.quaternary};
    border-radius: 10px;
    padding: 20px;
    box-shadow: ${({ theme }) => theme.shadows.outerxl};
    background-size: cover;
    animation: ${scaleUp} 0.5s ease-in-out;
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        width: 350px;
        padding: 10px;
        @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}){
            padding: 20px;
            gap: 10px;
        }
        div{
            width: 55px;
            height: 55px;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}){
                width: 70px;
                height: 70px;
            }
        }
        h1{
            font-size: 2rem;
            white-space: nowrap;
            color: #bd4fff;
            text-shadow: 5px 5px 0px rgba(0, 0, 0);
            font-family: ${({ theme }) => theme.fonts.primary};
            @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}){
                font-size: 2.5rem;
            }
        }
        input{
            font-family: ${({ theme }) => theme.fonts.primary};
            font-size: 1rem;
            padding: 10px 15px;
            border-radius: 5px;
            border: 1px solid #ccc;
            outline: none;
            width: 100%;
            animation: ${slideUp} 0.3s ease-in-out;
            @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}){
                font-size: 1.15rem;
            }
        }
        button{
            padding: 5px;
            border-radius: 5px;
            border: 1px solid #ccc;
            background-color: #6713b8;
            color: white;
            font-weight: 600;
            cursor: pointer;
            outline: none;
            width: 100%;
            font-size: 1.1rem;
            font-family: ${({ theme }) => theme.fonts.secondary};
            opacity: 0;
            animation: ${slideUp} 0.3s ease-in-out 0.2s forwards;
            &:hover{
                background-color: ${({ theme }) => theme.colors.primary};
            }
        }
    }
    @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}){
        background-image: url(/signinBg.svg);
        aspect-ratio: 16/9;
        width: clamp(700px, 80%, 900px);
        background-size: auto;
    }
`;


export const Container = styled.div`
    width: 100vw;
    height: 100vh;
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