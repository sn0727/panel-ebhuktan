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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

export default function EditAdminModal({ id = null, adminId = null, status, filterTransaction, useDetails }) {
    const token = jwtDecode(sessionStorage.getItem('token'));
    let role = token?.user.role;

    const [open, setOpen] = useState(false);
    const [isLoading, setisLoading] = useState(false)
    const [changeStatus, setChangeStatus] = React.useState('');
    const [editProfile, setEditProfile] = useState({
        adminid: adminId ? adminId : '',
    })

    const handleChange = (event) => {
        setChangeStatus(event.target.value);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const updateFormValue = ({ updateType, value }) => {
        setEditProfile({ ...editProfile, [updateType]: value })
    }

    const SendRequest = async () => {
        setisLoading(true)
        let config = {
            url: ApiUrl.updateStatus,
            method: 'post',
            body: {
                userId: id,
                status: changeStatus,
                adminId: editProfile.adminid
            }
        };
        APIRequest(
            config,
            res => {
                console.log(res);
                toast.success(res?.message)
                filterTransaction();
                setOpen(false)
                setisLoading(false)
            },
            err => {
                console.log(err);
                toast.error(err?.message)
                setisLoading(false)
            }
        );
    }


    const handleEditAdminId = () => {
        SendRequest();
    }

    return (
        <div>
            <div fontSize={30} onClick={handleOpen}> {status === "approved" ? 'approved' : 'Change Status'}</div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="ddfd">
                        <FormControl sx={{ mt: 2, minWidth: '100%' }} size="small">
                            <InputLabel id="demo-select-small-label">Change Status</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={changeStatus}
                                label="Change Status"
                                onChange={handleChange}
                            >
                                <MenuItem value={'approved'}>Approved</MenuItem>
                                <MenuItem value={'rejected'}>Rejected</MenuItem>
                            </Select>
                        </FormControl>
                        {  
                            useDetails?.role === "user" ? null :
                            changeStatus === "rejected" ? null :
                                < InputText
                                    type="text"
                                    placeholder="Referral Id"
                                    value={editProfile.adminid}
                                    defaultValue={editProfile.adminid}
                                    updateType="adminid"
                                    containerStyle="mt-0"
                                    labelTitle={
                                        role === 'distributor' ? "Cluster Id" : role === 'retailer' || role === 'franchise' ? 'Distributor' : 'Referral Id'
                                    }
                                    updateFormValue={updateFormValue}
                                />
                        }
                    </div>
                    <div className="mt-3 m-auto">
                        <button type="submit" className="btn btn-primary" onClick={handleEditAdminId}>Save</button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}