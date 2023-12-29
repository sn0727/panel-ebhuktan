import React, { useEffect } from 'react'
import FinanceServicesTable from '../../../components/FinanceServicesTable/FinanceServicesTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import { useDispatch } from 'react-redux'
import DynamicTitle from '../../../components/dynamic_title'
import { setPageTitle } from '../../../features/common/headerSlice'

const DigitalMarketing = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Digital Marketing" }))
    }, [])
    return (
        <div>
            <DynamicTitle pageTitle={"Digital Marketing"} />
            <FinanceServicesTable
                getPageLimit={ApiUrl.getPageLimit}
                getFilterFinanceService={ApiUrl.dataGetDigitalMarketing}
                requestPageName={'DigitalMarketing'}
                pagetableName={'Digital Marketing'}
            />
        </div>
    )
}

export default DigitalMarketing