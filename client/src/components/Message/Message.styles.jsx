import styled from "styled-components";

export const Container = styled.div`
    padding: 5px 10px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.primary};
    width: fit-content;
    flex-shrink: 0;
    p{
        font-size: 1rem;
        color: white;
        display: inline-block;
    }
`;