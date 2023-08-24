import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import ElectricityContent from "./../../features/electriccity-bill"
import { setPageTitle } from '../../features/common/headerSlice'
import DynamicTitle from '../../components/dynamic_title';

const Electricity = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle({ title : "Electricity Bill"}))
      }, [])

  return (
    <>
    <DynamicTitle pageTitle={"Electricity Bill"} />
        <ElectricityContent />
    </>
  )
}

export default Electricity
