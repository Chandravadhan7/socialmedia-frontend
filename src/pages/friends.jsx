import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./friends.css";
import FriendRequestCard from "../components/friendRequestCard/friendrequestCard";
import SuggestionCard from "../components/suggestionCard/suggestionCard";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

export default function Friends() {
    let [friendRequests, setFriendRequests] = useState([]);
    let [suggestion, setSuggestion] = useState([]);
    const sessionId = localStorage.getItem("sessionId");
    const userId = localStorage.getItem("userId");

    const getFriendRequest = async () => {
        const response = await fetch("http://localhost:8080/friendship/friendrequests", {
            method: "GET",
            headers: {
                sessionId: sessionId,
                userId: userId
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch requests");
        }

        const requestResponse = await response.json();
        setFriendRequests(requestResponse);
        console.log("friend", requestResponse);
    };

    useEffect(() => {
        getFriendRequest();
    }, []);

    const getSuggestions = async () => {
        const response = await fetch("http://localhost:8080/friendship/suggestions", {
            method: "GET",
            headers: {
                sessionId: sessionId,
                userId: userId
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const suggested = await response.json();
        setSuggestion(suggested);
        console.log("suggestions", suggested);
    };

    useEffect(() => {
        getSuggestions();
    }, []);

    return (
        <div className="friend-cont">
            <div className="friend-cont-side1">
                <div className="friend-cont-side1-child" style={{ textAlign: "left", fontSize: "180%", lineHeight: "200%" }}>
                    Friends
                </div>

                {/* Sidebar Links */}
                <NavLink to="/friends" end className={({ isActive }) => isActive ? "friend-link-wrapper active" : "friend-link-wrapper"}>
                <div className="friend-cont-side1-child">
                 <div className="f-c-s1-c-icon">
                <img src="https://i.ibb.co/67HWYXmq/icons8-user-96.png" className="post-pro-pic" alt="profile" />
              </div>
                <div className="f-c-s1-c-text">Home</div>
               <div className="f-c-s1-c-arrow"><ArrowForwardIosOutlinedIcon /></div>
               </div>
              </NavLink>

                <NavLink to="/friendrequest" className={({ isActive }) => isActive ? "friend-link-wrapper active" : "friend-link-wrapper"}>
                    <div className="friend-cont-side1-child">
                        <div className="f-c-s1-c-icon">
                            <img src="https://i.ibb.co/67HWYXmq/icons8-user-96.png" className="post-pro-pic" alt="profile" />
                        </div>
                        <div className="f-c-s1-c-text">Friend Requests</div>
                        <div className="f-c-s1-c-arrow"><ArrowForwardIosOutlinedIcon /></div>
                    </div>
                </NavLink>

                <NavLink to="/suggestions" className={({ isActive }) => isActive ? "friend-link-wrapper active" : "friend-link-wrapper"}>
                    <div className="friend-cont-side1-child">
                        <div className="f-c-s1-c-icon">
                            <img src="https://i.ibb.co/67HWYXmq/icons8-user-96.png" className="post-pro-pic" alt="profile" />
                        </div>
                        <div className="f-c-s1-c-text">Suggestions</div>
                        <div className="f-c-s1-c-arrow"><ArrowForwardIosOutlinedIcon /></div>
                    </div>
                </NavLink>

                <NavLink to="/friends/list" className={({ isActive }) => isActive ? "friend-link-wrapper active" : "friend-link-wrapper"}>
                    <div className="friend-cont-side1-child">
                        <div className="f-c-s1-c-icon">
                            <img src="https://i.ibb.co/67HWYXmq/icons8-user-96.png" className="post-pro-pic" alt="profile" />
                        </div>
                        <div className="f-c-s1-c-text">All Friends</div>
                        <div className="f-c-s1-c-arrow"><ArrowForwardIosOutlinedIcon /></div>
                    </div>
                </NavLink>
            </div>

            <div className="friend-cont-side2">
                <div className="friend-cont-side21">Friend Requests</div>
                <div className="friend-cont-side22">
                    {friendRequests.map((item) => (
                        <FriendRequestCard key={item.id} item={item} />
                    ))}
                </div>
                <div className="friend-cont-side21">Suggestions</div>
                <div className="friend-cont-side22">
                    {suggestion.map((item) => (
                        <SuggestionCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}
