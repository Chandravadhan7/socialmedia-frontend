import { useState,useEffect } from "react";
import FriendRequest from "../components/friendRequest/friendRequest";
import { Link } from "react-router-dom";
import UserProfile from "./userprofile";
export default function FriendRequestPage(){
    let[friendRequests,setFriendRequests] = useState([]);
    const sessionId = localStorage.getItem("sessionId");
    const userId = localStorage.getItem("userId");
    let [selectedUserId, setSelectedUserId] = useState(null);

    const getFriendRequest = async () =>{
            const response = await fetch("http://localhost:8080/friendship/friendrequests",{
                method:"GET",
                headers:{
                  sessionId:sessionId,
                  userId:userId
                }
            });
    
            if(!response.ok){
                throw new Error("Failed to fetch requests");
            }
    
            const requestResponse = await response.json();
    
            setFriendRequests(requestResponse);
            console.log("friend", requestResponse);
        }

        useEffect(()=>{
            getFriendRequest();
        },[]);

    return(
        <div className="friend-cont">
            <div className="friend-cont-side1">
               {friendRequests.map((item) => {
                return(
                <div key={item.userId} onClick={() => setSelectedUserId(item.userId)} style={{ cursor: "pointer" }}>
                    <FriendRequest requestItem={item} />
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