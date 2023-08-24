import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import RetailerContent from "./../../features/distributor"
import { setPageTitle } from '../../features/common/headerSlice'
import DynamicTitle from '../../components/dynamic_title';

const Retailer = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Retailer" }))
  }, [])

  return (
    <>
      <DynamicTitle pageTitle={"Retailer"} />
      <RetailerContent />
    </>
  )
}

export default Retailer
