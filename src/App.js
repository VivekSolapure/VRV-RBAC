import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { useEffect } from 'react';


function App() {

  async function requestPermission(){
    const permission= await Notification.requestPermission();
    if (permission === 'granted'){
      console.log("Permission granted");

    }else if(permission === 'denied'){
      console.log("Permission Denied");
    }
  }

  useEffect(()=>{

  },[])


  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home/>}>Home</Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
