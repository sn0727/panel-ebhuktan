import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'
import InputText from '../../../components/Input/InputText'
import TextAreaInput from '../../../components/Input/TextAreaInput'
import ToogleInput from '../../../components/Input/ToogleInput'
import { ApiUrl, APIRequest } from "../../../utils/commanApiUrl"
import jwtDecode from 'jwt-decode';
import axios from "axios"

function ProfileSettings() {

    const dispatch = useDispatch()

    // get profile information from the api
    var token = localStorage.getItem("token")
    const decodedToken = jwtDecode(token);
    const {
        id,
        name,
        email,
        contact,
        district,
        state,
        aadharNo,
        panNo,
        postalCode,
        role,
    } = decodedToken.user

    const profileUpdate = {
        name: name,
        email: email,
        contact: contact,
        district: district,
        state: state,
        aadharNo: aadharNo,
        panNo: panNo,
        postalCode: postalCode,
    }

    const [profileUpdateData, setProfileUpdateData] = useState(profileUpdate);
    const [file, setFile] = useState(null);

    console.log(file)

    // Call API to update profile settings changes
    const updateProfileUser = (e) => {
        e.preventDefault();
        alert("Proccessing..")
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const updateFormValue = ({ updateType, value }) => {
        setProfileUpdateData({ ...profileUpdateData, [updateType]: value })
    }

    return (
        <>

            <TitleCard title="Profile Settings" topMargin="mt-2">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Name" defaultValue={name} updateType="name" updateFormValue={updateFormValue} />
                    <InputText labelTitle="Email Id" defaultValue={email} updateType="email" updateFormValue={updateFormValue} />
                    <InputText labelTitle="Contact" defaultValue={contact} updateType="contact" updateFormValue={updateFormValue} />
                    <InputText labelTitle="State" defaultValue={state} updateType="state" updateFormValue={updateFormValue} />
                    <InputText labelTitle="District" defaultValue={district} updateType="district" updateFormValue={updateFormValue} />
                    <InputText labelTitle="Aadhar No" defaultValue={aadharNo} updateType="aadharNo" updateFormValue={updateFormValue} />
                    <InputText labelTitle="Pan Card No" defaultValue={panNo} updateType="panNo" updateFormValue={updateFormValue} />
                    <InputText labelTitle="Postal Code" defaultValue={postalCode} updateType="postalCode" updateFormValue={updateFormValue} />
                    <InputText labelTitle="Address" defaultValue="Delhi India" updateType="address" updateFormValue={updateFormValue} />
                    <InputText labelTitle="Password" defaultValue={'12222'} updateType="password" updateFormValue={updateFormValue} />
                    <InputText labelTitle="role" defaultValue={role} updateType="role" updateFormValue={updateFormValue} />
                    <div className="sdfhsd-sdfkdsj">
                        <input type="file" accept="*" onChange={handleFileChange} className="fileProfile" />
                        <img src={file === null || file === "" ? "/logo02.png" : file} width={80} alt="profile-image" />
                    </div>
                </div>
                {/* <div className="mt-16">
                    <button type="submit" className="btn btn-primary float-right" onClick={updateProfileUser}>Update</button>
                </div> */}
            </TitleCard>
        </>
    )
}


export default ProfileSettings