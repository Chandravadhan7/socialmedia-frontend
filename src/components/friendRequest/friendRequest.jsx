import "./friendRequest.css"

export default function FriendRequest({requestItem}){
    const sessionId = localStorage.getItem("sessionId");
    const userId = localStorage.getItem("userId");

    const acceptFriendRequest = async () => {
       const response = await fetch(`http://localhost:8080/friendship/acceptrequest/${requestItem?.userId}`,{
          method:"PATCH",
          headers:{
            "Content-Type": "application/json",  
              sessionId: sessionId,  
              userId: userId
          }
       });

       if(!response.ok){
        throw new Error("failed")
       }
      const requestResponse = await response.json();
       console.log("request accepted", requestResponse)
    }

    const rejectFriendRequest = async () =>{
      const response = await fetch(`http://localhost:8080/friendship/rejectrequest/${requestItem?.userId}`,{
        method:"PATCH",
        headers:{
          "Content-Type": "application/json",  
          sessionId: sessionId,  
          userId: userId
        }
      });

      if(!response.ok){
        throw new Error("unable to reject");
      }

      const rejectResponse = await response.json();
      console.log("rejected response", rejectResponse);

    }
    return(
        <div className="request">
           <div className="req-pic-cont">
            <img src={requestItem?.profile_img_url}className="req-pic"/>
           </div>
           <div className="req-name-btns">
             <div className="req-name">
              {requestItem?.name}
             </div>
             <div className="req-btns">
                <button onClick={acceptFriendRequest}>Accept</button>
                <button onClick={rejectFriendRequest}>Reject</button>
             </div>
           </div>
        </div>
    )
}