import { Container } from "./ModalContent.styles";
import CustomButton from "../CustomButton/CutomButton.component";

const ModalContent = ({type, title, body, buttons}) => {
    return (
        <Container
            $type={type}
        >
            <h1>{title}</h1>
            <p>{body}</p>
            <div>
                {
                    buttons.map((button, index) => {
                        return (
                            <CustomButton key={index} onClick={button.onClick}>
                                {button.text}
                            </CustomButton>
                        )
                    })
                }
            </div>
        </Container>
    )
};

export default ModalContent;