import { useState } from "react"


function InputTextUpperCase({labelTitle, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType, disabled}){

    const [value, setValue] = useState(defaultValue)

    const updateInputValue = (val) => {
        setValue(val)
        updateFormValue({updateType, value : val})
    }

    return(
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle} <span className="text-xl" style={{color: 'red'}}>*</span></span>
            </label>
            <input type={type || "text"} value={value} placeholder={placeholder || ""} onChange={(e) => updateInputValue(e.target.value)} className="input  input-bordered w-full uppercase" disabled={disabled || ""} />
        </div>
    )
}


export default InputTextUpperCase