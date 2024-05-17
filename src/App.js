import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Guide from './pages/HowItWorks';


function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home/>}>Home</Route>
          <Route path='/guide' element={<Guide/>}>Home</Route>
          {/* <Route path="*" element={<Navigate to="/" />}></Route> */}

        </Routes>
      </Router>
    </>
  );
}

export default App;
