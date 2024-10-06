import OptionModal from "../../components/OptionModal/OptionModal";
import { OptionsContainer } from "../../components/chat/chat.styles";
import { CgCloseR } from "react-icons/cg";

const Options = ({closeChat, closeOptions, style}) => {
    return (
        <OptionModal
            closeModal={closeOptions}
            initial={{ opacity: 0, scale: 0.5, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            innerStyle={{
                height: "fit-content",
                width: "fit-content",
                ...style
            }}
        >
            <OptionsContainer>
                <section>
                    <div
                        onClick={closeChat}
                    >
                        <CgCloseR />
                        <span>Close Chat</span>
                    </div>
                </section>
            </OptionsContainer>
        </OptionModal>
    )
};

export default Options;