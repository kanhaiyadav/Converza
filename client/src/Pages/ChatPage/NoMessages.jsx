import { NoMessagesContainer } from "./ChatPage.styles";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const NoMessages = () => {
    return (
        <NoMessagesContainer>
            <div>
                <DotLottieReact
                    src="/lottie/no-signal.lottie"
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                />
            </div>
            <span>Don't be shy, the keyboard won't bite!</span>
        </NoMessagesContainer>
    );
};

export default NoMessages;
