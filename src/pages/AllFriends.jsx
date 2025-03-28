import { useEffect, useState } from "react";
import FriendCard from "../components/friendCard/friendCard";
import UserProfile from "./userprofile";

export default function AllFriends(){
    let sessionId = localStorage.getItem("sessionId");
    let userId = localStorage.getItem("userId");
    let [friends,setFriends] = useState([]);
    let [selectedUserId, setSelectedUserId] = useState(null);


    const getAllFriends = async () => {
        const response = await fetch(`http://localhost:8080/friendship/friends/${userId}`,{
            method:"GET",
            headers:{
                sessionId:sessionId,
                userId:userId
            }
        });

        if(!response.ok){
            throw new Error("failed to fetch friends");
        }

        const friendsresponse = await response.json();

        setFriends(friendsresponse);
        console.log("friends", friendsresponse);
    }

    useEffect(() => {
        getAllFriends()
    },[]);

    return(
      <div className="friend-cont">
        <div className="friend-cont-side1">
            {friends.map((item) => {
                return(
                    <div key={item.userId} onClick={() => setSelectedUserId(item.userId)} style={{ cursor: "pointer" }}>
                        <FriendCard friendItem={item}/>
                    </div>
                )
            })}
        </div>
        <div className="friend-cont-side2" style={{ padding: "0", width: "77%" }}>
            {selectedUserId && <UserProfile user_id={selectedUserId} />}
        </div>
      </div>
    )
}