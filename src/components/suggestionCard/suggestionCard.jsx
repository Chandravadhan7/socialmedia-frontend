import "./suggestionCard.css"
export default function SuggestionCard({item}){
    return(
        <div className="suggestion-card">
            <div className="suggestion-pic-cont">
            <img src={item?.profile_img_url} className="suggestion-pic"/>
            </div>
            <div className="suggestion-name">
              {item?.name}
            </div>
            <div className="suggestion-btns">
                <button>add friend</button>
                <button>remove</button>
            </div>
        </div>
    )
}