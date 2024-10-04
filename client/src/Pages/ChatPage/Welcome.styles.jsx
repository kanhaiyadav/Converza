import styled from "styled-components";

export const WelcomeTitle = styled.h1`
    font-size: 2.5rem;
    text-shadow: 5px 0px 0px black;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* gap: 20px; */
    height: 100vh;
    width: 100%;
    background: linear-gradient(130deg, ${({ theme }) => theme.colors.quaternary}, ${({ theme }) => theme.colors.secondary});
    padding: 20px;
    div{
        position: relative;
        width: 400px;
        height: 400px;
        svg{
            position: absolute;
            top: 55%;
            left: 55%;
            transform: translate(-50%, -50%);
            height: 400px;
            width: 400px;
        }
        img{
            position: absolute;
            top: 60%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
`