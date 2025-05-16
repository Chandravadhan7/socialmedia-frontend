import { useEffect, useState } from "react";
import "./friendRequest.css"

export default function FriendRequest({requestItem}){
    const sessionId = localStorage.getItem("sessionId");
    const userId = localStorage.getItem("userId");
  const [mutualFriends,setMutualFriends] = useState([])

    const acceptFriendRequest = async () => {
       const response = await fetch(`http://localhost:8080/friendship/acceptrequest/${requestItem?.userId}`,{
          method:"PATCH",
          headers:{
            "Content-Type": "application/json",  
              sessionId: sessionId,  
              userId: userId
          }
       });

       if(!response.ok){
        throw new Error("failed")
       }
      const requestResponse = await response.json();
       console.log("request accepted", requestResponse)
    }

    const rejectFriendRequest = async () =>{
      const response = await fetch(`http://localhost:8080/friendship/rejectrequest/${requestItem?.userId}`,{
        method:"PATCH",
        headers:{
          "Content-Type": "application/json",  
          sessionId: sessionId,  
          userId: userId
        }
      });

      if(!response.ok){
        throw new Error("unable to reject");
      }

      const rejectResponse = await response.json();
      console.log("rejected response", rejectResponse);

    }
    const getMutualsFriends = async () => {
     const response = await fetch(`http://localhost:8080/friendship/mutual-friends/${requestItem?.userId}`,{
      method:"GET",
      headers:{
        sessionId:sessionId,
        userId:userId
      }
     });

     if(!response.ok){
      throw new Error("failed to fetch")
     }

     const mutualResponse = await response.json();
     setMutualFriends(mutualResponse);

     console.log(mutualResponse)
  }

  useEffect(() => {
    getMutualsFriends()
  },[])
    return(
        <div className="request">
           <div className="req-pic-cont">
            <img src={requestItem?.profile_img_url}className="req-pic"/>
           </div>
           <div className="req-name-btns">
             <div className="req-name">
              <div className="req-name-text">{requestItem?.name}</div>
              <div style={{fontSize:"80%"}}>{mutualFriends.length} mutual Friends</div>
             </div>
             <div className="req-btns">
                <button onClick={acceptFriendRequest} style={{backgroundColor:"#3B82F6"}}>Accept</button>
                <button onClick={rejectFriendRequest} style={{backgroundColor:"red"}}>Reject</button>
             </div>
           </div>
        </div>
    )
}