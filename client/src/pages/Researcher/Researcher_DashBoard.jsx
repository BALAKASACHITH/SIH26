import React, { useState,useEffect,useLocation} from "react";
import { useNavigate,Routes,Route} from "react-router-dom";
import Community from './Community';
import Yours from './Yours';
import Profile from './Profile';
import Research from './Research';
const Researcher_DashBoard = () => {
    const navigate = useNavigate();
    const location=useLocation();
    const [user,setUser]=useState(null);
    const giveColor=(path)=>{
        if(location.pathname===path) return {color:"#006666"};
        return {};
    }
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/Researcher");
        }
        setUser(JSON.parse(user));
    }, [navigate]);
    if(!user) return null;
    const handleCom=()=>{
        navigate("/Researcher_DashBoard");
    }
    const handleYours=()=>{
        navigate("/Researcher_DashBoard/Yours");
    }
    const handleRe=()=>{
        navigate("/Researcher_DashBoard/Research");
    }
    const handlePro=()=>{
        navigate("/Researcher_DashBoard/Profile");
    }
    return (
        <div className="Researcher_DashBoard">
            <div className="rdTop">
                <div className="rdtLeft"></div>
                <div className="rdtRight">
                    <div className="rdtrCommunity" style={giveColor("/Researcher_DashBoard")} onClick={handleCom} >Community</div>
                    <div className="rdtrYours" onClick={handleYours} style={giveColor("/Researcher_DashBoard/Yours")} >Yours</div>
                    <div className="rdtrResearch" onClick={handleRe} style={giveColor("/Researcher_DashBoard/Research")} >Research</div>
                    <div className="rdtrResearch" >About</div>
                    <div className="rdtrResearch" >Download</div>
                    <div className="rdtrProfile" onClick={handlePro} >{(user.name[0]).toUpperCase()}</div>
                </div>
            </div>
            <div className="rdBot">
                <Routes>
                    <Route path="/" element={<Community/>} ></Route>
                    <Route path="/Yours" element={<Yours/>} ></Route>
                    <Route path="/Research" element={<Research/>} ></Route>
                    <Route path="/Profile" element={<Profile/>} ></Route>
                </Routes>
            </div>
        </div>
    );
};
export default Researcher_DashBoard;