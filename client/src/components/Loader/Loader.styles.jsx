import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100dvh;
    width: 100vw;
    background-color: #f5f5f5;
    div {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        background: linear-gradient(130deg, #df55e5, #932ef9);
        padding: 50px;
        border-radius: 40px;
        @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
            padding: 30px;
            border-radius: 30px;
        }
        img:first-child {
            width: 120px;
            height: 120px;
            @media screen and (max-width: ${({ theme }) =>
                    theme.breakpoints.sm}) {
                width: 80px;
                height: 80px;
            }
        }
        img:last-child {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -60%);
            width: 80px;
            @media screen and (max-width: ${({ theme }) =>
                    theme.breakpoints.sm}) {
                width: 50px;
            }
        }
    }
`;
