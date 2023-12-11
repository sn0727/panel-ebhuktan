import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import WalletContent from "../../features/wallet"
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
import WalletTransactions from '../../features/wallet-transactions';
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon';
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon';
import DashboardStats from '../../features/dashboard/components/DashboardStats';
import QuickDhanTransaction from '../../features/QuickDhanTransaction';


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


const QuickDhan = () => {
  const dispatch = useDispatch()
  const [isLoading, setisLoading] = useState(false);
  const [Amount, setAmount] = useState(0);
  const [CurruntAmount, setCurruntAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState("")
  const [open, setOpen] = React.useState(false);
  const [contactNumber, setcontactNumber] = useState('');
  const [userAmount, setuserAmount] = useState('')
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  var token = sessionStorage.getItem("token")
  const decodedToken = jwtDecode(token);
  const { role } = decodedToken.user

  useEffect(() => {
    dispatch(setPageTitle({ title: "Quick Dhan Transaction" }))
    if (role === 'superAdmin') {
      SendRequest()
    }
  }, [])

  function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
  }
  const SendRequest = () => {
    setisLoading(true)
    let config = {
      url: `${ApiUrl.checkBalance}`,
      method: 'get',
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        setCurruntAmount(res)
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

  const GetUserDataByToken = async () => {
    setisLoading(true)
    let config = {
      url: `${ApiUrl.getByToken}`,
      method: 'get',
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        setuserAmount(kFormatter(res?.user?.amount))
        setisLoading(false)
      },
      err => {
        console.log(err);
        setisLoading(false)
      }
    );
  }

  const Add = () => {
    handleClose()
    setisLoading(true)
    let config = {
      url: ApiUrl.walletTransfer,
      method: 'post',
      body: {
        contact: contactNumber,
        amount: Amount
      }
    };
    setAmount('')
    APIRequest(
      config,
      res => {
        console.log(res);
        setisLoading(false)
        if (role === 'superAdmin') {
          SendRequest()
        }
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
  useEffect(() => {
    setErrorMessage('')
    GetUserDataByToken()
  }, [])

  return (
    <>
      <DynamicTitle pageTitle={"Quick Dhan Transaction"} />
      {/* <WalletContent /> */}
      <QuickDhanTransaction />
    </>
  )
}

export default QuickDhan


