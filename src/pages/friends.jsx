import { useEffect, useState } from "react";
import "./friends.css"
import FriendRequestCard from "../components/friendRequestCard/friendrequestCard";
import SuggestionCard from "../components/suggestionCard/suggestionCard";
export default function Friends(){
    let[friendRequests,setFriendRequests] = useState([]);
    let[suggestion,setSuggestion] = useState([]);
    const sessionId = localStorage.getItem("sessionId");
    const userId = localStorage.getItem("userId");

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

    const getSuggestions = async () => {
        const response = await fetch("http://localhost:8080/friendship/suggestions",{
            method:"GET",
            headers:{
                sessionId: sessionId,
                userId: userId
            }
        })

        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const suggested = await response.json();
        setSuggestion(suggested);

        console.log("suggestions", suggested);
    }

    useEffect(() => {
            getSuggestions();
        },[])
    return(
        <div className="friend-cont">
            <div className="friend-cont-side1">
                <div className="friend-cont-side1-child" style={{textAlign:"left",fontSize:"180%",lineHeight:"200%"}}>Friends</div>
                <div className="friend-cont-side1-child">
                    <div className="f-c-s1-c-icon"></div>
                    <div className="f-c-s1-c-text">Home</div>
                    <div className="f-c-s1-c-arrow"></div>
                </div>
                <div className="friend-cont-side1-child">
                    <div className="f-c-s1-c-icon"></div>
                    <div className="f-c-s1-c-text">Friend Requests</div>
                    <div className="f-c-s1-c-arrow"></div>
                </div>
                <div className="friend-cont-side1-child">
                    <div className="f-c-s1-c-icon"></div>
                    <div className="f-c-s1-c-text">Suggestions</div>
                    <div className="f-c-s1-c-arrow"></div>
                </div>
                <div className="friend-cont-side1-child">
                    <div className="f-c-s1-c-icon"></div>
                    <div className="f-c-s1-c-text">All Frineds</div>
                    <div className="f-c-s1-c-arrow"></div>
                </div>
            </div>
            <div className="friend-cont-side2">
                <div className="friend-cont-side21">
                    Friends
                </div>
                <div className="friend-cont-side22">
                {friendRequests.map((item) => {
                    return(
                        <FriendRequestCard item={item}/>
                    )
                })}
                </div>
                <div className="friend-cont-side21">Suggestions</div>
                <div className="friend-cont-side22">
                    {suggestion.map((item) => {
                        return(
                            <SuggestionCard item={item}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}