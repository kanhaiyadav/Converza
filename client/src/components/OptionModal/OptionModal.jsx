import { Container, SubContainer } from "./OptionModal.styles";


const OptionModal = ({ closeModal, initial, animate, style, children }) => {
    return (
        <Container onClick={closeModal}>
            <SubContainer
                initial={initial}
                animate={animate}

                onClick={(e) => {
                    e.stopPropagation();
                }}

                style={{
                    ...style
                }}
            >
                {children}
            </SubContainer>
        </Container>
    );
};

export default OptionModal;