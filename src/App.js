import './App.css';
import { Routes,Route } from 'react-router-dom';
import LoginPage from './pages/loginpage';
import Home from './pages/home';
import Header from './components/header/header';
import Friends from './pages/friends';
import FriendRequestPage from './pages/friendRequestPage';
import SuggestionsPage from './pages/suggestionsPage';
import AllFriends from './pages/AllFriends';
import UserProfile from './pages/userprofile';
import Conversations from './pages/conversations';
import FriendsProfile from './pages/profilepage';
import Profile from './pages/profile';

export default function App(){
  return(
    <div className='App'>
      <Header/>
       <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/*" element={<Home/>}/>
        <Route path="/friends" element={<Friends/>}/>
        <Route path="/friendrequest" element={<FriendRequestPage/>}/>
        <Route path="/suggestions" element={<SuggestionsPage/>}/>
        <Route path="/friends/list" element={<AllFriends/>}/>
        {/* <Route path="profile/:userId" element={<UserProfile/>}/> */}
        <Route path="/chats" element={<Conversations/>}/>
        <Route path="/profile/:user_id" element={<FriendsProfile/>}/>
        <Route path="/profile" element={<Profile/>}/>
       </Routes>

    </div>
  )
}
