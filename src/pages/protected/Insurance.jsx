import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import InsuranceContent from '../../features/insurance';
import { setPageTitle } from '../../features/common/headerSlice'
import DynamicTitle from '../../components/dynamic_title';

const Insurance = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle({ title : "Insurance"}))
    }, [])
    
    return (
        <>
            <DynamicTitle pageTitle="Insurance" />
            <InsuranceContent />
        </>
  )
}

export default Insurance
