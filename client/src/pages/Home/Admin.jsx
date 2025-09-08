import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../FormElements/Input';
import Button from '../../FormElements/Button';
import Message from '../../FormElements/Message';
const Admin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [good, setGood] = useState(true);
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const handleLogin = () => {
        if (email === "ADMIN" && password === "helloAdmin") {
            setMessage("Welcome Admin!");
            setGood(true);
            setVisible(true);
            setTimeout(() => {
                navigate("/Admin_DashBoard");
            }, 800);
        } else {
            setMessage("Invalid Admin credentials");
            setGood(false);
            setVisible(true);
        }
    };
    return (
        <div className='Admin'>
            {visible && (
                <div className="MessageAdmin">
                    <Message
                        message={message}
                        good={good}
                        visible={visible}
                        setVisible={setVisible}
                    />
                </div>
            )}
            <div className="rBox">
                <div className="rbTop">Admin Login</div>
                <div className="rbBot">
                    <Input
                        cn="login_registerInput"
                        value={email}
                        setValue={setEmail}
                        placeholder='Enter UserName (EmailId)'
                    />
                    <Input
                        cn="login_registerInput"
                        type='password'
                        value={password}
                        setValue={setPassword}
                        placeholder='Enter Password'
                    />
                    <Button
                        cn="login_registerButton"
                        text="Login"
                        onClick={handleLogin}
                    />
                </div>
            </div>
        </div>
    );
};
export default Admin;