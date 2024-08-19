import { Button } from "./RoundedButton.styles";

const RoundedButton = ({ children, onClick }) => {
    return (
        <Button onClick={onClick}>
            {children}
        </Button>
    )
}

export default RoundedButton;