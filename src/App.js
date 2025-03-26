import './App.css';
import { Routes,Route } from 'react-router-dom';
import LoginPage from './pages/loginpage';
import Home from './pages/home';
import Header from './components/header/header';

export default function App(){
  return(
    <div className='App'>
      <Header/>
       <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/*" element={<Home/>}/>
       </Routes>

    </div>
  )
}
