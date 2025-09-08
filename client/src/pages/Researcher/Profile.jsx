import React, { useState } from 'react';
import Button from '../../FormElements/Button';
const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <div className="Profile">
            <Button cn="userLogout" text="Logout" onClick={handleLogout} />
            <div className="profilePersonal">
                <div
                    className="profileHeader"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <h1>Personal Information</h1>
                    <i
                        className={`fa ${isOpen ? "fa-chevron-up" : "fa-chevron-down"} arrowIcon`}
                        aria-hidden="true"
                    ></i>
                </div>
                <div className={`profileDetails ${isOpen ? "open" : ""}`}>
                    {user ? (
                        <>
                            <p><strong>UserName:</strong> {user.email.split("@")[0]}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Research Papers Published:</strong> {user.papersPublished || 0}</p>
                            <p><strong>Field of Study:</strong> {user.field || "NA"}</p>
                            <p><strong>Institution:</strong> {user.institution || "NA"}</p>
                            <p><strong>Current Position:</strong> {user.position || "NA"}</p>
                        </>
                    ) : (
                        <p>No user data found</p>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Profile;