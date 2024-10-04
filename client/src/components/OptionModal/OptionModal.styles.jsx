import styled from 'styled-components';
import { motion } from 'framer-motion';

export const SubContainer = styled(motion.div)`
    position: absolute;
    display: flex;
    flex-direction: column;
    bottom: 10px;
    left: 60px;
    padding: 10px;
    background-color: ${({ theme }) => theme.colors.quaternary};
    box-shadow: 3px 3px 10px rgba(0,0,0,0.6);
    border-radius: 15px;
`;


export const Container = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    left: 0px;
    top: 0px;
    background-color: transparent;
`;