import { useState } from "react";
import OptionModal from "../OptionModal/OptionModal";
import { OptionsContainer } from "./chat.styles";
import { LiaBroomSolid } from "react-icons/lia";
import { TbMessageShare } from "react-icons/tb";
import { MdDeleteOutline, MdBlock, MdOutlineCheckCircleOutline } from "react-icons/md";
import Modal from "../Modal/Modal.component";
import ModalContent from "../ModalContent/ModalContent";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteChat, toggleBlockChat } from "../../redux/chat/chat.slice";
import { selectUserInfo } from "../../redux/user/user.selector";

const Options = ({ closeOptions, style, otherUser, chat }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null); // 'delete' | 'block'
    const dispatch = useDispatch();
    const me = useSelector(selectUserInfo);

    const isBlocked = !!chat?.blockedBy?.includes(me._id);

    const openConfirm = (action) => {
        setConfirmAction(action);
        setModalOpen(true);
    };

    const handleDeleteChat = () => {
        const promise = dispatch(deleteChat(chat._id)).unwrap();
        toast.promise(promise, {
            pending: 'Deleting chat...',
            success: 'Chat deleted',
            error: 'Failed to delete chat',
        });
        setModalOpen(false);
        closeOptions();
    };

    const handleToggleBlock = () => {
        const promise = dispatch(toggleBlockChat(chat._id)).unwrap();
        toast.promise(promise, {
            pending: isBlocked ? 'Unblocking...' : 'Blocking...',
            success: isBlocked ? 'Chat unblocked' : 'Chat blocked',
            error: 'Failed to update block status',
        });
        setModalOpen(false);
        closeOptions();
    };

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
                    <p>{otherUser.name}</p>
                </header>
                <section>
                    <div>
                        <TbMessageShare />
                        <span>Open Chat</span>
                    </div>
                    <div
                        onClick={() => openConfirm('clear')}
                    >
                        <LiaBroomSolid />
                        <span>Clear Chat</span>
                    </div>
                    <div
                        onClick={() => openConfirm('delete')}
                    >
                        <MdDeleteOutline />
                        <span>Delete Chat</span>
                    </div>
                    <div
                        onClick={isBlocked ? handleToggleBlock : () => openConfirm('block')}
                    >
                        {isBlocked ? <MdOutlineCheckCircleOutline /> : <MdBlock />}
                        <span>{isBlocked ? 'Unblock Chat' : 'Block Chat'}</span>
                    </div>
                </section>
            </OptionsContainer>
            {
                modalOpen && confirmAction === 'clear' && <Modal
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
                                    // const promise = dispatch(clearChat(contact.room._id)).unwrap();
                                    // toast.promise(promise, {
                                    //     pending: 'Clearing Chat...',
                                    //     success: {
                                    //         render({ data }) {
                                    //             setModalOpen(false);
                                    //             return data.message;
                                    //         }
                                    //     },
                                    //     error: {
                                    //         render({ data }) {
                                    //             return data.message;
                                    //         }
                                    //     }
                                    // });
                                }
                            }
                        ]}
                    />
                </Modal>
            }
            {
                modalOpen && confirmAction === 'delete' && <Modal
                    onClick={() => setModalOpen(false)}
                    innerStyles={{
                        maxWidth: '350px',
                    }}
                >
                    <ModalContent
                        title={'Delete Chat ⚠️'}
                        type={'warning'}
                        body={`This will remove your copy of the chat with ${otherUser.name}. It stays visible on their side, and reappears for you if they message again.`}
                        buttons={[
                            {
                                text: 'Cancel',
                                onClick: () => setModalOpen(false)
                            },
                            {
                                text: 'Delete',
                                onClick: handleDeleteChat
                            }
                        ]}
                    />
                </Modal>
            }
            {
                modalOpen && confirmAction === 'block' && <Modal
                    onClick={() => setModalOpen(false)}
                    innerStyles={{
                        maxWidth: '350px',
                    }}
                >
                    <ModalContent
                        title={'Block Chat ⚠️'}
                        type={'warning'}
                        body={`Neither you nor ${otherUser.name} will be able to send messages in this chat until it's unblocked.`}
                        buttons={[
                            {
                                text: 'Cancel',
                                onClick: () => setModalOpen(false)
                            },
                            {
                                text: 'Block',
                                onClick: handleToggleBlock
                            }
                        ]}
                    />
                </Modal>
            }
        </OptionModal>
    )
};

export default Options;
