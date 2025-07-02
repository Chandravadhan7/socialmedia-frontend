import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import SignUp from './pages/signUp';
import ProtectedRoute from './components/protectedRoute';

export default function App() {
  const location = useLocation();
  const hideHeaderPaths = ['/login', '/signup'];

  return (
    <div className='App'>
      {/* Conditionally render Header except on login and signup pages */}
      {!hideHeaderPaths.includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/*" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/friendrequest" element={<FriendRequestPage />} />
        <Route path="/suggestions" element={<SuggestionsPage />} />
        <Route path="/friends/list" element={<AllFriends />} />
        {/* <Route path="profile/:userId" element={<UserProfile />} /> */}
        <Route path="/chats" element={<Conversations />} />
        <Route path="/profile/:user_id" element={<FriendsProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/friends/homecontent" element={<Friends />} />
      </Routes>
    </div>
  );
}
