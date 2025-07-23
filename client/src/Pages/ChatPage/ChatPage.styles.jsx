import styled, { keyframes } from "styled-components";

const slide = keyframes`
    0%{
        transform: translateX(-100%);
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


export const NoMessagesContainer = styled.div`
    width: clamp(280px, 50%, 600px);
    padding: 10px;
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    background-color: #2f314252;
    backdrop-filter: blur(2px);
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
    div {
        width: 400px;
        height: 220px;
    }
    span {
        font-size: clamp(0.8rem, 2vw, 1.1rem);
        width: clamp(200px, 50%, 410px);
        font-weight: 500;
        color: gray;
        text-align: center;
        margin-top: -15px;
    }
`;


export const HeaderBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    p{
        margin: 0px;
        font-size: 0.95rem;
        font-weight: 500;   
        color: ${({ theme }) => theme.textColors.primary};
        font-family: 'Open Sans';
    }
    span{
        display: inline-block;
        font-size: 0.85rem;
        color: ${({ status, theme }) => {
            switch (status) {
                case "active":
                    return theme.colors.active;
                case "offline":
                    return theme.colors.offline;
                case "online":
                    return theme.colors.online;
                default:
                    return theme.colors.inactive;
            }
        }};
        font-weight: 300;
        margin-top: -3px;
        font-family: 'Merienda';
    }
`;

export const Header = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex: 0 0;
    gap: 10px;
    align-items: center;
    padding: 8px 15px;
    background-color: ${({ theme }) => theme.colors.secondary};
    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        padding: 5px;
        background-color: #bbbbbb;
    }
    button{
        background: transparent;
        border: none;
        outline: none;
        font-size: 1.3rem;
        color: ${({ theme }) => theme.textColors.primary};
        margin-left: auto;
    }

`;

export const Body = styled.div`
    position: relative;
    box-shadow: ${({ theme }) => theme.shadows.inner};
    display: flex;
    flex-direction: column;
    flex: 1 1;
    overflow-y: auto;
    background-image: url(/darkBg.svg);;
    /* padding: 20px; */
    gap:5px;
    padding-bottom: 100px;
    /* max-height: 80vh; */
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    padding-top: 20px;
    background-color: ${({ theme }) => {
    if (theme.type === 'light') {
        return '#f0f0f0;'
    }
    else {
        return '#2f3142;'
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
    animation: ${slideUp} 0.3s ease-in-out 0.2s forwards;   
    button{
        box-shadow: 0px 0px 8px rgba(0,0,0,0.8);
        background-color: #4A00E0;
    }  
`


export const Container = styled.div`
    box-shadow: ${({ theme }) => theme.shadows.inner};
    max-height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 1;
    animation: ${slide} 0.3s ease-in-out forwards;
`