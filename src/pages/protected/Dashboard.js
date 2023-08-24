import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Dashboard from '../../features/dashboard/index'
import DynamicTitle from '../../components/dynamic_title'

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Dashboard" }))
    }, [])


    return (
        <>
            <DynamicTitle pageTitle={"Dashboard"} />
            <Dashboard />
        </>

    )
}

export default InternalPage