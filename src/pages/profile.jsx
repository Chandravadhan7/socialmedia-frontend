import { useEffect, useState } from "react";
import "./profilepage.css";
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Post from "../components/post/post";
import { CiCirclePlus } from "react-icons/ci";
import { RiFontSize } from "react-icons/ri";

export default function Profile(){
  const [posts, setPosts] = useState([]);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [feeling, setFeeling] = useState(""); 
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const sessionId = localStorage.getItem("sessionId");
  const userId = localStorage.getItem("userId");
  const [activeTab, setActiveTab] = useState("Posts");
  const [showWorkplaceForm, setShowWorkplaceForm] = useState(false);
  const [showSchoolForm, setShowSchoolForm] = useState(false);
  const [showUniversityForm, setShowUniversityForm] = useState(false);
  const [showCityForm, setShowCityForm] = useState(false);
  const [showHometownForm, setShowHometownForm] = useState(false);
  const [showRelationshipForm, setShowRelationshipForm] = useState(false);
  const [showGenderForm, setShowGenderForm] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
        const fileType = selectedFile.type;
        setPreviewUrl(URL.createObjectURL(selectedFile));

        if (fileType.startsWith("image/")) {
            setContent("image");
        } else if (fileType.startsWith("video/")) {
            setContent("video");
        }
    }
};

const handleFeelingClick = () => {
    setContent("feeling");
    setFeeling("😊 Happy"); 
};

const handleLocationClick = () => {
    setContent("location");
    setLocation("📍 New York");  
};

const handleUpload = async () => {
    if (!content) return alert("Please enter post content!");

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("content", content);
    formData.append("description", description);
    if (file) formData.append("file", file);
    if (feeling) formData.append("feeling", feeling);
    if (location) formData.append("location", location);

    try {
        const response = await fetch("http://localhost:8080/post/createpost", {
            method: "POST",
            body: formData,
            headers: {
                sessionId: sessionId,
                userId: userId
            }
        });

        if (!response.ok) throw new Error("Failed to upload post");

        console.log("Post created successfully");
        alert("Post uploaded successfully!");
    } catch (error) {
        console.error("Upload failed:", error);
    }
};

  const getPosts = async () => {
    const response = await fetch(`http://localhost:8080/post/posts/${userId}`, {
      method: "GET",
      headers: {
        sessionId,
        userId
      }
    });

    if (!response.ok) {
      throw new Error("failed to fetch posts");
    }

    const postReponse = await response.json();
    setPosts(postReponse);
  };

  const getUser = async () => {
    const response = await fetch(`http://localhost:8080/user/${userId}`, {
      method: "GET",
      headers: {
        sessionId,
        userId
      }
    });

    if (!response.ok) {
      throw new Error("failed to fetch user details");
    }

    const userResponse = await response.json();
    setUserDetails(userResponse);
  };

  useEffect(() => {
    if (userId) {
      getPosts();
      getUser();
    }
  }, [userId]);

//   const checkOrCreateConversation = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/conversations`, {
//         method: "GET",
//         headers: {
//           sessionId,
//           userId
//         }
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch conversations");
//       }

//       const allConversations = await response.json();

//       let existingConvo = null;

//       for (const convo of allConversations) {
//         const res = await fetch(`http://localhost:8080/conversation-participants/${convo.conversationId}`, {
//           headers: {
//             sessionId,
//             userId
//           }
//         });

//         if (!res.ok) continue;

//         const participants = await res.json();

//         const isOther = participants.some(p => p.userId === parseInt(user_id));
//         const isSelf = participants.some(p => p.userId === parseInt(userId));

//         if (isOther && isSelf) {
//           existingConvo = convo;
//           break;
//         }
//       }

//       if (existingConvo) {
//         navigate("/chats", { state: { conversationId: existingConvo.conversationId } });
//         return;
//       }

//       // Otherwise create a new conversation
//       await createConversation();

//     } catch (err) {
//       console.error("Error:", err.message);
//     }
//   };

//   const createConversation = async () => {
//     const conversation = {
//       createdAt: Date.now(),
//       isGroup: false,
//       creatorId: userId
//     };

//     const response = await fetch("http://localhost:8080/conversations", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         sessionId,
//         userId
//       },
//       body: JSON.stringify(conversation)
//     });

//     if (!response.ok) {
//       throw new Error("Unable to create conversation");
//     }

//     const convo = await response.json();

//     await addParticipant(convo.conversationId, userId);
//     await addParticipant(convo.conversationId, user_id);

//     navigate("/chats", { state: { conversationId: convo.conversationId } });
//   };

//   const addParticipant = async (convoId, uid) => {
//     const participant = {
//       conversationId: convoId,
//       userId: uid,
//       joinedAt: Date.now(),
//       isAdmin: uid === userId
//     };

//     const response = await fetch("http://localhost:8080/conversation-participants", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         sessionId,
//         userId
//       },
//       body: JSON.stringify(participant)
//     });

//     if (!response.ok) {
//       throw new Error("Unable to add participant");
//     }

//     const data = await response.json();
//     console.log("Participant added:", data);
//   };

  return (
    <div className="profil-cont">
      <div className="cover-profile">
        <img src="http://localhost:8080/uploads/1744261726947_beach.jpg" alt="cover" className="cover-image" />
        <div className="profile-pic-wrapper">
          <img src={userDetails?.profile_img_url} alt="profile" className="profile-pic" />
        </div>
      </div>
      <div className="profile-username">
        <div className="pro-username-text">
          <div className="pro-username-text-1">{userDetails?.name}</div>
          <div className="pro-username-text-2">
            <div>1,120 friends</div>
          </div>
        </div>
        <div className="buttons">
          <button>Add Story</button>
          <button>Edit profile</button>
        </div>
      </div>
      <div className="pafi">
  {["Posts", "About", "Photos", "Friends"].map((tab) => (
    <div
      key={tab}
      className={`entity ${activeTab === tab ? "active" : ""}`}
      onClick={() => setActiveTab(tab)}
    >
      {tab}
    </div>
  ))}
</div>
<div className="user-pro-contents">
  {activeTab === "Posts" && (
    <>
      <div className="user-info">
        {/* You can show user details like workplace, education, etc. here later */}
      </div>

      <div className="user-posts">
        {/* Post Creation Box */}
        <div className="side11">
          <div className="thought">
            <div className="thought-pro">
              <img
                src={"https://i.ibb.co/67HWYXmq/icons8-user-96.png"}
                className="post-pro-pic"
                alt="profile"
              />
            </div>
            <input
              placeholder="Share your thoughts with the world..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="thought-cont"
            />
          </div>

          <div className="contents">
            <label htmlFor="file-input" className="contents1" style={{ color: "#3B82F6" }}>
              <div><CollectionsOutlinedIcon /></div>
              <div>Photo</div>
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*, video/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <label htmlFor="video-input" className="contents1" style={{ color: "lightgreen" }}>
              <div><VideocamOutlinedIcon /></div>
              <div>Video</div>
            </label>
            <input
              id="video-input"
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <div className="contents1" onClick={handleFeelingClick} style={{ color: "orange" }}>
              <SentimentSatisfiedOutlinedIcon />
              <div>Feeling</div>
            </div>

            <div className="contents1" onClick={handleLocationClick} style={{ color: "purple" }}>
              <PlaceOutlinedIcon />
              <div>Location</div>
            </div>

            <button className="share-btn" onClick={handleUpload}>
              Share post
            </button>
          </div>
        </div>

        {/* Display Posts */}
        {posts.map((item) => (
          <Post postItem={item} key={item.postId} />
        ))}
      </div>
    </>
  )}

  {activeTab === "About" &&  <div className="about">
            <div className="about-side1">About</div>
            <div className="about-side2">
              {/* Workplace */}
              <div className="about-section">
                {showWorkplaceForm ? (
                  <>
                    <input placeholder="Workplace" />
                    <div className="add-cancel">
                    <button onClick={() => setShowWorkplaceForm(false)} className="cancel-btn">Cancel</button>
                    <button className="save-btn">save</button>
                    </div>
                  </>
                ) : (
                  <button onClick={() => setShowWorkplaceForm(true)} className="add-btn">
                    <CiCirclePlus size={20} />
                    <span>Add a workplace</span>
                  </button>
                )}
              </div>

              {/* Secondary School */}
              <div className="about-section">
                {showSchoolForm ? (
                  <>
                    <input placeholder="Secondary school" />
                    <div className="add-cancel">
                    <button onClick={() => setShowWorkplaceForm(false)} className="cancel-btn">Cancel</button>
                    <button className="save-btn">save</button>
                    </div>
                    </>
                ) : (
                  <button onClick={() => setShowSchoolForm(true)} className="add-btn">
                    <CiCirclePlus size={20} />
                    <span>Add secondary school</span>
                  </button>
                )}
              </div>

              {/* University */}
              <div className="about-section">
                {showUniversityForm ? (
                  <>
                    <input placeholder="University" />
                    <div className="add-cancel">
                    <button onClick={() => setShowWorkplaceForm(false)} className="cancel-btn">Cancel</button>
                    <button className="save-btn">save</button>
                    </div>                  </>
                ) : (
                  <button onClick={() => setShowUniversityForm(true)} className="add-btn">
                    <CiCirclePlus size={20} />
                    <span>Add university</span>
                  </button>
                )}
              </div>

              {/* Current City */}
              <div className="about-section">
                {showCityForm ? (
                  <>
                    <input placeholder="Current City" />
                    <div className="add-cancel">
                    <button onClick={() => setShowWorkplaceForm(false)} className="cancel-btn">Cancel</button>
                    <button className="save-btn">save</button>
                    </div>                  </>
                ) : (
                  <button onClick={() => setShowCityForm(true)} className="add-btn">
                    <CiCirclePlus size={20} />
                    <span>Add current city</span>
                  </button>
                )}
              </div>

              {/* Hometown */}
              <div className="about-section">
                {showHometownForm ? (
                  <>
                    <input placeholder="Hometown" />
                    <div className="add-cancel">
                    <button onClick={() => setShowWorkplaceForm(false)} className="cancel-btn">Cancel</button>
                    <button className="save-btn">save</button>
                    </div>                  </>
                ) : (
                  <button onClick={() => setShowHometownForm(true)} className="add-btn">
                    <CiCirclePlus size={20} />
                    <span>Add hometown</span>
                  </button>
                )}
              </div>

              {/* Relationship Status */}
              <div className="about-section">
                {showRelationshipForm ? (
                  <>
                    <input placeholder="Relationship status" />
                    <div className="add-cancel">
                    <button onClick={() => setShowWorkplaceForm(false)} className="cancel-btn">Cancel</button>
                    <button className="save-btn">save</button>
                    </div>                  </>
                ) : (
                  <button onClick={() => setShowRelationshipForm(true)} className="add-btn">
                    <CiCirclePlus size={20} />
                    <span>Add relationship status</span>
                  </button>
                )}
              </div>

              {/* Gender */}
              <div className="about-section">
                {showGenderForm ? (
                  <>
                    <input placeholder="Gender" />
                    <div className="add-cancel">
                    <button onClick={() => setShowWorkplaceForm(false)} className="cancel-btn">Cancel</button>
                    <button className="save-btn">save</button>
                    </div>                  </>
                ) : (
                  <button onClick={() => setShowGenderForm(true)} className="add-btn">
                    <CiCirclePlus size={20} />
                    <span>Add gender</span>
                  </button>
                )}
              </div>
            </div>
          </div>
          }
  {activeTab === "Photos" && <div>Photos content</div>}
  {activeTab === "Friends" && <div>Friends content</div>}
</div>

    </div>
  );
}