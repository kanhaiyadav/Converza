import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #f5f5f5;
    div{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        background: linear-gradient(130deg, #df55e5, #932ef9);
        padding: 50px;
        border-radius: 40px;
        img:first-child{
            width: 120px;
            height: 120px;
        }
        img:last-child{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80px;
        }
    }
`; 