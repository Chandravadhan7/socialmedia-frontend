import { useEffect, useState } from "react";
import "./post.css";
import { formatDistanceToNowStrict } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikes } from "../../pages/fetchLikes";
import Comment from "../comments/comment";
export default function Post({ postItem }) {
  const sessionId = localStorage.getItem("sessionId");
  const userId = localStorage.getItem("userId");
  const [comments, setCommments] = useState([]);
  const [comment,setComment] = useState('');

  const [showComments, setShowComments] = useState(false); // New state for toggling comments

  const getRelativeTime = (epoch) => {
    return formatDistanceToNowStrict(new Date(epoch), { addSuffix: true });
  };

  const dispatch = useDispatch();
  const postId = postItem?.postId;
  const likes = useSelector((state) => state.likes);

  // Get likes data on component mount
  useEffect(() => {
    dispatch(fetchLikes());
  }, [dispatch]);

  // Call fetchLikes again when user clicks "like"
  const handleLike = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/likes/post?postId=${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            userId: userId,
            sessionId: sessionId, // Send the userId as a header
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to like post. Status: ${response.status}`);
      }
      const result = await response.text();
      console.log(result); // Expected: "you liked post"
      // Optionally update likes state after liking
      dispatch(fetchLikes());
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handledislike = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/likes/post/dislike?postId=${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            userId: userId,
            sessionId: sessionId, // Send the userId as a header
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to dislike post. Status: ${response.status}`);
      }
      console.log("Post disliked");
      // Optionally update likes state after disliking
      dispatch(fetchLikes());
    } catch (error) {
      console.error("Error disliking post:", error);
    }
  };

  const likesState = useSelector((state) => state.likes);
  const liked = likesState.likes.some((like) => like.postId === postId);

  const getComments = async () => {
    const response = await fetch(
      `http://localhost:8080/comments?postId=${postId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          userId: userId,
          sessionId: sessionId,
        },
      }
    );
    if (!response.ok) {
      throw new Error("unable to fetch comments");
    }

    const commentsResponse = await response.json();
    setCommments(commentsResponse);
    console.log("comments", commentsResponse);
  };

  useEffect(() => {
    getComments();
  }, []);

  const addComment = async () =>{
    let inputobj = {content:comment}
    const response = await fetch(`http://localhost:8080/comments/postcomment?postId=${postId}`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            userId: userId,
            sessionId: sessionId,
        },
        body:JSON.stringify(inputobj)
    });
    if(!response.ok){
        throw new Error("commenting on post is failed")
    }
    
    const commentResponse = await response.json();

    console.log("comment message", commentResponse);
  }

  return (
    <div className="whole-cont">
      <div
        className="post-cont"
        style={postItem?.description === "" ? { minHeight: "450px" } : {}}
      >
        <div
          className="post-pro"
          style={postItem?.description === "" ? {} : { height: "15%" }}
        >
          <div className="post-pro-pic-cont">
            <img
              src={"https://i.ibb.co/67HWYXmq/icons8-user-96.png"}
              className="post-pro-pic"
            />
          </div>
          <div className="post-pro-name">
            <div className="post-pro-user-name">Harish</div>
            <div className="post-pro-name-time">
              {getRelativeTime(postItem?.createdAt)}
            </div>
          </div>
        </div>
        <div
          className={postItem?.description === "" ? "post-des" : ""}
          style={postItem?.description === "" ? {} : { display: "none" }}
        >
          {postItem?.description}
        </div>
        <div
          className="post-content"
          style={postItem?.description === "" ? {} : { height: "80%" }}
        ></div>
        <div className="post-lcs">
          <div
            className="post-like"
            onClick={liked ? handledislike : handleLike}
          >
            {liked ? "liked" : "like"}
          </div>
          {/* Toggle comments on click */}
          <div
            className="post-comment"
            onClick={() => setShowComments(!showComments)}
          >
            comment
          </div>
          <div className="post-share">share</div>
        </div>
      </div>
      {/* Conditionally render comments */}
      {showComments && (
        <div className="comments">
          <div className="comment-child">
            {comments.map((item)=>{
                return(
                    <Comment comment={item} key={item.commentId} />
                )
            })}
          </div>
          <div className="add-comment">
            <div className="pic-cont"></div>
            <input placeholder="write a comment" onChange={(e)=>setComment(e.target.value)} value={comment} className="comment-bar"/>
            <button onClick={() => { 
            addComment(); 
            setTimeout(() => {
            window.location.reload();
            }, 500);
            }}>Post</button>
          </div>
        </div>
      )}
    </div>
  );
}
