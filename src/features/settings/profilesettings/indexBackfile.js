import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../../components/Cards/TitleCard"
import { showNotification } from '../../common/headerSlice'
import InputText from '../../../components/Input/InputText'
import TextAreaInput from '../../../components/Input/TextAreaInput'
import ToogleInput from '../../../components/Input/ToogleInput'
import { ApiUrl, APIRequest, APIRequestWithFile } from "../../../utils/commanApiUrl"
import jwtDecode from 'jwt-decode';
import axios from "axios"
import { config } from "daisyui"
import { toast } from "react-toastify"

function ProfileSettings() {
    
    const [file, setFile] = useState(null);
    const [isLoading, setisLoading] = useState(false);

    // get profile information from the api
    var token = localStorage.getItem("token")
    const decodedToken = jwtDecode(token);

    const {
        partnerId,
        name,
        email,
        contact,
        district,
        state,
        aadharNo,
        panNo,
        postalCode,
        role,
        address,
        image,
    } = decodedToken.user

    const [profileUpdateData, setProfileUpdateData] = useState(
        {
            name: name,
            district: district,
            state: state,
            address: address
        }
    );

    const updateFormValue = ({ updateType, value }) => {
        setProfileUpdateData({ ...profileUpdateData, [updateType]: value })
    }

    
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    // create formdata 
    let formdata = new FormData();
    formdata.append('image', file);
    formdata.append('name', profileUpdateData.name);
    formdata.append('state', profileUpdateData.state);
    formdata.append('district', profileUpdateData.district);
    formdata.append('address', profileUpdateData.address);

    const userProfieleUpdate = () => {
        setisLoading(true)
        config = {
            url: ApiUrl.editProfile,
            method: 'post',
            body: formdata
        }
        APIRequestWithFile(
            config,
            res => {
                console.log(res, "res ===================== dd")
                toast.success(res?.message)
                localStorage.setItem("token", res?.token)
                setisLoading(false)
                setTimeout(()=>{
                    window.location.reload(true);
                },1500)
                
            },
            err => {
                console.log(err, "err====================== dd")
                toast.error(err?.message)
                setisLoading(false)
            }
        )
    }

    // Call API to update profile settings changes
    const updateProfileUser = (e) => {
        e.preventDefault();
        userProfieleUpdate()
    }

    return (
        <>

            <TitleCard title={`Profile Settings | ${role} | Partner Id : ${partnerId}`} topMargin="mt-2">
                {/* <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                    <h3>User Id</h3>
                    <h3>{id}</h3>
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputText labelTitle="Name" defaultValue={name} updateType="name" value={profileUpdateData.name} updateFormValue={updateFormValue} />
                    <InputText labelTitle="Email Id" defaultValue={email} updateType="email" updateFormValue={updateFormValue} disabled="disabled" />
                    <InputText labelTitle="Contact" defaultValue={contact} updateType="contact" updateFormValue={updateFormValue} disabled="disabled" />
                    <InputText labelTitle="State" defaultValue={state} updateType="state" value={profileUpdateData.state} updateFormValue={updateFormValue} />
                    <InputText labelTitle="District" defaultValue={district} updateType="district" value={profileUpdateData.district} updateFormValue={updateFormValue} />
                    <InputText labelTitle="Aadhar No" defaultValue={aadharNo} updateType="aadharNo" updateFormValue={updateFormValue} disabled="disabled" />
                    <InputText labelTitle="Pan Card No" defaultValue={panNo} updateType="panNo" updateFormValue={updateFormValue} disabled="disabled" />
                    <InputText labelTitle="Postal Code" defaultValue={postalCode} updateType="postalCode" updateFormValue={updateFormValue} disabled="disabled" />
                    <InputText labelTitle="Address" defaultValue={address} updateType="address" value={profileUpdateData.address} updateFormValue={updateFormValue} />
                    <div className="sdfhsd-sdfkdsj">
                        <input type="file" accept="*" onChange={handleFileChange} className="fileProfile" />
                        <img src={image === "" ? "/logo02.png" : image} alt="profile-image" className="profileUpdate-dfd"/>
                    </div>
                </div>
                <div className="mt-16">
                    <button type="submit" className="btn btn-primary float-right" onClick={updateProfileUser}>Update</button>
                </div>
                {isLoading ? document.body.classList.add('loading-indicator') : document.body.classList.remove('loading-indicator')}
            </TitleCard>
        </>
    )
}


export default ProfileSettings