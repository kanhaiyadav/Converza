import OptionModal from "../OptionModal/OptionModal";
import { OptionsContainer } from "./chat.styles";
import { GoTrash } from "react-icons/go";
import { LiaBroomSolid } from "react-icons/lia";
import { TbMessageShare } from "react-icons/tb";

const Options = ({ closeOptions, style, contact }) => {
    const { room, user } = contact;
    return (
        <OptionModal
            closeModal={closeOptions}
            initial={{ opacity: 0, scale: 0.5, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            style={{
                height: "fit-content",
                width: "fit-content",
                ...style
            }}
        >
            <OptionsContainer>
                <header>
                    <p>{user.name}</p>
                </header>
                <section>
                    <div>
                        <TbMessageShare />
                        <span>Open Chat</span>
                    </div>
                    <div>
                        <LiaBroomSolid />
                        <span>Clear Chat</span>
                    </div>
                    <div>
                        <GoTrash />
                        <span>Delete Chat</span>
                    </div>
                </section>
            </OptionsContainer>
        </OptionModal>
    )
};

export default Options;