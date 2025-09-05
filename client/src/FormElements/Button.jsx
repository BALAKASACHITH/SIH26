import React from 'react'
const Button = ({ cn,text = "Click Me", onClick}) => {
    return (
        <button onClick={onClick} className={cn}>
            {text}
        </button>
    )
}
export default Button