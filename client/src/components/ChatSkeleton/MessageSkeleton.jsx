import { useTheme } from "styled-components";
import { Container } from "../Message/Message.styles";
import Skeleton from "react-loading-skeleton";

const MessageSkeleton = () => {
    const theme = useTheme();
    return (
        <>
            <Container
                $isCurrentUser={true}
                style={{
                    background: theme.colors.secondary,
                    flexDirection: 'column',
                    gap: '5px',
                    justifyContent: 'center',
                    padding: '8px'
                }}

            >
                {[1].map((i) => (
                    <Skeleton key={i} width={50} height={25} style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }} />
                ))}
                <div style={{marginLeft: 'auto', display: 'flex', width: 'auto', gap: '5px'}}>
                    <Skeleton width={40} height={8} />
                    <Skeleton circle width={8} height={8} />
                </div>
            </Container>
            <Container
                $isCurrentUser={true}
                style={{
                    background: theme.colors.secondary,
                    flexDirection: 'column',
                    gap: '5px',
                    // alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px'
                }}

            >
                {[1].map((i) => (
                    <Skeleton key={i} width={300} height={25} style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }} />
                ))}
                <div style={{ marginLeft: 'auto', display: 'flex', width: 'auto', gap: '5px' }}>
                    <Skeleton width={40} height={8} />
                    <Skeleton circle width={8} height={8} />
                </div>
            </Container>
            <Container
                $isCurrentUser={true}
                style={{
                    background: theme.colors.secondary,
                    flexDirection: 'column',
                    gap: '5px',
                    // alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px'
                }}

            >
                {[1].map((i) => (
                    <Skeleton key={i} width={250} height={25} style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }} />
                ))}
                <div style={{ marginLeft: 'auto', display: 'flex', width: 'auto', gap: '5px' }}>
                    <Skeleton width={40} height={8} />
                    <Skeleton circle width={8} height={8} />
                </div>
            </Container>
            <Container
                $isCurrentUser={false}
                style={{
                    background: theme.colors.secondary,
                    flexDirection: 'column',
                    gap: '5px',
                    // alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px'
                }}

            >
                {[1].map((i) => (
                    <Skeleton key={i} width={70} height={25} style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }} />
                ))}
                    <Skeleton width={40} height={8} />
            </Container>
            <Container
                $isCurrentUser={false}
                style={{
                    background: theme.colors.secondary,
                    flexDirection: 'column',
                    gap: '5px',
                    // alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px'
                }}

            >
                {[1,2].map((i) => (
                    <Skeleton key={i} width={180} height={25} style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }} />
                ))}
                    <Skeleton width={40} height={8} />
            </Container>
            <Container
                $isCurrentUser={false}
                style={{
                    background: theme.colors.secondary,
                    flexDirection: 'column',
                    gap: '5px',
                    // alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px'
                }}

            >
                {[1].map((i) => (
                    <Skeleton key={i} width={80} height={25} style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }} />
                ))}
                    <Skeleton width={40} height={8} />
            </Container>
            <Container
                $isCurrentUser={true}
                style={{
                    background: theme.colors.secondary,
                    flexDirection: 'column',
                    gap: '5px',
                    // alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px'
                }}

            >
                {[1].map((i) => (
                    <Skeleton key={i} width={250} height={25} style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }} />
                ))}
                <div style={{ marginLeft: 'auto', display: 'flex', width: 'auto', gap: '5px' }}>
                    <Skeleton width={40} height={8} />
                    <Skeleton circle width={8} height={8} />
                </div>
            </Container>
            <Container
                $isCurrentUser={true}
                style={{
                    background: theme.colors.secondary,
                    flexDirection: 'column',
                    gap: '5px',
                    // alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px'
                }}

            >
                {[1, 2].map((i) => (
                    <Skeleton key={i} width={300} height={25} style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }} />
                ))}
                <div style={{ marginLeft: 'auto', display: 'flex', width: 'auto', gap: '5px' }}>
                    <Skeleton width={40} height={8} />
                    <Skeleton circle width={8} height={8} />
                </div>
            </Container>
            <Container
                $isCurrentUser={false}
                style={{
                    background: theme.colors.secondary,
                    flexDirection: 'column',
                    gap: '5px',
                    // alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px'
                }}

            >
                {[1].map((i) => (
                    <Skeleton key={i} width={150} height={25} style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }} />
                ))}
                    <Skeleton width={40} height={8} />
            </Container>
        </>
    );
};

export default MessageSkeleton;