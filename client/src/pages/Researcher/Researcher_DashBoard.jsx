import React, { useState,useEffect } from "react";
import { useNavigate,Routes,Route} from "react-router-dom";
import Community from './Community';
import Yours from './Yours';
import Profile from './Profile';
import Research from './Research';
const Researcher_DashBoard = () => {
    const navigate = useNavigate();
    const [user,setUser]=useState(null);
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
                    <div className="rdtrCommunity" onClick={handleCom} >Community</div>
                    <div className="rdtrYours" onClick={handleYours} >Yours</div>
                    <div className="rdtrResearch" onClick={handleRe} >Research</div>
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