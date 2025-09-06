import React, { useState,useEffect } from 'react';
import Input from '../../FormElements/Input';
import Button from '../../FormElements/Button';
import Message from '../../FormElements/Message';
import axios from 'axios';
const Yours = () => {
    const [descr, setDescr] = useState("");
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [good, setGood] = useState(true);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetchPosts();
    }, []);
    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:2000/post");
            const allPosts = response.data;
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;
            const filteredPosts = allPosts.filter(post => post.email === user.email);
            setPosts(filteredPosts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
    const handleDelete = async (_id) => {
        try {
            const response = await axios.delete("http://localhost:2000/post/delete", {
                data: { _id }
            });
            setMessage(response.data.message);
            setGood(true);
            setVisible(true);
            fetchPosts(); // refresh after delete
        } catch (error) {
            console.error("Error deleting post:", error.response ? error.response.data : error.message);
            setMessage(error.response?.data?.message || "Something went wrong");
            setGood(false);
            setVisible(true);
        }
    };
    const handleAdd = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user || !user.email) {
                setMessage("Please login first!");
                setGood(false);
                setVisible(true);
                return;
            }
            const response = await axios.post("http://localhost:2000/post/create", {
                email: user.email,
                description: descr
            });
            const data = response.data;
            console.log("Response object:", data);
            setMessage(data.message);
            setGood(true);
            setVisible(true);
            fetchPosts();
            setDescr("");
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            setMessage(error.response?.data?.message || "Something went wrong");
            setGood(false);
            setVisible(true);
        }
    };
    return (
        <div className='Yours'>
            {visible && (
                <div className="MessageYours">
                    <Message
                        message={message}
                        good={good}
                        visible={visible}
                        setVisible={setVisible}
                    />
                </div>
            )}
            <div className="yTop">
                <Input
                    cn="ytInput"
                    value={descr}
                    setValue={setDescr}
                    placeholder='Enter Your Thoughts'
                />
                <Button
                    cn='ytButton'
                    text='Add'
                    onClick={handleAdd}
                />
            </div>
            <div className="yBot">
                {posts.length!=0?(posts.map(post => (
                    <div key={post._id} className='YoursPost'>
                        <div className="postCard">
                            {post.description}
                        </div>
                        <Button
                            cn="deleteBtn"
                            text="Delete"
                            onClick={() => handleDelete(post._id)}
                        />
                    </div>
                ))):<h1>NO POSTS YET !!</h1>}
            </div>
        </div>
    );
};
export default Yours;