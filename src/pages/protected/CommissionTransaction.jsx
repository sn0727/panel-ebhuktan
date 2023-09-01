import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import CommissionTransactionContent from '../../features/commission-transaction';
import { setPageTitle } from '../../features/common/headerSlice'
import DynamicTitle from '../../components/dynamic_title';

const Insurance = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle({ title : "Commission Transaction"}))
    }, [])
    
    return (
        <>
            <DynamicTitle pageTitle="Commission Transaction" />
            <CommissionTransactionContent />
        </>
  )
}

export default Insurance
