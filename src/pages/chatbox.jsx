import { use, useEffect } from "react";
import "./chatbox.css"
import { useState } from "react";
import Message from "../components/message/message";
export default function ChatBox({conversationId}){
    let [message,setMessage] = useState('');
    let [messages,setMessages] = useState([]);
    let sessionId = localStorage.getItem("sessionId");
    let userId = Number(localStorage.getItem("userId"));    let inputobj = {
    conversationId: conversationId,
    senderId: userId,
    messageType: "TEXT",
    content: message,
    createdAt: Date.now(),
    updatedAt: null,
    isDeleted: false,
    replyToMessageId: null
   }
    const sendMessage = async () =>{
        const response = await fetch('http://localhost:8080/messages',{
            method:"POST",
            headers:{
              "Content-Type": "application/json",
              sessionId:sessionId,
              userId:userId
            },
            body:JSON.stringify(inputobj)
        });

        if(!response.ok){
            throw new Error("unable to send message");
        }

        const data = await response.json(); // Optional: to use response
        console.log("Message sent:", data);
        setMessage('')
        await getMessages(); 
    }

    const getMessages = async () => {
        const response = await fetch(`http://localhost:8080/messages/${conversationId}`,{
            method:"GET",
            headers:{
              sessionId:sessionId,
              userId:userId 
            }
        });

        if(!response.ok){
            throw new Error("failed to fetch messages")
        }

        const messageResponse = await response.json();

        setMessages(messageResponse);
        console.log(messageResponse);
    }

    useEffect(() => {
        getMessages()
    },[conversationId]);

    return(
        <div className="convo-page-side2">
            <div className="convo-page-side2-user">{conversationId}</div>
            <div className="convo-page-side2-convo">
            {messages.map((item) =>
               <Message
               key={item.messageId}
               message={item}
               isUserMessage={item?.senderId === userId}
               style={{ alignSelf: item?.senderId === userId ? 'flex-end' : 'flex-start' }}
             />
     )}

            </div>
            <div className="convo-page-side2-search">
                <div className="convo-page-side2-search1"></div>
                <div className="convo-page-side2-search2">
                <input onChange={(e) => setMessage(e.target.value)} placeholder="type a message" value={message}/>
                </div>
                <div className="convo-page-side2-search3">
                    <button onClick={sendMessage}>send</button>
                </div>
            </div>
        </div>
    )
}