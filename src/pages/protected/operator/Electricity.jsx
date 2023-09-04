import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import DynamicTitle from '../../../components/dynamic_title'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'

const Electricity = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Electricity Bill" }))
  }, [])

  return (
    <>
      <DynamicTitle pageTitle={"Electricity Bill"} />
      <OperatorListTable />
    </>
  )
}

export default Electricity
