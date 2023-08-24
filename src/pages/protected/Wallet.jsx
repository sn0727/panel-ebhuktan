import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import WalletContent from "./../../features/wallet"
import { setPageTitle } from '../../features/common/headerSlice'
import DynamicTitle from '../../components/dynamic_title';

const Wallet = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle({ title : "Wallet"}))
      }, [])

  return (
    <>
    <DynamicTitle pageTitle={"Wallet"} /> 
        <WalletContent />
    </>
  )
}

export default Wallet
