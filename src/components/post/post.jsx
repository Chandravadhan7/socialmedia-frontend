import { useEffect, useState } from "react";
import "./post.css";
import { formatDistanceToNowStrict } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikes } from "../../pages/fetchLikes";
import Comment from "../comments/comment";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FaRegComment } from "react-icons/fa";
import ShareIcon from "@mui/icons-material/Share";
import { BsThreeDots } from "react-icons/bs";
export default function Post({ postItem,likes }) {
  const sessionId = localStorage.getItem("sessionId");
  const userId = localStorage.getItem("userId");
  const [comments, setCommments] = useState([]);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useDispatch();
  const postId = postItem?.postId;
  const getRelativeTime = (epoch) => {
    return formatDistanceToNowStrict(new Date(epoch), { addSuffix: true });
  };


  const handleLike = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/likes/post?postId=${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            userId: userId,
            sessionId: sessionId,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to like post. Status: ${response.status}`);
      }
      const result = await response.text();
      console.log(result);
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
            sessionId: sessionId,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to dislike post. Status: ${response.status}`);
      }
      console.log("Post disliked");
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

  const addComment = async () => {
    let inputobj = { content: comment };
    const response = await fetch(
      `http://localhost:8080/comments/postcomment?postId=${postId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          userId: userId,
          sessionId: sessionId,
        },
        body: JSON.stringify(inputobj),
      }
    );
    if (!response.ok) {
      throw new Error("commenting on post is failed");
    }

    const commentResponse = await response.json();
    console.log("comment message", commentResponse);
  };

  const getUser = async () => {
    const response = await fetch(
      `http://localhost:8080/user/${postItem?.userId}`,
      {
        method: "GET",
        headers: {
          sessionId: sessionId,
          userId: userId,
        },
      }
    );

    if (!response.ok) {
      throw new Error("failed to fetch user details");
    }

    const userResponse = await response.json();
    setUserDetails(userResponse);
    console.log(userResponse);
  };

  useEffect(() => {
    getUser();
  }, [postItem?.userId]);

  const hasDescription = !!postItem?.description;

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const deletePost = async () => {
    const response = await fetch(
      `http://localhost:8080/post/delete-post?postId=${postItem?.postId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          userId: userId,
          sessionId: sessionId,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete post");
    }

    alert("Post deleted successfully!");
    window.location.reload(); // Reload the page after deletion
  };

  return (
    <div className="whole-cont">
      <div
        className="post-cont"
        style={!hasDescription ? { minHeight: "450px" } : {}}
      >
        <div
          className="post-pro"
          style={hasDescription ? { height: "15%" } : {}}
        >
          <div className="post-pro-pic-cont">
            <img
              src={"https://i.ibb.co/67HWYXmq/icons8-user-96.png"}
              className="post-pro-pic"
              alt="profile"
            />
          </div>
          <div className="post-pro-name">
            <div className="post-pro-user-name">{userDetails?.name}</div>
            <div className="post-pro-name-time">
              {getRelativeTime(postItem?.createdAt)}
            </div>
          </div>
          <div className="dropdown-container">
            <BsThreeDots
              style={{ fontSize: "140%", cursor: "pointer" }}
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={deletePost}>
                  Delete
                </div>
              </div>
            )}
          </div>
        </div>

        {hasDescription && (
          <div className="post-des">{postItem?.description}</div>
        )}

        <div
          className="post-content"
          style={hasDescription ? { height: "75%" } : {}}
        >
          <img src={postItem?.imageUrl} className="post-pro-pic" />
        </div>

        <div className="post-lcs">
          <div
            className="post-like"
            onClick={liked ? handledislike : handleLike}
          >
            {liked ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
          </div>
          <div
            className="post-comment"
            onClick={() => setShowComments(!showComments)}
          >
            <FaRegComment style={{ fontSize: "130%" }} />
          </div>
          <div className="post-share">
            <ShareIcon />
          </div>
        </div>
      </div>

      {showComments && (
        <div className="comments">
          <div className="comment-child">
            {comments.map((item) => (
              <Comment comment={item} key={item.commentId} />
            ))}
          </div>
          <div className="add-comment">
            <div className="pic-cont">
              <img
                src={"https://i.ibb.co/67HWYXmq/icons8-user-96.png"}
                className="post-pro-pic"
                alt="profile"
              />
            </div>
            <input
              placeholder="write a comment"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              className="comment-bar"
            />
            <button
              onClick={() => {
                addComment();
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              }}
              className="comment-btn"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
