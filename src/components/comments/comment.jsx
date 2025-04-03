import { formatDistanceToNowStrict } from "date-fns";
import "./comment.css";
import { useEffect, useState } from "react";

export default function Comment({ comment }) {
  let sessionId = localStorage.getItem("sessionId");
  let userId = localStorage.getItem("userId");
  let [replies, setReplies] = useState([]);
  let [showReplies, setShowReplies] = useState(false);
  let [reply, setReply] = useState("");

  const getRelativeTime = (epoch) => {
    return formatDistanceToNowStrict(new Date(epoch), { addSuffix: true });
  };

  const getReplies = async () => {
    const response = await fetch(
      `http://localhost:8080/comments/replies/${comment?.commentId}`,
      {
        method: "GET",
        headers: {
          sessionId: sessionId,
          userId: userId,
        },
      }
    );
    if (!response.ok) {
      throw new Error("failed to fetch replies");
    }
    const repliesResponse = await response.json();
    setReplies(repliesResponse);
    console.log("comment replies", repliesResponse);
  };

  useEffect(() => {
    getReplies();
  }, []);

  const addReply = async () => {
    let inputObj = { content: reply };
    const response = await fetch(
      `http://localhost:8080/comments/postComment?postId=${comment?.postId}?parentId=${comment?.commentId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          userId: userId,
          sessionId: sessionId,
        },
        body: JSON.stringify(inputObj),
      }
    );
    if (!response.ok) {
      throw new Error("failed to add reply");
    }
    const replyResponse = await response.json();
    // Add new reply to the existing list.
    setReplies([...replies, replyResponse]);
    setReply("");
  };

  return (
   <div className="whole-cont">
    <div className="comment-cont">
      <div className="comment-cont-s1">
        <div className="comment-cont-s1-img-cont"></div>
      </div>
      <div className="comment-cont-s2">
        <div className="comment-cont-s2-1">
          <div className="comm-username">
            {/* Display username if available */}
          </div>
          <div className="comm-content">{comment?.content}</div>
        </div>
        <div className="comment-cont-s2-2">
          <div className="com-time">{getRelativeTime(comment?.createdAt)}</div>
          <div className="com-like">like</div>
          <div
            className="com-reply"
            onClick={() => setShowReplies(!showReplies)}
            style={{ cursor: "pointer" }}
          >
            reply
          </div>
        </div>
      </div>
      {/* Render replies and reply input when showReplies is true */}
    </div>
    {showReplies && (
        <div className="reply-section">
          <div className="reply-child">
            {replies.map((item) => {
                return(
                    <Comment comment={item}/>
                )
            })}
          </div>
          <div className="add-reply">
          <div className="pic-cont"></div>
            <input placeholder="reply to user" onChange={(e)=>setReply(e.target.value)} value={reply} className="comment-bar"/>
            <button onClick={() => { 
            addReply(); 
            setTimeout(() => {
            window.location.reload();
            }, 500);
            }}>Post</button>
          </div>
        </div>
      )}
    </div>
  );
}
