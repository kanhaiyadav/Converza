import styled from "styled-components";

export const WelcomeTitle = styled.h1`
    font-size: 2.5rem;
    text-shadow: 5px 5px 0px rgba(0, 0, 0);
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
`