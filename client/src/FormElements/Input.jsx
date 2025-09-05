import React from 'react'
const Input = ({ cn,type = "text", value, setValue, placeholder = "Enter text here..." }) => {
    return (
        <input
            className={cn}
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
        />
    )
}
export default Input