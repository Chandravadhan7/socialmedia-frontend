import "./post.css"
import {formatDistanceToNowStrict} from "date-fns";
export default function Post({postItem}){

    const getRelativeTime = (epoch) => {
        return formatDistanceToNowStrict(new Date(epoch),{addSuffix:true});
    }

    return(
        <div className="post-cont" style={postItem?.description === ""?{}:{minHeight:"400px"}}>
            <div className="post-pro" style={postItem?.description === ""?{}:{height:"15%"}}>
                <div className="post-pro-pic-cont">
                    <img src={"https://i.ibb.co/67HWYXmq/icons8-user-96.png"} className="post-pro-pic"/>
                </div>
                <div className="post-pro-name">
                    <div className="post-pro-user-name">
                       Harish
                    </div>
                    <div className="post-pro-name-time">
                      {getRelativeTime(postItem?.createdAt)}
                    </div>
                </div>
            </div>
            <div className={postItem?.description === "" ? "post-des" : ""} style={postItem?.description === "" ? {} : { display: "none" }}>
                {postItem?.description}
            </div>
            <div className="post-content" style={postItem?.description === ""?{}:{height:"80%"}}>

            </div>
            <div className="post-lcs">
                <div className="post-like">
                  like
                </div>
                <div className="post-comment">
                  comment
                </div>
                <div className="post-share">
                  share
                </div>
            </div>
        </div>
    )
}