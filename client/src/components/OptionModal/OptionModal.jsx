import ReactDOM from "react-dom";
import { Container, SubContainer } from "./OptionModal.styles";


const OptionModal = ({ closeModal, initial, animate, outerStyle, innerStyle, children }) => {
    console.log(document.getElementById('modal-root'));
    return ReactDOM.createPortal(
        <Container
            onClick={(e) => {
                e.stopPropagation();
                closeModal();
            }}
            onContextMenu={(e) => {
                e.stopPropagation();
                e.preventDefault();
                closeModal();
            }}
            style={{
                ...outerStyle
            }}
        >
            <SubContainer
                initial={initial}
                animate={animate}

                onClick={(e) => {
                    e.stopPropagation();
                }}
                onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}

                style={{
                    ...innerStyle
                }}
            >
                {children}
            </SubContainer>
        </Container>,
        document.getElementById('modal-root')
    );
};

export default OptionModal;