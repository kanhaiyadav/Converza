import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    border-radius: 5px;
    color: ${({ theme }) => theme.textColors.primary};
    h1{
        font-size: 2rem;
        text-transform: uppercase;
        text-shadow: 5px 0px 0px black;
        -webkit-text-stroke: 1px black;
        color: ${({ $type, theme }) => $type === 'warning' ? theme.colors.warning : theme.colors.primary};
        margin: 0;
    }
    p{
        font-size: 1rem;
        margin: 0;
    }
    div{
        display: flex;
        gap: 1rem;
        width: 100%;
        button{
            padding: 8px;
            flex: 1;
            cursor: pointer;
            background-color: ${({ $type, theme }) => $type === 'warning' ? theme.colors.warning : theme.colors.primary};
            color: ${({ $type, theme }) => $type === 'warning' ? 'black' : theme.textColors.primary};
            font-weight: 600;
        }
    }
`; 