import { useState } from "react"


function InputTextOptional({labelTitle, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType, disabled}){

    const [value, setValue] = useState(defaultValue)

    const updateInputValue = (val) => {
        setValue(val)
        updateFormValue({updateType, value : val})
    }

    return(
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle} <span className="text-xl" style={{visibility: 'hidden'}}>*</span></span>
            </label>
            <input type={type || "text"} value={value} placeholder={placeholder || ""} onChange={(e) => updateInputValue(e.target.value)} className="input  input-bordered w-full " disabled={disabled || ""} />
        </div>
    )
}


export default InputTextOptional