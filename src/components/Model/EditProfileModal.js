import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { BiEdit } from "react-icons/bi"
import { useState } from 'react';
import { toast } from 'react-toastify';
import { APIRequest, ApiUrl } from '../../utils/commanApiUrl';
import InputText from '../Input/InputText';
import jwtDecode from 'jwt-decode';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '16px'
};

export default function EditProfileModal({id = null, profileData, Aprovehandler}) {
    const token = jwtDecode(localStorage.getItem('token'));
    let role = token?.user.role;
    // const { id = null } = props
    // const { profileData = null } = props
    const [open, setOpen] = useState(false);
    const [isLoading, setisLoading] = useState(false)


    console.log(id, "========================= id")

    const [editProfile, setEditProfile] = useState({
        name: profileData.name,
        address: profileData.address,
        state: profileData.state,
        district: profileData.district,
        pincode: profileData.postalCode,
        adminid: profileData.adminId,
    })

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const EditProfile = () => {
        setisLoading(true)
        
        let config = {
            url: ApiUrl.editUserProfile,
            method: 'post',
            body: {
                userId: id,
                adminId: editProfile.adminid,
                address: editProfile.address,
                postalCode: editProfile.pincode,
                state: editProfile.state,
                district: editProfile.district,
                name: editProfile.name
            }
        };
        APIRequest(
            config,
            res => {
                console.log(res);
                toast.success(res?.message)
                Aprovehandler();
                setOpen(false)
                setisLoading(false)

                // window.location.reload(false)
            },
            err => {
                console.log(err);
                toast.error(err?.message)
                setisLoading(false)
            }
        );
    }
    const updateFormValue = ({ updateType, value }) => {
        setEditProfile({...editProfile, [updateType] : value})
    }

    const handleEditProfile = () => {
        console.log("edit func calling...")
        EditProfile();
    }

    return (
        <div>
            <BiEdit fontSize={30} onClick={handleOpen} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <InputText type="text" placeholder={'Name'} value={editProfile.name} defaultValue={editProfile.name} updateType="name" containerStyle="mt-0" labelTitle="Enter Name" updateFormValue={updateFormValue} />
                        <InputText type="text" placeholder={'Address'} value={editProfile.address} defaultValue={editProfile.address} updateType="address" containerStyle="mt-0" labelTitle="Enter Address" updateFormValue={updateFormValue} />
                        <InputText type="text" placeholder={'State'} value={editProfile.state} defaultValue={editProfile.state} updateType="state" containerStyle="mt-0" labelTitle="Enter State" updateFormValue={updateFormValue} />
                        <InputText type="text" placeholder={'District'} value={editProfile.district} defaultValue={editProfile.district} updateType="district" containerStyle="mt-0" labelTitle="Enter District" updateFormValue={updateFormValue} />
                        <InputText type="number" placeholder={'Pin Code'} value={editProfile.pincode} defaultValue={editProfile.pincode} updateType="pincode" containerStyle="mt-0" labelTitle="Enter Pin Code" updateFormValue={updateFormValue} />
                        <InputText type="number" placeholder={role === 'distributor' ? "Cluster Id" : role === 'retailer' || role ==='franchise'? 'Distributor': 'Referral Id'} value={editProfile.adminid} defaultValue={editProfile.adminid} updateType="adminid" containerStyle="mt-0" labelTitle={role === 'distributor' ? "Cluster Id" : role === 'retailer' || role ==='franchise'? 'Distributor': 'Referral Id'} updateFormValue={updateFormValue} />
                    </div>
                    <div className="mt-3 m-auto">
                        <button type="submit" className="btn btn-primary" onClick={() => handleEditProfile()}>Save</button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}