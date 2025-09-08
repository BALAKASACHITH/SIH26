import React from 'react'
import one from './one.jpeg'
import two from './two.jpeg'
import three from './three.jpeg'
import four from './four.jpeg'
import five from './five.jpeg'
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
                    <img src={one} alt="Users"/>
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