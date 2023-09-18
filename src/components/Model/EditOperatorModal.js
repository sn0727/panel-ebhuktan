import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaEdit } from 'react-icons/fa';
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

export default function EditOperatorModal(props) {
  const { id = null } = props
  const { isPercentage = null } = props
  const { isEnable1 = null } = props
  const { getCommissionApi = null } = props
  const [open, setOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false)
  const [commission, setCommission] = useState('')
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isEnable, setIsEnable] = useState(isEnable1);

  console.log(getCommissionApi, "getCommissionApi pop")

  const Add = () => {
    setisLoading(true)
    setOpen(false)
    let config = {
      url: getCommissionApi,
      method: 'post',
      body: {
        id: id,
        commission: commission,
        isPercentage: isPercentage,
        isEnable: isEnable
      }
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        toast.success(res.message)
        window.location.reload(true)
        setisLoading(false)
      },
      err => {
        console.log(err);
        setisLoading(false)
      }
    );
  }

  const updateFormValue = ({ updateType, value }) => {
    setCommission(value)
  }


  return (
    <div>
      <FaEdit className='add-style-sdf' fontSize={20} onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <InputText type="text" placeholder={'Commission Amount'} defaultValue={''} updateType="name" containerStyle="mt-4" labelTitle={isPercentage ? "Enter Commission Percentage Value" : "Enter Commission Amount"} updateFormValue={updateFormValue} />
          <label class="switch">
            <input type="checkbox"
              checked={isEnable === "true"}
              onClick={() => setIsEnable(isEnable !== "true" ? "true" : "false")}
            />
            <span class="slider round"></span>
          </label>
          <div className="mt-3 m-auto">
            <button type="submit" className="btn btn-primary" onClick={() => Add()}>Save</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}