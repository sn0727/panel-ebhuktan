import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import DynamicTitle from '../../components/dynamic_title';
import FranchiseContent from '../../features/franchise';

const Franchise = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Franchise" }))
  }, [])

  return (
    <>
      <DynamicTitle pageTitle={"Franchise"} />
      <FranchiseContent />
    </>
  )
}

export default Franchise