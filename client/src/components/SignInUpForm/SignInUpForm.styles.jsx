import styled from "styled-components";

export const MyForm = styled.form`
    display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        width: 350px;
        padding: 10px;
        @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}){
            padding: 20px;
            gap: 10px;
        }
        div{
            width: 55px;
            height: 55px;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}){
                width: 70px;
                height: 70px;
            }
        }
        h1{
            font-size: 2rem;
            white-space: nowrap;
            color: #bd4fff;
            text-shadow: 5px 0px 0px rgba(0, 0, 0);
            font-family: ${({ theme }) => theme.fonts.primary};
            letter-spacing: 2px;
            @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}){
                font-size: 2.5rem;
            }
        }
        main{
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 10px;
            input{
                font-family: ${({ theme }) => theme.fonts.primary};
                font-size: 1rem;
                padding: 10px 15px;
                border-radius: 5px;
                border: none;
                outline: none;
                width: 100%;
                border-bottom: 4px solid transparent;
                background-color: ${({ theme }) => theme.colors.senary};
                box-shadow: ${({ theme }) => theme.shadows.md};
                /* transition: all 0.3s ease-in-out; */
                @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}){
                    font-size: 1.15rem;
                }
                &:focus{
                    border-bottom: 4px solid ${({ theme }) => theme.colors.primary};
                    background-color: white;
                }
                /* &:not(:placeholder-shown){
                    border-bottom: 4px solid green;
                    background-color: white;
                } */
            }
            button{
                padding: 10px 5px;
                border-radius: 5px;
                border: none;
                background-color: #6713b8;
                color: white;
                font-weight: 600;
                cursor: pointer;
                outline: none;
                width: 100%;
                font-size: 1.1rem;
                font-family: ${({ theme }) => theme.fonts.secondary};
                /* opacity: 0; */
                &:hover{
                    background-color: ${({ theme }) => theme.colors.primary};
                }
            }
        }
`;