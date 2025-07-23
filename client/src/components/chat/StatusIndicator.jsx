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
                return theme.colors.active;
            case "offline":
                return theme.colors.offline;
            case "online":
                return theme.colors.online;
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
                top: 18%;
                left: 18%;
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
