import OptionModal from "../OptionModal/OptionModal";

const Options = ({ closeOptions }) => {
    return (
        <OptionModal
            closeModal={closeOptions}
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            style={{
                bottom: "10px",
                left: "60px",
                width: "100px",
                height: "50px",
            }}
        >
            <h1>Options</h1>
        </OptionModal>
    )
};

export default Options;