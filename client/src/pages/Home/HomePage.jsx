import dna from './dna.mp4'
import Home from './Home';
import About from './About';
import Researcher from './Researcher';
import Admin from './Admin';
import {Routes,Route,useNavigate,useLocation} from 'react-router-dom'
const HomePage = () => {
    const navigate=useNavigate();
    const location=useLocation();
    const homeClick=()=>{
        navigate("/");
    }
    const aboutClick=()=>{
        navigate("/About");
    }
    const researcherClick=()=>{
        navigate("/Researcher");
    }
    const adminClick=()=>{
        navigate("/Admin");
    }
    const giveColor=(path)=>{
        if(location.pathname===path) return{color:"#006666"};
        return {};
    }
    return (
        <div className="HomePage">
            <video autoPlay loop muted playsInline className="background-video">
                <source src={dna} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="overlay">
                <div className="Hometop">
                    <div className="htLeft" onClick={homeClick} ></div>
                    <div className="htRight">
                        <div className="htrHome" onClick={homeClick} style={giveColor("/")} >Home</div>
                        <div className="htrAbout" onClick={aboutClick} style={giveColor("/About")} >About</div>
                        <div className="htrAbout" onClick={researcherClick}>Download</div>
                        <div className="htrSelect">
                            <div className="htrsResearcher" onClick={researcherClick} style={giveColor("/Researcher")} >Researcher</div>
                            <h3>/</h3>
                            <div className="htrsAdmin" onClick={adminClick} style={giveColor("/Admin")} >Admin</div>
                        </div>
                    </div>
                </div>
                <div className="Homebot">
                    <Routes>
                        <Route path='/' element={<Home/>} ></Route>
                        <Route path='/About' element={<About/>} ></Route>
                        <Route path='/Researcher' element={<Researcher/>} ></Route>
                        <Route path='/Admin' element={<Admin/>} ></Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
}
export default HomePage;