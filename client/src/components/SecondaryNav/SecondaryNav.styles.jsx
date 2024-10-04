import styled, {keyframes} from "styled-components";

const slideIn = keyframes`
    from{
        transform: translateX(-100%);
    }
    to{
        transform: translateX(0%);
    }
`

export const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
`

export const HeaderButtons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

export const NavHeader = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px 10px;
    border-radius: 5px;
`


export const SecondaryNavContainer = styled.div`
    box-sizing: border-box;
    height: 100vh;
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: ${({ theme }) => theme.colors.secondary};
    z-index: 1;
    overflow: hidden;
    animation: ${slideIn} 0.5s ease;
    box-shadow: ${({ theme }) => theme.shadows.outer};
    /* border-right: 1px solid ${({ theme }) => theme.colors.primary}; */
`;

export const ChatsLayoutContainer = styled.div`
    display: grid;
    grid-template-columns: 350px 1fr;
    width: 100%;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.secondary};
    z-index: 10;
`;