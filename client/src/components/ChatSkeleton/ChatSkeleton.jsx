import Skeleton from 'react-loading-skeleton';
import { useTheme } from 'styled-components';


const ChatSkeleton = ({ count }) => {
    const theme = useTheme();
    return (
        [...Array(count)].map((_, index) => (
            <div style={{
                display: 'flex',
                width: '96%',
                padding: '4px 10px',
                gap: '10px',
                border: `2px solid ${theme.colors.quaternary}`,
                borderRadius: '5px',
            }} key={index}>
                <div>
                    <Skeleton circle={true} height={40} width={40} />
                </div>
                <div style={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Skeleton height={20} />
                    <Skeleton height={12} />
                </div>
            </div>
        ))
    );
};

export default ChatSkeleton;