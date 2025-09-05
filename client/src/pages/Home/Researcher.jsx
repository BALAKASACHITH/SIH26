import React, { useState } from 'react';
import Input from '../../FormElements/Input';
import Button from '../../FormElements/Button';
import Message from '../../FormElements/Message';
import axios from 'axios';
const Researcher = () => {
    const [login, setLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [good, setGood] = useState(true);
    const swap = () => {
        setLogin(!login);
    };
    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:2000/auth", {
                action: login ? "signin" : "signup",
                email,
                password,
            });
            const data = response.data;
            console.log("Response object:", data);
            setMessage(data.message);
            setGood(true);
            setVisible(true);
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            setMessage(error.response?.data?.message || "Something went wrong");
            setGood(false);
            setVisible(true);
        }
    };
    return (
        <div className='Researcher'>
            {visible && (
                <div className="MessageResearch">
                    <Message
                        message={message}
                        good={good}
                        visible={visible}
                        setVisible={setVisible}
                    />
                </div>
            )}
            <div className="rBox">
                <div className="rbTop">{login ? "Login" : "Register"}</div>
                <div className="rbBot">
                    <a href="#" onClick={swap}>
                        {login ? "New Here ? Click To Register" : "Existing User ? Click To Login"}
                    </a>
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
                        text={login ? "Login" : "Register"}
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
};
export default Researcher;