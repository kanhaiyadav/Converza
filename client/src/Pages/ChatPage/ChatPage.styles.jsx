import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
    from{
        transform: translateX(-100%);
    }
    to{
        transform: translateX(0%);
    }
`

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
    background-color: ${({ theme }) => {
    if (theme.type === 'light') {
        return 'white;'
    }
    else {
        return '#1d1d2a;'
    }
}} 
    width: 100%;
`
export const Form = styled.form`
    display: flex;
    flex: 1 1 auto;
    gap: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid transparent;
    border-radius:${({ theme }) => theme.radii.full}; 
    background-color: ${({ theme }) => theme.colors.quaternary}; 
    box-shadow: ${({ theme }) => theme.shadows.outer};
    padding: 5px 15px;
    &:focus-within{
        border: 1px solid ${({ theme }) => theme.colors.primary};
        box-shadow: none;
    }
    input{
        flex: 1 1 auto;
        border: none;
        outline: none;
        background: transparent;
        font-size: 1.1rem;
        font-family: 'Open Sans';
        color: ${({ theme }) => theme.textColors.primary};
    }
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
`


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 1;
    background-color: white;
    animation: ${slideIn} 0.5s ease forwards;
`