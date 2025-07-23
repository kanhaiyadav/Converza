import React from "react";
import { Container } from "./Message.styles";
import { MdCircle } from "react-icons/md";
import Options from "./Options";

const Message = ({ message, currId, socket, roomId, color }) => {
    const [options, setOptions] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const { content, sender } = message;
    const isSentByCurrentUser = sender === currId;

    // Function to detect if content contains only emojis
    const isOnlyEmojis = (text) => {
        // Regex to match emojis (including compound emojis and skin tone modifiers)
        const emojiRegex =
            /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Extended_Pictographic})+$/u;

        // Remove all whitespace and check if remaining content is only emojis
        const trimmedText = text.replace(/\s+/g, "");
        return emojiRegex.test(trimmedText) && trimmedText.length > 0;
    };

    // Function to count emojis in text
    const countEmojis = (text) => {
        const emojiRegex =
            /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Extended_Pictographic})/gu;
        const matches = text.match(emojiRegex);
        return matches ? matches.length : 0;
    };

    // Determine if this message should have large emojis
    const shouldShowLargeEmojis = isOnlyEmojis(content);
    const emojiCount = countEmojis(content);

    // Calculate emoji size based on count (for single emoji messages)
    const getEmojiSize = () => {
        if (!shouldShowLargeEmojis) return "inherit"; // Normal size for mixed content

        if (emojiCount === 1) return "3rem"; // Very large for single emoji
        if (emojiCount === 2) return "2.5rem"; // Large for two emojis
        if (emojiCount <= 5) return "2rem"; // Medium for 3-5 emojis
        return "1.5rem"; // Smaller for many emojis
    };

    // Extract hours and minutes from createdAt
    const date = new Date(message.createdAt);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;

    const deleteMessage = () => {
        socket.emit("deleteMessage", { roomId, messageId: message._id });
    };

    return (
        <Container
            $isCurrentUser={isSentByCurrentUser}
            $isDeleted={message.status === "deleted"}
            $isOnlyEmojis={shouldShowLargeEmojis}
            className="glass"
            onContextMenu={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setPosition({ x: e.pageX, y: e.pageY });
                setOptions(true);
            }}
        >
            <p
                style={{
                    fontSize: shouldShowLargeEmojis
                        ? getEmojiSize()
                        : "inherit",
                    lineHeight: shouldShowLargeEmojis ? "1.2" : "inherit",
                    margin: shouldShowLargeEmojis ? "0.5rem 0" : undefined,
                }}
            >
                {content}
            </p>
            {message.status !== "deleted" && (
                <span
                    style={{
                        alignSelf: isSentByCurrentUser
                            ? "flex-end"
                            : "flex-start",
                    }}
                >
                    {formattedTime}
                    {isSentByCurrentUser && (
                        <MdCircle style={{ color: color, marginLeft: "5px" }} />
                    )}
                </span>
            )}
            {options && isSentByCurrentUser && (
                <Options
                    deleteMessage={deleteMessage}
                    closeOptions={() => setOptions(false)}
                    style={{ top: position.y, left: position.x }}
                />
            )}
        </Container>
    );
};

export default React.memo(Message);
