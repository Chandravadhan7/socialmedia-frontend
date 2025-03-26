import { useEffect, useState } from "react";
import "./home.css";
import Post from "../components/post/post";

export default function Home() {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [previewUrl, setPreviewUrl] = useState(null);
    const [feeling, setFeeling] = useState(""); 
    const [location, setLocation] = useState(""); 
    const [posts,setPosts] = useState([]);

    const sessionId = localStorage.getItem("sessionId");
    const userId = localStorage.getItem("userId");

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
        try {
            if (!sessionId || !userId) {
                console.error("Missing sessionId or userId");
                return;
            }
    
            const response = await fetch("http://localhost:8080/post/feed", {
                method: "GET",
                headers: {
                    sessionId: sessionId,
                    userId: userId
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const postResp = await response.json();
            console.log("Fetched Posts:", postResp); 
            setPosts(postResp);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
    
    useEffect(() => {
        getPosts();
    }, []); 
    
    useEffect(() => {
        console.log("Updated Posts State:", posts);
    }, [posts]); 
    

    return (
        <div className="whole">
            <div className="side1">
                <div className="side11">
                    <div className="thought">
                        <div className="thought-pro"></div>
                        <input
                            placeholder="Share your thoughts with the world..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="thought-cont"
                        />
                    </div>

                    <div className="contents">
                        {/* Photo Upload */}
                        <label htmlFor="file-input" className="contents1">
                            Photo
                        </label>
                        <input
                            id="file-input"
                            type="file"
                            accept="image/*, video/*"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />

                        {/* Video Upload */}
                        <label htmlFor="video-input" className="contents1">
                            🎥 Video
                        </label>
                        <input
                            id="video-input"
                            type="file"
                            accept="video/*"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />

                        {/* Feeling Selection */}
                        <div className="contents1" onClick={handleFeelingClick}>
                            😊 Feeling
                        </div>

                        {/* Location Input */}
                        <div className="contents1" onClick={handleLocationClick}>
                            📍 Location
                        </div>

                        <button className="share-btn" onClick={handleUpload}>
                            Share
                        </button>
                    </div>
                </div>
                <div className="side12">
                    {posts.map((item) => {
                        return(
                            <Post postItem={item}/>
                        )
                    })}
                </div>
            </div>
            <div className="side2">
                {/* Optional sidebar content */}
            </div>
        </div>
    );
}
