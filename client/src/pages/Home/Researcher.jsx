import React from 'react'
import {useState} from 'react'
import Input from '../../FormElements/Input'
import Button from '../../FormElements/Button'
const Researcher = () => {
    const [login,setLogin]=useState(true);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const swap=()=>{
        setLogin(!login);
    }
    return (
        <div className='Researcher'>
            <div className="rBox">
                <div className="rbTop">{login?"Login":"Register"}</div>
                <div className="rbBot">
                    <a href="#" onClick={swap} >{login?"New Here ? Click To Register":"Existing User ? Click To Login"}</a>
                    <Input cn="login_registerInput" value={email} setValue={setEmail} placeholder='Enter UserName (EmailId)' />
                    <Input cn="login_registerInput" type='password' value={password} setValue={setPassword} placeholder='Enter Password'/>
                    <Button cn="login_registerButton" text={login?"Login":"Register"} />
                </div>
            </div>
        </div>
    )
}

export default Researcher