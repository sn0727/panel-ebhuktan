import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import MunicipalServiceContent from "./../../features/municipal-service"
import { setPageTitle } from '../../features/common/headerSlice'
import DynamicTitle from '../../components/dynamic_title';

const MunicipalService = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle({ title : "Municipal Service"}))
      }, [])

  return (
    <>
    <DynamicTitle pageTitle="Municipal Service" />
        <MunicipalServiceContent />
    </>
  )
}

export default MunicipalService
