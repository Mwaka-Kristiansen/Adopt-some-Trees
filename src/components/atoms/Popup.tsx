interface PopupProps {
    text: string;
    buttonText: string;
    onButtonClick: () => void;
}

const Popup: React.FC<PopupProps> = ({ text, buttonText, onButtonClick }) => {
    return (
        <div className="popup">
            <p>{text}</p>
            <button onClick={onButtonClick}>{buttonText}</button>
        </div>
    );
};

export default Popup;
