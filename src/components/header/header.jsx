import "./header.css"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
export default function Header(){
    return(
        <div className="header">
            <div className="header1">
              <div className="header11">
                <div className="head-logo"></div>
                <div className="head-search"></div>
              </div>
              <div className="header12">
                <HomeOutlinedIcon style={{fontSize:"200%"}}/>
                <PeopleAltOutlinedIcon style={{fontSize:"200%"}}/>
                <ChatBubbleOutlineOutlinedIcon style={{fontSize:"200%"}}/>
                <NotificationsNoneOutlinedIcon style={{fontSize:"200%"}}/>
              </div>
            </div>
        </div>
    )
}