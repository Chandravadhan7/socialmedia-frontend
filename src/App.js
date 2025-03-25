import './App.css';
import { Routes,Route } from 'react-router-dom';
import LoginPage from './pages/loginpage';
import Home from './pages/home';

export default function App(){
  return(
    <div className='App'>
       <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/*" element={<Home/>}/>
       </Routes>

    </div>
  )
}
