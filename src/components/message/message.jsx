import { formatDistanceToNowStrict } from "date-fns";
import "./message.css"
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
export default function Message({ message, isUserMessage, style }) {
    const getRelativeTime = (epoch) => {
    return formatDistanceToNowStrict(new Date(epoch), { addSuffix: true });
  };

    return (
        <div
            className="convo-page-side2-convo-msg"
            style={{
                ...style,
                backgroundColor: isUserMessage ? "#3B82F6" : "#1F2A3C",
                borderColor: isUserMessage ? "green" : "#152135",
            }}
        >
            <div className="convo-page-side2-convo-msg-msg">{message?.content}</div>
            <div className="convo-page-side2-convo-msg-time">
                <div className="time">
                    {getRelativeTime(message?.createdAt)}
                </div>
                <div className="tick">
                <DoneAllOutlinedIcon sx={{ fontSize: "15px" }} />
                </div>
            </div>
        </div>
    );
}