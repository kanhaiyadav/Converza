import styled, { keyframes } from "styled-components";

const slide = keyframes`
    0%{
        transform: translateX(-100%);
    }
    40%{
        transform: translateX(10%);
    }
    70%{
        transform: translateX(-5%);
    }
    100%{
        transform: translateX(0%);
    }`;

const slideUp = keyframes`
    from{
        transform: translateY(100%);
        opacity: 0;
    }
    to{
        transform: translateY(0%);
        opacity: 1;
    }`;


export const HeaderBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    p{
        margin: 0px;
        font-size: 1rem;
        font-weight: 500;   
        color: ${({ theme }) => theme.textColors.primary};
    }
    span{
        display: inline-block;
        font-size: 0.85rem;
        color: ${({ theme }) => theme.colors.active};
        font-weight: 300;
        margin-top: -3px;
        font-family: 'Merienda';
    }
`;

export const Buttons = styled.div`
    margin-left: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

export const Header = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex: 0 0;
    gap: 10px;
    align-items: center;
    padding: 8px 15px;
    background-color: ${({ theme }) => theme.colors.quaternary};
    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }

`;

export const Body = styled.div`
    box-shadow: ${({ theme }) => theme.shadows.inner};
    display: flex;
    flex-direction: column;
    flex: 1 1;
    overflow-y: auto;
    background-color: #ffffff;
    background-image: url(/darkBg.svg);;
    padding: 20px;
    gap:5px;
    padding-bottom: 100px;
    /* max-height: 80vh; */
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    background-color: ${({ theme }) => {
    if (theme.type === 'light') {
        return 'white;'
    }
    else {
        return '#1d1d2a;'
    }
}} 
`

export const Footer = styled.div`
    display: flex;
    gap: 10px;
    position: absolute;
    bottom: 20px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px;
    opacity: 0;
    animation: ${slideUp} 0.3s ease-in-out 0.8s forwards;     
`


export const Container = styled.div`
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 1;
    animation: ${slide} 1s ease-in-out forwards;
`