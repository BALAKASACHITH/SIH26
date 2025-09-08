import React from 'react'
import nth from './nth.png'
import nf from './nf.png'
import no from './no.png';
import nt from './nt.png';
import two from './two.jpg'
import three from './three.jpg'
import four from './four.jpg'
import five from './five.jpg'
const Admin_DashBoard = () => {
    return (
        <div className='Admin_DashBoard'>
            <div className="AdminTop">
                    <div className="atLeft"></div>
                    <div className="atRight">
                        <h1>Admin Dashboard</h1>
                    </div>
            </div>
            <div className="AdminBot">
                <div className="metricCard">
                    <img src={no} alt="Users"/>
                </div>
                <div className="metricCard">
                    <img src={nt} alt="Users"/>
                </div>
                <div className="metricCard">
                    <img src={nth} alt="Users"/>
                </div>
                <div className="metricCard">
                    <img src={nf} alt="Users"/>
                </div>
                <div className="metricCard">
                    <img src={two} alt="Users"/>
                </div>
                <div className="metricCard">
                    <img src={three} alt="Users"/>
                </div>
                <div className="metricCard">
                    <img src={four} alt="Users"/>
                </div>
                <div className="metricCard">
                    <img src={five} alt="Users"/>
                </div>
            </div>
        </div>
    )
}
export default Admin_DashBoard