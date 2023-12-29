import React, { useEffect } from 'react'
import FinanceServicesTable from '../../../components/FinanceServicesTable/FinanceServicesTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import { useDispatch } from 'react-redux'
import DynamicTitle from '../../../components/dynamic_title'
import { setPageTitle } from '../../../features/common/headerSlice'

const DesignDevelopment = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Design & Development" }))
    }, [])
    return (
        <div>
            <DynamicTitle pageTitle={"Design & Development"} />
            <FinanceServicesTable
                getPageLimit={ApiUrl.getPageLimit}
                getFilterFinanceService={ApiUrl.dataGetWebsiteQuery}
                requestPageName={'DesignDevelopment'}
                pagetableName={'Design & Development'}
            />
        </div>
    )
}

export default DesignDevelopment