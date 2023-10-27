import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import RiseRequest from '../../features/RiseRequest'
import DynamicTitle from '../../components/dynamic_title'
import { ApiUrl } from '../../utils/commanApiUrl'

function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Rise Request" }))
    }, [])


    return (

        <>
            <DynamicTitle pageTitle={"Rise Request"} />
            <RiseRequest
                riseRequestDelete={ApiUrl.riseRequestDelete}
                getPageLimit={ApiUrl.getPageLimit}
                getFilterCluster={ApiUrl.riseRequestGetAll}
            />
        </>
    )
}

export default InternalPage