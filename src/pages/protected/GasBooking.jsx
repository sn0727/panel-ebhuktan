import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import GasBookingContent from "./../../features/gas-booking"
import { setPageTitle } from '../../features/common/headerSlice'
import DynamicTitle from '../../components/dynamic_title';

const GasBooking = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle({ title : "Gas Booking"}))
      }, [])

  return (
    <>
    <DynamicTitle pageTitle={"Gas Booking"} />
        <GasBookingContent />
    </>
  )
}

export default GasBooking
