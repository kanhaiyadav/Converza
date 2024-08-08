import styled from "styled-components";


export const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
    color: #399918;
`

export const HeaderButtons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    button{
        font-size: 1.1rem;
        background: transparent;
        border: none;
        outline: none;
        padding: 8px 12px;
        border-radius: 5px;
        &:hover{
            background-color: #ededed;
        }
    }
`

export const NavHeader = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px 10px;
    border-radius: 5px;
`


export const SecondaryNavContainer = styled.div`
    margin-left:50px;
    box-sizing: border-box;
    height: 100vh;
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    box-shadow: 3px 3px 10px #e2e2e2;
    z-index: 1;
`;

