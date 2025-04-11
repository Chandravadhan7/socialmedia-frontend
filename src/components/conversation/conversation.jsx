import { useEffect, useState } from "react"
import "./conversation.css"
export default function Conversation({conversationId,onClick,isSelected}){
    const [participants,setParticipants] = useState('');
    const sessionId = localStorage.getItem("sessionId");
    const userId = Number(localStorage.getItem("userId"));
    const [userDetails,setUserDetails] = useState(null);
    const [otherUserId, setOtherUserId] = useState(null);

    const getParticipants = async () =>{
        const response = await fetch(`http://localhost:8080/conversation-participants/${conversationId}`,{
            method:"GET",
            headers:{
              sessionId:sessionId,
              userId:userId
            }
        });

        if(!response.ok){
            throw new Error("failed to fetch participants");
        }

        const participantsResponse = await response.json();
        setParticipants(participantsResponse);

        console.log(participantsResponse);

        const otherUser = participantsResponse.find(p => p.userId !== userId);
      setOtherUserId(otherUser?.userId); // Create state for this if needed

      console.log("Other participant ID:", otherUser?.userId);
    }

    useEffect(() =>{
      getParticipants();
    },[conversationId])

    const getUser = async () => {
      const response = await fetch(`http://localhost:8080/user/${otherUserId}`,{
          method:"GET",
          headers:{
              sessionId:sessionId,
              userId:userId
          }
      });

      if(!response.ok){
          throw new Error("failed to fetch user details");
      }

      const userResponse = await response.json();
      setUserDetails(userResponse);
      console.log(userResponse);
  }

  useEffect(() => {
      if (otherUserId) {
        getUser();
      }
    }, [otherUserId]);

    return(
        <div onClick={onClick} className={`chat-cont ${isSelected ? "selected-chat" : ""}`}>
           <div className="chat-cont-pic">
           <img src={"https://i.ibb.co/67HWYXmq/icons8-user-96.png"} className="convo-page-side2-user-pic-img"/>

           </div>
           <div className="chat-cont-name">
            <div className="name-u">{userDetails?.name}</div>
            <div className="last-msg">hello,ma'am</div>
           </div>
           <div className="chat-cont-time"></div>
        </div>
    )
}