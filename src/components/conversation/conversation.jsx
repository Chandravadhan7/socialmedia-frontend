import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversationId, onClick, isSelected }) {
  const [participants, setParticipants] = useState('');
  const sessionId = localStorage.getItem("sessionId");
  const userId = Number(localStorage.getItem("userId"));
  const [userDetails, setUserDetails] = useState(null);
  const [otherUserId, setOtherUserId] = useState(null);
  const [convo, setConvo] = useState(null);
  const [latestMessage, setLatestMessage] = useState(null);

  const getParticipants = async () => {
    const response = await fetch(`http://localhost:8080/conversation-participants/${conversationId}`, {
      method: "GET",
      headers: {
        sessionId: sessionId,
        userId: userId
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch participants");
    }

    const participantsResponse = await response.json();
    setParticipants(participantsResponse);

    const otherUser = participantsResponse.find(p => p.userId !== userId);
    setOtherUserId(otherUser?.userId);
  };

  useEffect(() => {
    getParticipants();
  }, [conversationId]);

  const getUser = async () => {
    const response = await fetch(`http://localhost:8080/user/${otherUserId}`, {
      method: "GET",
      headers: {
        sessionId: sessionId,
        userId: userId
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }

    const userResponse = await response.json();
    setUserDetails(userResponse);
  };

  useEffect(() => {
    if (otherUserId) {
      getUser();
    }
  }, [otherUserId]);

  const getConversation = async () => {
    const response = await fetch(`http://localhost:8080/conversations/${conversationId}`, {
      method: "GET",
      headers: {
        sessionId: sessionId,
        userId: userId
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch conversation");
    }

    const convoResponse = await response.json();
    setConvo(convoResponse);
  };

  useEffect(() => {
    getConversation();
  }, [conversationId]);

  const getLatestMessages = async () => {
    try {
      const response = await fetch(`http://localhost:8080/messages/latest-unseen-message/${conversationId}`, {
        method: "GET",
        headers: {
          sessionId: sessionId,
          userId: userId
        }
      });
  
      const text = await response.text();
  
      if (!text || text === "null") {
        console.log("No unseen message found.");
        return;
      }
  
      const messageResponse = JSON.parse(text);
      setLatestMessage(messageResponse);
      console.log("latest message", messageResponse);
    } catch (err) {
      console.error("Error fetching latest unseen message:", err);
    }
  };
  
  useEffect(() => {
    if (otherUserId) {
      console.log("Calling getLatestMessages with:", otherUserId);
      getLatestMessages();
    } else {
      console.log("otherUserId is not set yet");
    }
  }, [conversationId, otherUserId]);
  

  return (
    <div onClick={onClick} className={`chat-cont ${isSelected ? "selected-chat" : ""}`}>
      <div className="chat-cont-pic">
        <img
          src={"https://i.ibb.co/67HWYXmq/icons8-user-96.png"}
          className="convo-page-side2-user-pic-img"
          alt="User"
        />
      </div>
      <div className="chat-cont-name">
        <div className="name-u">
          {convo?.isGroup ? convo?.title || "Unnamed Group" : userDetails?.name || "Unknown User"}
        </div>
        <div className="last-msg">
          {latestMessage?.content}
        </div>
      </div>
      <div className="chat-cont-time"></div>
    </div>
  );
}
