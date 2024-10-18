import styled from "styled-components";

export const WelcomeTitle = styled.h1`
    font-size: clamp(2rem, 5vw, 2.5rem);
    text-shadow: 5px 0px 0px black;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
    margin-top: clamp(-20px, -5vw, 0px);
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* gap: 20px; */
    height: 100%;
    width: 100%;
    background: linear-gradient(130deg, ${({ theme }) => theme.colors.quaternary}, ${({ theme }) => theme.colors.secondary});
    padding: 20px;
    div{
        position: relative;
        width: clamp(250px, 50%, 400px);
        height: clamp(250px, 50%, 400px);
        svg{
            position: absolute;
            top: 55%;
            left: 55%;
            transform: translate(-50%, -50%);
            height: 100%;
            width: 100%;
        }
        img{
            height: clamp(70px, 20%, 100px);
            width: clamp(70px, 20%, 100px);
            position: absolute;
            top: 60%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        /* @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}){
            height: 250px;
            width: 250px;
        } */
        }
        p{
            text-align: center;
            color: gray;
            font-size: clamp(1rem, 2vw, 1.5rem);
        }
`