import {useState,useEffect} from "react";
import "./suggestion.css"
export default function Suggestion({suggestedItem}){
    const sessionId = localStorage.getItem("sessionId");
    const userId = localStorage.getItem("userId");
    const [friendRequests, setFriendRequests] = useState({});

    useEffect(() => {
        const fetchPendingRequests = async () => {
            const response = await fetch("http://localhost:8080/friendship/pending-requests", {
                method: "GET",
                headers: { userId: userId, sessionId: sessionId }
            });
    
            if (!response.ok) {
                console.error("Failed to fetch pending requests");
                return;
            }
    
            const pendingRequests = await response.json();
    
            const requestMap = {};
            pendingRequests.forEach((id) => requestMap[id] = true);
            setFriendRequests(requestMap);
        };
    
        fetchPendingRequests();
    }, []);
    
    
    const sendFriendRequest = async (id) => {
        await fetch(`http://localhost:8080/friendship/friendrequest/${id}`, {
            method: "POST",
            headers: { userId: userId, sessionId: sessionId }
        });
    
        // Update state to mark request as pending
        setFriendRequests((prev) => ({ ...prev, [id]: true }));
    };

    const cancelFriendRequest = async (id) => {
        await fetch(`http://localhost:8080/friendship/cancelrequest/${id}`, {
            method: "DELETE",
            headers: { userId: userId, sessionId: sessionId }
        });
    
        // Remove from state
        setFriendRequests((prev) => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
        });
    };
    
    return(
        <div className="suggestion">
            <div className="sugg-pic-cont">
                <img src={suggestedItem?.profile_img_url} className="sugg-pic"/>
            </div>
            <div className="sugg-name">
               <div>{suggestedItem?.name}</div>
               <div></div>
            </div>
            <div className="sugg-add">
            <button onClick={() => friendRequests[suggestedItem.userId] 
                        ? cancelFriendRequest(suggestedItem.userId) 
                        : sendFriendRequest(suggestedItem.userId)}>
                       {friendRequests[suggestedItem.userId] ? "Cancel Request" : "Add Friend"}
            </button>

            </div>
        </div>
    )
}