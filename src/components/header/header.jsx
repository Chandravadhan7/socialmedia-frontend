import { useState, useEffect } from "react";
import "./header.css"
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { GrHomeRounded } from "react-icons/gr";
import { FiMessageSquare } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Header(){
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (!mobile) {
                setIsSearchOpen(false);
            }
        };
        
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleSearchClose = () => {
        setIsSearchOpen(false);
    };

    if (isMobile && isSearchOpen) {
        return (
            <div className="header mobile-search-mode">
                <div className="mobile-search-container">
                    <div className="search-input-wrap mobile-search">
                        <SearchIcon className="search-icon" />
                        <input 
                            type="text" 
                            placeholder="Explore topics, people & more..." 
                            autoFocus
                        />
                        <CloseIcon 
                            className="close-icon" 
                            onClick={handleSearchClose}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return(
        <div className="header">
            <div className="header1">
              <div className="header11">
                <div className="head-logo">SocialHub</div>
                {!isMobile && (
                    <div className="head-search">
                        <div className="search-input-wrap">
                         <SearchIcon className="search-icon" />
                         <input type="text" placeholder="Explore topics, people & more..." />
                        </div>
                    </div>
                )}
              </div>
              <div className="header12">
                {isMobile && (
                    <div className="mobile-search-icon" onClick={handleSearchToggle}>
                        <SearchIcon style={{fontSize:"180%", color:"#fff", cursor:"pointer"}} />
                    </div>
                )}
                <Link to ="/*"><GrHomeRounded style={{fontSize:"150%",color:"#fff"}}/></Link>
                <Link to="/friends"><PeopleAltOutlinedIcon style={{fontSize:"180%",color:"#fff"}}/></Link>
                <Link to="/chats"><FiMessageSquare style={{fontSize:"180%",color:"#fff"}}/></Link>
                <Link><IoIosNotificationsOutline style={{fontSize:"200%",color:"#fff"}}/></Link>
                <Link to="/profile" className="post-pro-pic-cont">
                    <img src={"https://i.ibb.co/67HWYXmq/icons8-user-96.png"}
                    className="post-pro-pic"
                     alt="profile"/>
                </Link>
              </div>
            </div>
        </div>
    )
}