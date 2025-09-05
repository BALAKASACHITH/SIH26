import React from 'react'
import HomePage from './pages/Home/HomePage'
import {Routes,Route} from 'react-router-dom'
const App = () => {
    return (
      <div className='App'>
        <Routes>
          <Route path='/*' element={<HomePage/>} ></Route>
        </Routes>
      </div>
    )
}

export default App
