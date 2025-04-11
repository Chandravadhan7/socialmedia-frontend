import { useEffect, useState } from "react"
import "./userprofile.css"
import Post from "../components/post/post";
export default function UserProfile({user_id}){
    let [posts,setPosts] = useState([]);
    let sessionId = localStorage.getItem("sessionId");
    let userId = localStorage.getItem("userId");
    let [userDetails,setUserDetails] = useState(null);  

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

    const getUser = async () => {
        const response = await fetch(`http://localhost:8080/user/${user_id}`,{
            method:"GET",
            headers:{
                sessionId:sessionId,
                userId:userId
            }
        });
  
        if(!response.ok){
            throw new Error("failed to fetch user details");
        }
  
        const userResponse = await response.json();
        setUserDetails(userResponse);
        console.log(userResponse);
    }
  
    useEffect(() => {
        getUser();
      }, [user_id]);

    return(
        <div className="profil-cont">
            <div className="cover-pro">
              <img src="http://localhost:8080/uploads/1744261726947_beach.jpg" alt="cover" className="cover-image" />
            <div className="profile-pic-wrapper">
              <img src={userDetails?.profile_img_url} alt="profile" className="profile-pic" />
            </div>
            </div>
            <div className="pro-username">
                <div className="pro-username-text">
                    <div className="pro-username-text-1">{userDetails?.name}</div>
                    <div className="pro-username-text-2">
                        <div>1,120 friends</div>
                        <div>400 mutuals</div>
                    </div>
                </div>
                <div className="buttons">
                    <button>friend</button>
                    <button>message</button>    
                </div>
            </div>
            <div className="entities">
                <div className="entity">Post</div>
                <div className="entity">About</div>
                <div className="entity">Photos</div>
                <div className="entity">Friends</div>
            </div>
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