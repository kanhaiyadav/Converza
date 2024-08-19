import styled from "styled-components";

export const SearchboxContainer = styled.div`
    font-size: 0.7rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    height: 38px;
    border-radius: 5px;
    padding: 0px 10px;
    gap:10px;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
    transition: all 0.2s ease;
    &:focus-within{
        border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
        background-color: ${({ theme }) => theme.colors.quaternary};
        height: 45px;
        font-size: 0.8rem;
        box-shadow: 0px 0px 4px rgba(0,0,0,0.2);
    }
    i{
        color: ${({ theme }) => theme.textColors.primary};
    }
    input{
        font-size: 1.1rem;
        color: ${({ theme }) => theme.textColors.primary};
        flex: 1 1;
        border: none;
        outline: none;
        background: transparent;
        &::placeholder{
            font-size: 1rem;
        }
        
    }
    button{
        color: ${({ theme }) => theme.textColors.primary};
        font-size: inherit;
    }
`;