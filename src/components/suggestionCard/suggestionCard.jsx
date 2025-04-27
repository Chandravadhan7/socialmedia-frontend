import { useEffect, useState } from "react";
import "./suggestionCard.css"
export default function SuggestionCard({item}){
      const [mutualFriends,setMutualFriends] = useState([])
      const sessionId = localStorage.getItem("sessionId");
      const userId = localStorage.getItem("userId");
    const getMutualsFriends = async () => {
     const response = await fetch(`http://localhost:8080/friendship/mutual-friends/${item?.userId}`,{
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
        <div className="suggestion-card">
            <div className="suggestion-pic-cont">
            <img src={item?.profile_img_url} className="suggestion-pic"/>
            </div>
            <div className="suggestion-name">
              <div className="suggestion-name-user">{item?.name}</div>
              <div style={{color:"#fff"}}>{mutualFriends.length} mutual Friends</div>
            </div>
            <div className="suggestion-btns">
                <button>Add friend</button>
                <button style={{backgroundColor:"red"}}>Remove</button>
            </div>
        </div>
    )
}