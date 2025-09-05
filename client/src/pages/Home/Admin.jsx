import React from 'react'
import {useState} from 'react'
import Input from '../../FormElements/Input'
import Button from '../../FormElements/Button'
const Admin = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    return (
        <div className='Admin'>
            <div className="rBox">
                <div className="rbTop">Admin Login</div>
                <div className="rbBot">
                    <Input cn="login_registerInput" value={email} setValue={setEmail} placeholder='Enter UserName (EmailId)' />
                    <Input cn="login_registerInput" type='password' value={password} setValue={setPassword} placeholder='Enter Password'/>
                    <Button cn="login_registerButton" text="Login"/>
                </div>
            </div>
        </div>
    )
}

export default Admin
