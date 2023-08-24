import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { ApiUrl } from '../../../utils/commanApiUrl';
// import { showNotification } from "../../common/headerSlice"
// import { addNewLead } from "../leadSlice";

const INITIAL_LEAD_OBJ = {
    name: "",
    email: "",
    contact: "",
    postalCode: "",
    aadharCard: "",
    panCard: ""
}



function AddLeadModalBody({ closeModal }) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
    const [state, setState] = useState("")
    const [district, setDistrict] = useState("")
    const [pancard, setPan] = useState(null)
    const [addharcard, setAddhar] = useState(null)

    // console.log(pan)
    // console.log(addhar)

    


    // select list dropdown
    
    const saveNewLead = async() => {
        if (leadObj.name.trim() === "") return setErrorMessage("First Name is required!")
        else if (leadObj.email.trim() === "") return setErrorMessage("Email id is required!")
        else {

            var formData = new FormData();
            formData.append('name', leadObj.name);
            formData.append('email', leadObj.email);
            formData.append('contact', leadObj.contact);
            formData.append('postalCode', leadObj.postalCode);    
            formData.append('state', state);    
            formData.append('district', district);    
            formData.append('aadharCard', addharcard);    
            formData.append('panCard', pancard);    

            let result = await fetch(ApiUrl.clusterPostList, {
                method: "post",
                body: formData,
                headers: {
                    'Content-Type': `multipart/form-data`,
                }
                
            })
            let response = await result.json();
            console.log(response)
            closeModal()
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLeadObj({ ...leadObj, [updateType]: value })
    }

    // // file only
    // const updateFormFileValue = ({ updateType, files }) => {
    //     setErrorMessage("")
    //     setFile({ ...leadObj, [updateType]: files })
    // }


    return (
        <>

            <InputText type="text" defaultValue={leadObj.name} updateType="name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue} />

            <InputText type="email" defaultValue={leadObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue} />

            <InputText type="text" defaultValue={leadObj.postalCode} updateType="postalCode" containerStyle="mt-4" labelTitle="Postal Code" updateFormValue={updateFormValue} />
            
            <InputText type="text" defaultValue={leadObj.contact} updateType="contact" containerStyle="mt-4" labelTitle="Contact" updateFormValue={updateFormValue} />

            <div className="select-box">
                <span className="mt-4 select-slide"> Select District </span>
                <select name="selectedFruit" className="select-list" value={state} onChange={(e)=>setState(e.target.value)}>
                    <option value="apple">Select District</option>
                    <option value="Sambhal">Sambhal</option>
                    <option value="Moradabad">Moradabad</option>
                    <option value="Rampur">Rampur</option>
                    <option value="Alighar">Alighar</option>
                    <option value="Hasanpur">Hasanpur</option>
                </select>
            </div>

            <div className="select-box">
                <span className="mt-4 select-slide"> Select State </span>
                <select name="selectedFruit" value={district} className="select-list" onChange={(e)=>setDistrict(e.target.value)}>
                    <option value="Select State">Select State</option>
                    <option value="Sambhal">Sambhal</option>
                    <option value="Moradabad">Moradabad</option>
                    <option value="Rampur">Rampur</option>
                    <option value="Alighar">Alighar</option>
                    <option value="Hasanpur">Hasanpur</option>
                </select>
            </div>

            <input type="file" accept="image/*" defaultValue={''} name="aadharCard" containerStyle="mt-4" className="py-4" labelTitle="Addhar Card Photo" onChange={(e)=>setAddhar(e.target.files[0])} />

            <input type="file" accept="image/*" defaultValue={''} name="panCard" containerStyle="mt-4" className="py-4" labelTitle="Pan Card Photo" onChange={(e)=>setPan(e.target.files[0])} />


            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
                <button type="submit" className="btn btn-primary px-6" onClick={() => saveNewLead()}>Save</button>
            </div>
        </>
    )
}

export default AddLeadModalBody