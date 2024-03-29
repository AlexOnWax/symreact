import React from "react";

const Select = ({name,error="",value,label,onChange,children}) => {
    return (
            <div className="form-group">
                <label htmlFor={name} >{label}</label>
                <select name={name} onChange={onChange} id={name} value={value}  className="form-control" >
                    {children}
                </select>
                <p className="invalid-feedback">{error}</p>
            </div>
    )
}

export default Select;