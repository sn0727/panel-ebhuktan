import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaEdit } from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { APIRequestWithFile, ApiUrl } from '../../utils/commanApiUrl';
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

export default function EditOperatorImageModal(props) {
  const { id = null } = props
  const { getAddIcon = null } = props
  const [open, setOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedFile, setSelectedFile] = useState('');

  console.log(selectedFile, "getCommissionApi pop")

  let formData = new FormData();
  formData.append('id', id);
  formData.append('icon', selectedFile);

  const AddIcon = () => {
    setisLoading(true)

    setOpen(false)
    let config = {
      url: getAddIcon,
      method: 'post',
      body: formData
    };
    APIRequestWithFile(
      config,
      res => {
        console.log(res);
        toast.success(res.message)
        setisLoading(false)
        setTimeout(()=>{
          window.location.reload(true)
        }, [2000])
      },
      err => {
        console.log(err);
        setisLoading(false)
      }
    );
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
    setSelectedFile(file);
  };


  return (
    <div>
      <div className="overlaybtn" onClick={handleOpen}>
        <FaEdit />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <input className='file-input-operator' type='file' name="file" onChange={handleFileChange} />
          <div className="mt-3 m-auto">
            <button type="submit" className="btn btn-primary" onClick={() => AddIcon()}>Update</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}