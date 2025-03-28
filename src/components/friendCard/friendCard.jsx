import "./friendCard.css"
export default function FriendCard({friendItem}){
    return(
        <div className="AFri">
            <div className="Afri-pic-cont">
                <img src={friendItem?.profile_img_url}className="Afri-pic"/>
            </div>
            <div className="Afri-name">
                {friendItem?.name}
            </div>
        </div>
    )
}