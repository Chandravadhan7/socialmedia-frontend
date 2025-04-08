import { useEffect, useState } from "react"

export default function Conversation({conversationId,onClick}){
    const [participants,setParticipants] = useState('');
    const sessionId = localStorage.getItem("sessionId");
    const userId = Number(localStorage.getItem("userId"));

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
    },[])

    return(
        <div onClick={onClick}>
           {otherUserId}
        </div>
    )
}