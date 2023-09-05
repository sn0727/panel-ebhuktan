import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import WalletContent from "./../../features/wallet"
import { setPageTitle } from '../../features/common/headerSlice'
import DynamicTitle from '../../components/dynamic_title';
import Transactions from '../../features/transactions';
import { Button } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { APIRequest, ApiUrl } from '../../utils/commanApiUrl';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ErrorText from '../../components/Typography/ErrorText';
import { toast } from 'react-toastify';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px'
};

const Wallet = () => {
  const dispatch = useDispatch()
  const [isLoading, setisLoading] = useState(false);
  const [Amount, setAmount] = useState(0);
  const [CurruntAmount, setCurruntAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState("")
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  var token = localStorage.getItem("token")
  const decodedToken = jwtDecode(token);
  const { role } = decodedToken.user

  useEffect(() => {
    dispatch(setPageTitle({ title: "Wallet" }))
    SendRequest()
  }, [])

  const SendRequest = () => {
    setisLoading(true)
    let config = {
      url: `${ApiUrl.getByToken}`,
      method: 'get',
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        setCurruntAmount(res.user.amount)
        setisLoading(false)
      },
      err => {
        console.log(err);
        setisLoading(false)
        if (err?.message) {
          toast.error(err.message)
        }
      }
    );
  }

  const Add = () => {
    handleClose()
    setisLoading(true)
    let config = {
      url: ApiUrl.addAmount,
      method: 'post',
      body: {
        amount: Amount
      }
    };
    setAmount('')
    APIRequest(
      config,
      res => {
        console.log(res);
        setisLoading(false)
        SendRequest()
        toast.success(res?.message)
      },
      err => {
        console.log(err);
        setisLoading(false)
        toast.error(err.message)
      }
    );
  }

  const Submit = () => {
    setErrorMessage('')
    if (parseInt(Amount) > 1) {
      Add()
    }
    return setErrorMessage("Amount is required! (use any value)")
  }
  useEffect(()=>{
    setErrorMessage('')
  },[])

  return (
    <>
      <DynamicTitle pageTitle={"Wallet"} />
      {/* <WalletContent /> */}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className='shadow' style={{ width: '300px', padding: '20px', backgroundColor: '#fff', borderRadius: '16px' }}>
          <h5>Total amount</h5>
          <h2 style={{ fontSize: '30px', fontWeight: 700 }}> {CurruntAmount}</h2>
        </div>
        <div>
          {role === 'superAdmin' ? <button onClick={handleOpen} className="btn px-6 btn-sm normal-case btn-primary"> Add Amount</button> : null}
        </div>
      </div>
      <Transactions />


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>Add amount</h1>
          <input
            onChange={(e) => setAmount(e.target.value)}
            value={Amount}
            name="amount"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="100" />
          <div className="w-full px-3">
            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
          </div>
          <button onClick={() => Submit()} className="btn px-6 mt-5 btn-primary" style={{ width: '100%' }}> Add </button>
        </Box>
      </Modal>
    </>
  )
}

export default Wallet


