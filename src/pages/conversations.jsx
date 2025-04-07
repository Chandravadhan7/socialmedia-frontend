import { useEffect, useState } from "react"
import "./conversation.css"
import Conversation from "../components/conversation/conversation";
export default function Conversations(){
    let [conversations,setconversations] = useState([]);
    const sessionId = localStorage.getItem("sessionId");
    const userId = localStorage.getItem("userId");

    const getConversations = async () =>{
        const response = await fetch("http://localhost:8080/conversations",{
           method:"GET",
           headers:{
            sessionId:sessionId,
            userId:userId
           }
        });
        if(!response.ok){
            throw new Error("failed to fetch conversations");
        }

        const convoResponse = await response.json();
        setconversations(convoResponse);
        console.log(convoResponse);
    }

    useEffect(()=>{
       getConversations();
    },[])
    return(
        <div className="convo-page">
           <div className="convo-page-side1">
            <div className="convo-page-side1-search">

            </div>
            <div className="convo-page-side1-chats">
              {conversations.map((item) => (
              <Conversation key={item?.conversationId} conversationId={item?.conversationId} />
            ))}
            </div>
            
           </div>
           <div className="convo-page-side2">
            <div className="convo-page-side2-user"></div>
            <div className="convo-page-side2-convo"></div>
            <div className="convo-page-side2-search"></div>
           </div>
        </div>
    )
}