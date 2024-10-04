import styled from 'styled-components';

export const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid gray;
    img{
        height: 100px;
        width: 100px;
        border-radius: 50%;
        padding: 5px;
        background-color: ${({ theme }) => theme.colors.secondary};
    }
    div{
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        h3{
            font-size: 1.6rem;
            color: ${({ theme }) => theme.textColors.primary};
            font-weight: 500;
        }
        span{
            font-size: 1.2rem;
            color: #bcbcbc;
            font-family: 'Open Sans', sans-serif;
        }
    }

`;

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding: 10px;
    flex: 1 1 auto;
    overflow-y: auto;
    margin-top: 10px;
    div{
        width: 100%;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        color: #bcbcbc;
        gap: 10px;
        border-radius: 10px;
        padding: 10px;
        box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
        cursor: default;
        svg{
            font-size: 1.4rem;
        }
        &:hover{
            background-color: ${({ theme }) => theme.colors.secondary};
            box-shadow: 2px 2px 2px rgba(0,0,0,0.6);
        }
    }
`;