import styled from "styled-components";


export const NoChat = styled.div`
    width:65%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    flex-direction: column;
    div{
        width: 120px;
        img{
            width: 100%;
        }
    }
    p{
        font-size: 1rem;
        text-align: center;
        color: grey;
    }
    button{
        font-size: 1rem;
        margin: 10px 0;
        padding: 8px 15px;
        border: none;
        border-radius: 5px;
        background-color: ${({ theme }) => theme.colors.primary};
        color: white;
        cursor: pointer;
        transition: all 0.3s;
        &:hover{
            background-color: ${({ theme }) => theme.colors.tertiary};
        }
        &:active{
            transform: scale(0.9);
        }
    }
`

export const ListDirectory = styled.div`
    position: relative;
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    overflow-y: auto;
`;
