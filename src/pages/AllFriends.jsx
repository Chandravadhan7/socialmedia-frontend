import { useEffect, useState } from "react";
import FriendCard from "../components/friendCard/friendCard";
import UserProfile from "./userprofile";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

export default function AllFriends() {
  const sessionId = localStorage.getItem("sessionId");
  const userId = localStorage.getItem("userId");
  const [friends, setFriends] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);

  const getAllFriends = async () => {
    const response = await fetch(
      `http://ec2-51-21-182-252.eu-north-1.compute.amazonaws.com:8080/friendship/friends/${userId}`,
      {
        method: "GET",
        headers: {
          sessionId: sessionId,
          userId: userId,
        },
      }
    );

    if (!response.ok) {
      throw new Error("failed to fetch friends");
    }

    const friendsresponse = await response.json();
    setFriends(friendsresponse);
    console.log("friends", friendsresponse);
  };

  useEffect(() => {
    getAllFriends();
  }, []);

  const handleFriendClick = (id) => {
    setSelectedUserId(id);
    if (window.innerWidth <= 768) {
      setIsMobileProfileOpen(true);
    }
  };

  return (
    <div className="friend-cont">
      {/* Left Side: Friends List */}
      {(!isMobileProfileOpen || window.innerWidth > 768) && (
        <div className="friend-cont-side1">
          <div className="friend-cont-side1-child">
            <Link
              to="/friends"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ArrowBackOutlinedIcon
                style={{
                  fontSize: "30px",
                  marginTop: "10px",
                  marginLeft: "10px",
                  color: "#fff",
                }}
              />
            </Link>
            <div className="friend-cont-side1-child-text">All Friends</div>
          </div>

          <div className="friend-search">
            <div className="search-input-wrapper">
              <SearchIcon className="search-icon" />
              <input type="text" placeholder="Search friends" />
            </div>
          </div>

          <div className="requests-number" style={{ marginTop: "4%" }}>
            {friends.length} friends
          </div>

          {friends.map((item) => (
            <div
              key={item.userId}
              onClick={() => handleFriendClick(item.userId)}
              style={{ cursor: "pointer" }}
            >
              <FriendCard friendItem={item} />
            </div>
          ))}
        </div>
      )}

      {/* Right Side: User Profile */}
      {selectedUserId && (isMobileProfileOpen || window.innerWidth > 768) && (
        <div
          className="friend-cont-side2"
          style={{ padding: "0", width: "77%" }}
        >
          {/* Mobile Back Button */}
          {isMobileProfileOpen && window.innerWidth <= 768 && (
            <div
              className="mobile-back-button"
              onClick={() => setIsMobileProfileOpen(false)}
            >
              <ArrowBackOutlinedIcon />
              <span>Back to Friends</span>
            </div>
          )}
          <UserProfile user_id={selectedUserId} />
        </div>
      )}
    </div>
  );
}
