import './App.css';
import { Routes,Route } from 'react-router-dom';
import LoginPage from './pages/loginpage';
import Home from './pages/home';
import Header from './components/header/header';
import Friends from './pages/friends';

export default function App(){
  return(
    <div className='App'>
      <Header/>
       <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/*" element={<Home/>}/>
        <Route path="/friends" element={<Friends/>}/>
       </Routes>

    </div>
  )
}
