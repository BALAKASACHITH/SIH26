import React from 'react'
import HomePage from './pages/Home/HomePage'
import Researcher_DashBoard from './pages/Researcher/Researcher_DashBoard'
import Admin_DashBoard from './pages/Admin/Admin_DashBoard'
import {Routes,Route,Navigate} from 'react-router-dom'
const App = () => {
    const user=localStorage.getItem("user");
    return (
      <div className='App'>
        <Routes>
          <Route path='/*' element={user?<Navigate to="/Researcher_DashBoard"/>:<HomePage/>} ></Route>
          <Route path='/Researcher_DashBoard/*' element={<Researcher_DashBoard/>} ></Route>
          <Route path='/Admin_DashBoard/*' element={<Admin_DashBoard/>} ></Route>
        </Routes>
      </div>
    )
}
export default App