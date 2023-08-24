import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Cluster from '../../features/cluster'
import DynamicTitle from '../../components/dynamic_title'

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Cluster" }))
    }, [])


    return (

        <>
            <DynamicTitle pageTitle={"Cluster"} />
            <Cluster />
        </>
    )
}

export default InternalPage