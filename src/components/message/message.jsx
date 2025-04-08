import "./message.css"
export default function Message({ message, isUserMessage, style }) {
    return (
        <div
            className="convo-page-side2-convo-msg"
            style={{
                ...style,
                backgroundColor: isUserMessage ? "#e1ffc7" : "#ffffff",
                borderColor: isUserMessage ? "green" : "blue",
            }}
        >
            {message?.content}
        </div>
    );
}