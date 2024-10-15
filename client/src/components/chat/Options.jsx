import { useState } from "react";
import OptionModal from "../OptionModal/OptionModal";
import { OptionsContainer } from "./chat.styles";
import { LiaBroomSolid } from "react-icons/lia";
import { TbMessageShare } from "react-icons/tb";
import Modal from "../Modal/Modal.component";
import ModalContent from "../ModalContent/ModalContent";
import { useDispatch } from "react-redux";
import { clearChat } from "../../redux/contacts/contacts.slice";
import { toast } from "react-toastify";

const Options = ({ closeOptions, style, contact }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { room, user } = contact;
    const dispatch = useDispatch();
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
                <header>
                    <p>{user.name}</p>
                </header>
                <section>
                    <div>
                        <TbMessageShare />
                        <span>Open Chat</span>
                    </div>
                    <div
                        onClick={() => setModalOpen(true)}
                    >
                        <LiaBroomSolid />
                        <span>Clear Chat</span>
                    </div>
                </section>
            </OptionsContainer>
            {
                modalOpen && <Modal
                    onClick={() => setModalOpen(false)}
                    innerStyles={{
                        maxWidth: '350px',
                    }}
                >
                    <ModalContent
                        title={'Warning ⚠️'}
                        type={'warning'}
                        body={'This action will delete all the message of this chat. Once done it cannot be brought back.'}
                        buttons={[
                            {
                                text: 'Cancel',
                                onClick: () => setModalOpen(false)
                            },
                            {
                                text: 'Proceed',
                                onClick: () => {
                                    console.log('Clearing chat...');
                                    const promise = dispatch(clearChat(contact.room._id)).unwrap();
                                    toast.promise(promise, {
                                        pending: 'Clearing Chat...',
                                        success: {
                                            render({ data }) {
                                                setModalOpen(false);
                                                return data.message;
                                            }
                                        },
                                        error: {
                                            render({ data }) {
                                                return data.message;
                                            }
                                        }
                                    });
                                }
                            }
                        ]}
                    />
                </Modal>
            }
        </OptionModal>
    )
};

export default Options;