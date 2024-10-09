import { NoMessagesContainer } from "./ChatPage.styles";

const NoMessages = () => {

    return (
        <NoMessagesContainer>
            <img src="/emptyChat.svg" alt="" />
            <span>Looks like a ghost town...</span>
            <span>Don't be shy, the keyboard won't bite!</span>
        </NoMessagesContainer>
    )
    
};

export default NoMessages;