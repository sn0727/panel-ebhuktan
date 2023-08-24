import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import WatterBillContent from "./../../features/watter-bill"
import { setPageTitle } from '../../features/common/headerSlice'
import DynamicTitle from '../../components/dynamic_title';

const WatterBill = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle({ title : "Watter Bill"}))
      }, [])

  return (
    <>
    <DynamicTitle pageTitle={"Watter Bill"} />
        <WatterBillContent />
    </>
  )
}

export default WatterBill
