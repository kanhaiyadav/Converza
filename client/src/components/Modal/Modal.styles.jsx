import styled from "styled-components";
import { motion } from "framer-motion";

export const InnerContainer = styled(motion.div)`
    position: relative;
    background-color: ${({ theme }) => theme.colors.secondary};
    background-image: url(/modal.svg);
    aspect-ratio: 4/3;
    background-size: cover;
    padding: 20px;
    border-radius: 10px;
    box-shadow: ${({ theme }) => theme.shadows.outerxl};
`;

export const OuterContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;
