import styled, { keyframes, css } from "styled-components";

const ping = keyframes`
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const StatusIndicator = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: absolute;
    bottom: 7px;
    right: 7px;
    border: 2px solid ${({ theme }) => theme.colors.secondary};
    background-color: ${({ status, theme }) => {
        switch (status) {
            case "active":
                return "rgb(0, 255, 255)";
            case "offline":
                return "rgba(132, 132, 132, 1)";
            case "online":
                return theme.colors.success;
            default:
                return theme.colors.inactive;
        }
    }};

    ${({ status }) =>
        status === "active" &&
        css`
            &::before {
                content: "";
                position: absolute;
                top: 20%;
                left: 20%;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: inherit;
                transform: translate(-50%, -50%);
                animation: ${ping} 1s cubic-bezier(0, 0, 0.2, 1) infinite;
                opacity: 0.75;
            }
        `}
`;

export default StatusIndicator;
