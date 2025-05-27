import Suggestion from "../components/suggestion/suggestion";
import { useEffect, useState } from "react";
import UserProfile from "./userprofile";
import { Link } from "react-router-dom";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

export default function SuggestionsPage(){
    let[suggestion,setSuggestion] = useState([]);
    const sessionId = localStorage.getItem("sessionId");
    const userId = localStorage.getItem("userId");
    let [selectedUserId, setSelectedUserId] = useState(null);


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
            <div className="friend-cont-side1-child">
                    <Link to="/friends" style={{ textDecoration: "none", color: "black" }}>
                       <ArrowBackOutlinedIcon style={{ fontSize: "30px", marginTop: "10px", marginLeft: "10px",color:"#fff" }} />
                    </Link>
                    <div className="friend-cont-side1-child-text">Suggestions</div>  
                </div>
               {suggestion.map((item) => {
                return(
                <div key={item.userId} onClick={() => setSelectedUserId(item.userId)} style={{ cursor: "pointer" }}>
                    <Suggestion suggestedItem={item}/>
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