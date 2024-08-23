import { Button } from "./RoundedButton.styles";

const RoundedButton = ({ children, ...otherProps }) => {
    return (
        <Button {...otherProps}>
            {children}
        </Button>
    )
}

export default RoundedButton;