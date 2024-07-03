import './App.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {BrowserRouter, Route, Routes, Link} from "react-router-dom"
import Home from "./pages/Home"
import Framework from './pages/Framework';
import Section from './pages/Section';
import SubSection from './pages/SubSection';
import Requirement from './pages/Requirement';
import SubRequirement from './pages/SubRequirement';




import Registration from './pages/Registration'
import Login from './pages/Login';


import CreateInstance from './pages/CreateInstance';
import CreateSection from './pages/CreateSection';
import CreateSubSection from './pages/CreateSubSection';
import CreateFramework from './pages/CreateFramework';

import InstanceDetailsTable from './pages/InstanceDetailsTable';



function NavBar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3001/auth/logout", {}, { withCredentials: true });
      console.log(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (err) {
      console.error("Error logging out:", err);
    }
  }

  return (
    <nav>
      <Link to="/login" className="NavLink">Login</Link>
      <Link to="/registration" className="NavLink">Registration</Link>
      <Link to="/" className="NavLink">Home Page</Link>
      <button onClick={handleLogout} className="NavLink" >Logout</button>
    </nav>
  );
}


function App() {

  return(<div className="App">
    <BrowserRouter>
    
  <NavBar />



    <Routes>
    <Route path="/" exact element={<Home />}></Route>
    <Route path="/framework/:framework_id" exact element={<Framework />}></Route>
    <Route path="/section/:section_id" exact element={<Section />}></Route>
    <Route path="/subsection/:subsection_id" exact element={<SubSection />}></Route>
    <Route path="/requirement/:requirement_id" exact element={<Requirement />}></Route>
    <Route path="/subrequirement/:subrequirement_id" exact element={<SubRequirement />}></Route>
    <Route path="/createinstance/:framework_id" exact element={<CreateInstance />}></Route>
    <Route path="/createsection/:framework_id" exact element={<CreateSection />}></Route>
    <Route path="/createsubsection/:section_id" exact element={<CreateSubSection />}></Route>
    <Route path="/createframework" exact element={<CreateFramework />}></Route>


    #<Route path="/table/:instance_id" exact element={<InstanceDetailsTable/>}> </Route>

    <Route path="/login" exact element={<Login />}></Route>
    <Route path="/registration" exact element={<Registration />}></Route>
    </Routes>
    </BrowserRouter>
  </div>);
}

export default App;
