import { useEffect, useState } from "react"
import "./userprofile.css"
import Post from "../components/post/post";
export default function UserProfile({user_id}){
    let [posts,setPosts] = useState([]);
    let sessionId = localStorage.getItem("sessionId");
    let userId = localStorage.getItem("userId");
     

    const getPosts = async () =>{
        const response = await fetch(`http://localhost:8080/post/posts/${user_id}`,{
            method:"GET",
            headers:{
                sessionId: sessionId,
                userId: userId 
            }
        });

        if(!response.ok){
            throw new Error("failed to fetch posts")
        }

        const postReponse = await response.json();

        setPosts(postReponse);

        console.log("posts", postReponse);
    }

    useEffect(() => {
        if (user_id) {
            getPosts();
        }
    }, [user_id]);


    return(
        <div className="profil-cont">
            <div className="cover-pro">{user_id}</div>
            <div className="pro-username"></div>
            <div className="entities"></div>
            <div className="user-contents">
                <div className="user-info"></div>
                <div className="user-posts">
                    {posts.map((item) => {
                        return(
                            <Post postItem={item}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}