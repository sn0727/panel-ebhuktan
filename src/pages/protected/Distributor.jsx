import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import DistributorContent from "./../../features/distributor"
import { setPageTitle } from '../../features/common/headerSlice'
import DynamicTitle from '../../components/dynamic_title';

const Distributor = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "District Partner" }))
  }, [])

  return (
    <>
      <DynamicTitle pageTitle={"District Partner"} />
      <DistributorContent />
    </>
  )
}

export default Distributor
