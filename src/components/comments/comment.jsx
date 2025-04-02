import { formatDistanceToNowStrict } from "date-fns";
import "./comment.css";
import { useEffect, useState } from "react";
export default function Comment({ comment }) { 

    let sessionId = localStorage.getItem("sessionId");
    let userId = localStorage.getItem("userId");
    let [replies,setReplies] = useState([]);

    const getRelativeTime = (epoch) => {
        return formatDistanceToNowStrict(new Date(epoch), { addSuffix: true });
      };
    
    const getReplies = async () =>{
        const response = await fetch(`http://localhost:8080/comments/replies/${comment?.commetId}`,{
            method:"GET",
            headers:{
               sessionId:sessionId,
               userId:userId
            }
        });

        if(!response.ok){
            throw new Error("failed to fetch replies");
        }

        const repliesResponse = await response.json();
        setReplies(repliesResponse);
        console.log("comment replies",repliesResponse);
    }

    useEffect(()=>{
        getReplies();
    },[]);

    return (
        <div className="comment-cont">
            <div className="comment-cont-s1">
                <div className="comment-cont-s1-img-cont"></div>
            </div>
            <div className="comment-cont-s2">
                <div className="comment-cont-s2-1">
                    <div className="comm-username"></div>
                    <div className="comm-content">{comment?.content}</div> 
                </div>
                <div className="comment-cont-s2-2"></div>
            </div>       
        </div>
    );
}
