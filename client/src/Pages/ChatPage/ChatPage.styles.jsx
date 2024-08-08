import styled from "styled-components";

export const HeaderBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    p{
        margin: 0px;
        font-size: 1rem;
        font-weight: 500;   
    }
    span{
        display: inline-block;
        font-size: 0.85rem;
        color: grey;
        font-weight: 300;
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
    box-shadow: 2px 2px 4px #ccc;
    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }

`;

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1;
    overflow-y: auto;
`
export const Form = styled.form`
    display: flex;
    flex: 1 1 auto;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    input{
        flex: 1 1 auto;
        border: none;
        outline: none;
        padding: 8px 12px;
        border-radius: 5px;
        font-size: 1.1rem;
    }
`

export const Footer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    box-shadow: 0px -2px 4px #ccc;
    height: 50px;
`


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 1;
`