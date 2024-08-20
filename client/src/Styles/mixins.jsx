import { keyframes } from 'styled-components';

export const slideUp = keyframes`
    from{
        transform: translateY(100%);
        opacity: 0;
    }
    to{
        transform: translateY(0%);
        opacity: 1;
    }`;

export const scaleUp = keyframes`
    from{
        transform: scale(0.8);
        opacity: 0;
    }
    to{
        transform: scale(1);
        opacity: 1;
    }`;

export const TextAnimation = keyframes`
    from{
        width: 0%;
    }
    to{
        width: 100%;
    }`;