import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import CreditCardContent from "./../../features/credit-card"
import { setPageTitle } from '../../features/common/headerSlice'
import DynamicTitle from '../../components/dynamic_title';

const CreditCard = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle({ title : "Credit Card"}))
      }, [])

  return (
    <>
    <DynamicTitle pageTitle="Credit Card" />
        <CreditCardContent />
    </>
  )
}

export default CreditCard
