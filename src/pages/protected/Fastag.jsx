import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import FastagContent from '../../features/fastag';
import { setPageTitle } from '../../features/common/headerSlice'
import DynamicTitle from '../../components/dynamic_title';

const Fastag = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle({ title : "FASTag"}))
    }, [])
    
    return (
        <>
            <DynamicTitle pageTitle="FASTag" />
            <FastagContent />
        </>
  )
}

export default Fastag
