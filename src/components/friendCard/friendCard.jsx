import { useEffect, useState } from "react";
import "./friendCard.css"
export default function FriendCard({friendItem,onClick }){
      const [mutualFriends,setMutualFriends] = useState([])
      const sessionId = localStorage.getItem("sessionId");
      const userId = localStorage.getItem("userId");
    const getMutualsFriends = async () => {
     const response = await fetch(`http://localhost:8080/friendship/mutual-friends/${friendItem?.userId}`,{
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
        <div className="AFri" onClick={onClick}>
            <div className="Afri-pic-cont">
                <img src={friendItem?.profile_img_url}className="Afri-pic"/>
            </div>
            <div className="Afri-name">
                <div className="Afri-name-text">{friendItem?.name}</div>
               { mutualFriends.length>0 && <div style={{fontSize:"80%",color:"#3B82F6"}}>{mutualFriends.length} mutual Friends</div>}
            </div>
        </div>
    )
}