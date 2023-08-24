import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import DthRechargeContent from "./../../features/dth-recharge"
import { setPageTitle } from '../../features/common/headerSlice'
import DynamicTitle from '../../components/dynamic_title';

const DthRecharge = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle({ title : "DTH Recharge"}))
      }, [])

  return (
    <>
    <DynamicTitle pageTitle={"DTH Recharge"} />
        <DthRechargeContent />
    </>
  )
}

export default DthRecharge
