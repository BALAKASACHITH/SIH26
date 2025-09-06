import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Community = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:2000/post");
                const user = JSON.parse(localStorage.getItem("user"));
                const othersPosts = response.data.filter(
                    (post) => user && post.email !== user.email
                );
                setPosts(othersPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPosts();
    }, []);
    return (
        <div className="Community">
            {posts.length !== 0 ? (
                posts.map((post) => {
                    const name = post.email.split("@")[0];
                    const firstChar = name.charAt(0).toUpperCase();
                    return (
                        <div key={post._id} className="communityPostCard">
                            <div className="cpTop">
                                <div className="cpAvatar">{firstChar}</div>
                                <div className="cpName">{name} say's</div>
                            </div>
                            <div className="cpBot">
                                {post.description}
                            </div>
                        </div>
                    );
                })
            ) : (
                <h1>No community posts yet!</h1>
            )}
        </div>
    );
};
export default Community;