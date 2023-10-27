import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import ClientUserContent from "./../../features/client-user"
import { setPageTitle } from '../../features/common/headerSlice'
import DynamicTitle from '../../components/dynamic_title';

const ClientUser = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle({ title : "Users"}))
      }, [])

  return (
    <>
    <DynamicTitle pageTitle={"Users"} />
        <ClientUserContent />
    </>
  )
}

export default ClientUser
