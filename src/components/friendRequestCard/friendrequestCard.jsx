import "./friendRequestCard.css"
export default function FriendRequestCard({item}){

    return(
        <div className="request-card">
            <div className="request-pic-cont">
              <img src={item?.profile_img_url} className="request-pic"/>
            </div>
            <div className="request-name">
                {item?.name}
            </div>
            <div className="request-btns">
                <button>confrim</button>
                <button>reject</button>
            </div>
        </div>
    )
}