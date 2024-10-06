import OptionModal from "../OptionModal/OptionModal";
import { OptionsContainer } from "../chat/chat.styles";
import { GoTrash } from "react-icons/go";

const Options = ({deleteMessage, closeOptions, style }) => {
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
                        onClick={() => {
                            deleteMessage();
                            closeOptions();
                        }}
                    >
                        <GoTrash />
                        <span>Delete Message</span>
                    </div>
                </section>
            </OptionsContainer>
        </OptionModal>
    )
};

export default Options;