import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import MobileRechargeContent from "./../../features/mobile-recharge"
import { setPageTitle } from '../../features/common/headerSlice'
import DynamicTitle from '../../components/dynamic_title';

const MobileRecharge = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle({ title : "Mobile Recharge"}))
      }, [])

  return (
    <>
    <DynamicTitle pageTitle={"Mobile Recharge"} />  
        <MobileRechargeContent />
    </>
  )
}

export default MobileRecharge
