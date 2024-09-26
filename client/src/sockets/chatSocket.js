import { incUnreadMessagesCount } from "../redux/contacts/contacts.slice";

const handleChatEvents = (socket, dispatch) => {
    socket.on("unreadMessage", (data) => {
        dispatch(incUnreadMessagesCount(data.contactId));
    });
};

export default handleChatEvents;
