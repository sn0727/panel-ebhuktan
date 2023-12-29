import React, { useEffect } from 'react'
import FinanceServicesTable from '../../../components/FinanceServicesTable/FinanceServicesTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import { useDispatch } from 'react-redux'
import DynamicTitle from '../../../components/dynamic_title'
import { setPageTitle } from '../../../features/common/headerSlice'

const Gst = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "GST" }))
    }, [])
    return (
        <div>
            <DynamicTitle pageTitle={"GST"} />
            <FinanceServicesTable
                getPageLimit={ApiUrl?.getPageLimit}
                getFilterFinanceService={ApiUrl?.companyDataGST}
                requestPageName={'GST'}
                pagetableName={'GST'}
            />
        </div>
    )
}

export default Gst