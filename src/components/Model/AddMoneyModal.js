import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { APIRequest, ApiUrl } from '../../utils/commanApiUrl';
import InputText from '../Input/InputText';

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

export default function AddMoneyModal(props) {
    const { id = null } = props
    const [open, setOpen] = useState(false);
    const [isLoading, setisLoading] = useState(false)
    const [Amount, setAmount] = useState('')
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const Add = () => {
        setisLoading(true)
        setOpen(false)
        let config = {
            url: ApiUrl.addAmount,
            method: 'post',
            body: {
                amount: Amount,
                id: id
            }
        };
        APIRequest(
            config,
            res => {
                console.log(res);
                toast.success(res.message)
                setisLoading(false)
            },
            err => {
                console.log(err);
                setisLoading(false)
            }
        );
    }
    const updateFormValue = ({ updateType, value }) => {
        setAmount(value)
    }

    return (
        <div>
            <AiOutlinePlusCircle fontSize={30} onClick={handleOpen} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <InputText type="text" placeholder={'100'} value={Amount} defaultValue={''} updateType="name" containerStyle="mt-4" labelTitle="Enter amount" updateFormValue={updateFormValue} />
                    <div className="mt-3 m-auto">
                        <button type="submit" className="btn btn-primary" onClick={() => Add()}>Add</button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}