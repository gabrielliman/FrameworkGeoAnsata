import './App.css';
import {BrowserRouter, Route, Routes, Link} from "react-router-dom"
import Home from "./pages/Home"
import Framework from './pages/Framework';
import Section from './pages/Section';
import SubSection from './pages/SubSection';
import Requirement from './pages/Requirement';
import SubRequirement from './pages/SubRequirement';


/* import CreateSurvey from './pages/CreateSurvey';
 */
import Registration from './pages/Registration'
import Login from './pages/Login';
import CreateInstance from './pages/CreateInstance';

function App() {
  return(<div className="App">
    <BrowserRouter>
    
{/*     <Link to="/createsurvey" > Criar formulario</Link>
 */}    
    <Link to="/login" className="NavLink"> Login</Link>
    <Link to="/registration" className="NavLink"> Registration</Link>
    <Link to="/" className="NavLink"> Home Page</Link>



    <Routes>
    <Route path="/" exact element={<Home />}></Route>
    <Route path="/framework/:framework_id" exact element={<Framework />}></Route>
    <Route path="/section/:section_id" exact element={<Section />}></Route>
    <Route path="/subsection/:subsection_id" exact element={<SubSection />}></Route>
    <Route path="/requirement/:requirement_id" exact element={<Requirement />}></Route>
    <Route path="/subrequirement/:subrequirement_id" exact element={<SubRequirement />}></Route>
    <Route path="/createinstance/:framework_id" exact element={<CreateInstance />}></Route>


    <Route path="/login" exact element={<Login />}></Route>
    <Route path="/registration" exact element={<Registration />}></Route>
    </Routes>
    </BrowserRouter>
  </div>);
}

export default App;
