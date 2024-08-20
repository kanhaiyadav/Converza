import styled from "styled-components";
import { slideUp, scaleUp } from "../../Styles/mixins";


export const Header = styled.div`
    text-align: center;
    h1{
        font-size: 3rem;
        color: ${({ theme }) => theme.textColors.primary};
        font-family: ${({ theme }) => theme.fonts.secondary};
    }
    p{
        font-size: 1.2rem;
        color: ${({ theme }) => theme.textColors.tertiary};
        font-family: ${({ theme }) => theme.fonts.handwriting2};
    }
`;


export const SubContainer = styled.div`
    display: flex;
    aspect-ratio: 16/9;
    width: 900px;
    background-color: ${({ theme }) => theme.colors.quaternary};
    background-image: url(/signinBg.svg);
    border-radius: 10px;
    padding: 20px;
    box-shadow: ${({ theme }) => theme.shadows.outerxl};
    animation: ${scaleUp} 0.5s ease-in-out;
    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        width: 40%;
        padding: 20px;
        div{
            width: 70px;
            height: 70px;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        h1{
            white-space: nowrap;
            font-size: 2.5rem;
            color: ${({ theme }) => theme.colors.primary};
            text-shadow: 5px 5px 0px rgba(0, 0, 0);
            font-family: ${({ theme }) => theme.fonts.primary};
        }
        input{
            font-family: ${({ theme }) => theme.fonts.primary};
            font-size: 1.15rem;
            padding: 10px 15px;
            border-radius: 5px;
            border: 1px solid #ccc;
            outline: none;
            width: 100%;
            animation: ${slideUp} 0.3s ease-in-out;
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
`;


export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.secondary};
    a{
        color: ${({ theme }) => theme.colors.primary};
        font-family: ${({ theme }) => theme.fonts.secondary};
        font-size: 1.2rem;
        text-decoration: none;

        span{
            color: ${({ theme }) => theme.textColors.primary};
            font-weight: 600;
            &:hover{
                text-decoration: underline;
            }
        }
    }
`;