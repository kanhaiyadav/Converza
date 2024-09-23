import RoundedButton from "../RoundedButton/RoundedButton";
import { OuterContainer, InnerContainer } from "./Modal.styles";
import { ImCross } from "react-icons/im";


const Modal = ({ children, onClick, ...otherProps }) => {
    return (
        <OuterContainer onClick={onClick} {...otherProps}>
            <InnerContainer onClick={(e) => {
                e.stopPropagation();
            }}
                initial={{ scale: 0 }}
                animate={{
                    scale: 1,
                    transition: {
                        duration: 0.3
                    }
                }}
                exit={{ scale: 0 }}
            >
                <RoundedButton onClick={onClick} style={{ position: 'absolute', top: '8px', right: '8px' }}><ImCross /></RoundedButton>
                {children}
            </InnerContainer>
        </OuterContainer>
    )
}

export default Modal;