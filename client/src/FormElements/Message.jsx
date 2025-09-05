import React, { useEffect } from "react";
const Message = ({ message, good, visible, setVisible }) => {
    useEffect(() => {
        if (!visible) return;
            const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, [visible, setVisible]);
    if (!visible) return null;
    return (
        <div className={`messageBox ${good ? "good" : "bad"}`}>
            <span>{message}</span>
            <button className="closeBtn" onClick={() => setVisible(false)}>×</button>
        </div>
    );
};
export default Message;