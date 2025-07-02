import { use, useEffect } from "react";
import "./chatbox.css";
import { useState } from "react";
import Message from "../components/message/message";
import { RxCross1 } from "react-icons/rx";
import { MdBlock } from "react-icons/md";
import { MdOutlineReportProblem } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

export default function ChatBox({ conversationId }) {
  let [message, setMessage] = useState("");
  let [userDetails, setUserDetails] = useState(null);
  let [messages, setMessages] = useState([]);
  let sessionId = localStorage.getItem("sessionId");
  let userId = Number(localStorage.getItem("userId"));
  let [convo, setConvo] = useState(null);
  const [toogle, setToggle] = useState(false);

  const toogleSide22 = () => {
    setToggle(!toogle);
  };
  let inputobj = {
    conversationId: conversationId,
    senderId: userId,
    messageType: "TEXT",
    content: message,
    createdAt: Date.now(),
    updatedAt: null,
    isDeleted: false,
    replyToMessageId: null,
  };
  const sendMessage = async () => {
    const response = await fetch(
      "http://ec2-13-203-205-26.ap-south-1.compute.amazonaws.com:8080/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          sessionId: sessionId,
          userId: userId,
        },
        body: JSON.stringify(inputobj),
      }
    );

    if (!response.ok) {
      throw new Error("unable to send message");
    }

    const data = await response.json(); // Optional: to use response
    console.log("Message sent:", data);
    setMessage("");
    await getMessages();
  };

  const getMessages = async () => {
    const response = await fetch(
      `http://ec2-13-203-205-26.ap-south-1.compute.amazonaws.com:8080/messages/${conversationId}`,
      {
        method: "GET",
        headers: {
          sessionId: sessionId,
          userId: userId,
        },
      }
    );

    if (!response.ok) {
      throw new Error("failed to fetch messages");
    }

    const messageResponse = await response.json();

    setMessages(messageResponse);
    console.log(messageResponse);
  };

  useEffect(() => {
    getMessages();
  }, [conversationId]);

  const [otherUserId, setOtherUserId] = useState(null);

  const getParticipants = async () => {
    const response = await fetch(
      `http://ec2-13-203-205-26.ap-south-1.compute.amazonaws.com:8080/conversation-participants/${conversationId}`,
      {
        method: "GET",
        headers: {
          sessionId: sessionId,
          userId: userId,
        },
      }
    );

    if (!response.ok) {
      throw new Error("failed to fetch participants");
    }

    const participantsResponse = await response.json();

    console.log(participantsResponse);

    const otherUser = participantsResponse.find((p) => p.userId !== userId);
    setOtherUserId(otherUser?.userId); // Create state for this if needed

    console.log("Other participant ID:", otherUser?.userId);
  };

  useEffect(() => {
    getParticipants();
  }, [conversationId]);

  const getUser = async () => {
    const response = await fetch(
      `http://ec2-13-203-205-26.ap-south-1.compute.amazonaws.com:8080/user/${otherUserId}`,
      {
        method: "GET",
        headers: {
          sessionId: sessionId,
          userId: userId,
        },
      }
    );

    if (!response.ok) {
      throw new Error("failed to fetch user details");
    }

    const userResponse = await response.json();
    setUserDetails(userResponse);
    console.log(userResponse);
  };

  useEffect(() => {
    if (otherUserId) {
      getUser();
    }
  }, [otherUserId]);

  const getConversation = async () => {
    const response = await fetch(
      `http://ec2-13-203-205-26.ap-south-1.compute.amazonaws.com:8080/conversations/${conversationId}`,
      {
        method: "GET",
        headers: {
          sessionId: sessionId,
          userId: userId,
        },
      }
    );
    if (!response.ok) {
      throw new Error("failed to fetch");
    }
    const convoResponse = await response.json();
    setConvo(convoResponse);
    console.log(convoResponse);
  };
  useEffect(() => {
    getConversation();
  }, [conversationId]);

  const setLastSeen = async () => {
    const response = await fetch(
      `http://ec2-13-203-205-26.ap-south-1.compute.amazonaws.com:8080/conversation-participants/last-seen/${conversationId}/${otherUserId}`,
      {
        method: "PATCH",
        headers: {
          sessionId,
          userId,
        },
      }
    );

    const lastSeenResponse = await response.json();
    console.log("last seen", lastSeenResponse);
  };

  useEffect(() => {
    if (otherUserId) {
      setLastSeen();
    }
  }, [conversationId, otherUserId]);

  return (
    <div className="convo-page-side2">
      <div className="convo-page-side21">
        <div className="convo-page-side2-user">
          <div className="convo-page-side2-user-pic" onClick={toogleSide22}>
            <img
              src={"https://i.ibb.co/67HWYXmq/icons8-user-96.png"}
              className="convo-page-side2-user-pic-img"
            />
          </div>
          <div className="convo-page-side2-user-name" onClick={toogleSide22}>
            <div className="u-name">
              {" "}
              {convo?.isGroup
                ? convo?.title || "Unnamed Group"
                : userDetails?.name || "Unknown User"}
            </div>
            <div className="status">online</div>
          </div>
          <div className="convo-page-side2-user-call"></div>
        </div>
        <div className="convo-page-side2-convo">
          {messages.map((item) => (
            <Message
              key={item.messageId}
              message={item}
              isUserMessage={item?.senderId === userId}
              style={{
                alignSelf:
                  item?.senderId === userId ? "flex-end" : "flex-start",
              }}
            />
          ))}
        </div>
        <div className="convo-page-side2-search">
          <div className="convo-page-side2-search1"></div>
          <div className="convo-page-side2-search2">
            <input
              onChange={(e) => setMessage(e.target.value)}
              placeholder=" Type a message"
              value={message}
            />
          </div>
          <div className="convo-page-side2-search3">
            <button onClick={sendMessage}>send</button>
          </div>
        </div>
      </div>
      {toogle && (
        <div className="convo-page-side22">
          <div className="convo-cont-info">
            <div className="convo-head">
              <button className="cross-btn">
                <RxCross1 />
              </button>
              <div>User info</div>
            </div>
            <div className="convo-img-cont">
              <img
                src={userDetails?.profile_img_url || "https://i.ibb.co/67HWYXmq/icons8-user-96.png"}
                className="convo-page-side2-user-pic-img"
              />
              <div style={{ fontSize: "180%", color: "#fff" }}>
                {userDetails?.name}
              </div>
            </div>
          </div>
          <div className="convo-about"></div>
          <div className="common-groups">
            <div className="common-groups-head">groups in common</div>
          </div>
          <div className="brd">
            <div className="report">
              <MdBlock style={{ fontSize: "135%" }} />
              <div style={{ fontSize: "110%" }}>block</div>
            </div>
            <div className="report">
              <MdOutlineReportProblem style={{ fontSize: "135%" }} />
              <div style={{ fontSize: "110%" }}>Report</div>
            </div>
            <div className="report">
              <MdDeleteOutline style={{ fontSize: "135%" }} />
              <div style={{ fontSize: "110%" }}>Delete</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
