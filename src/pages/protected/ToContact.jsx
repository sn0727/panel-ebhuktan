import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import ToContactContent from "./../../features/to-contact"
import { setPageTitle } from '../../features/common/headerSlice';
import DynamicTitle from '../../components/dynamic_title';

const ToContact = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle({ title : "To Contact"}))
      }, [])

  return (
    <>
    <DynamicTitle pageTitle={"To Contact"} />
        <ToContactContent />
    </>
  )
}

export default ToContact