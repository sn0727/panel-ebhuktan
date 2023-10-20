import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import DynamicTitle from '../../components/dynamic_title'
import SubAdminTable from '../../features/subAdminTable'

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Sub Admin" }))
    }, [])


    return (

        <>
            <DynamicTitle pageTitle={"Sub Admin"} />
            <SubAdminTable />
        </>
    )
}

export default InternalPage