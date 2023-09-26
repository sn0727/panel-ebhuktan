import * as React from 'react';
import Box from '@mui/material/Box';
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

export default function CustomizeCommissionModal({ cluster, retailer, distributor, gst, franchise, type }) {
  const [commission, setCommission] = useState('')
  const [open, setOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let body;

  if (type === "cluster") {
    body = {
      cluster: commission
    }
  } else if (type === "retailer") {
    body = {
      retailer: commission
    }
    console.log(retailer)
  } else if (type === "distributor") {
    body = {
      distributor: commission
    }
    console.log(distributor)
  } else if (type === "gst") {
    body = {
      gst: commission
    }
    console.log(gst)
  } else if (type === "franchise") {
    body = {
      franchise: commission
    }
    console.log(franchise)
  }

  console.log(body, "body data")

  const Add = () => {
    setisLoading(true)
    setOpen(false)

    let config = {
      url: ApiUrl.superAdminUpdateConfig,
      method: 'post',
      body: body
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        toast.success(res.message)
        setTimeout(() => {
          window.location.reload(true)
        }, [1000])
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
          <InputText type="text" placeholder={'Commission Amount'} defaultValue={''} updateType="name" containerStyle="mt-4" labelTitle={"Enter Commission Amount"} updateFormValue={updateFormValue} />
          <div className="mt-3 m-auto">
            <button type="submit" className="btn btn-primary" onClick={() => Add()}>Save</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}