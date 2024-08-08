import styled from "styled-components";

export const SearchboxContainer = styled.div`
    font-size: 0.8rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    height: 45px;
    background-color: white;
    border-radius: 5px;
    padding: 0px 10px;
    gap:10px;
    border-bottom: 3px solid #399918;
    input{
        font-size: 1.1rem;
        flex: 1 1;
        border: none;
        outline: none;
        background: transparent;
        &::placeholder{
            font-size: 1rem;
        }
        
    }
    button{
        font-size: inherit;
    }
`;