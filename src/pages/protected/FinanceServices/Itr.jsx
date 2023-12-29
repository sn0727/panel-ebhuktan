import React, { useEffect } from 'react'
import FinanceServicesTable from '../../../components/FinanceServicesTable/FinanceServicesTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import { useDispatch } from 'react-redux'
import DynamicTitle from '../../../components/dynamic_title'
import { setPageTitle } from '../../../features/common/headerSlice'

const Itr = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "ITR" }))
    }, [])
    return (
        <div>
            <DynamicTitle pageTitle={"ITR"} />
            <FinanceServicesTable
                superadminDeleteUser={ApiUrl.superadminDeleteUser}
                getPageLimit={ApiUrl.getPageLimit}
                getFilterFinanceService={ApiUrl.dataGetITR}
                requestPageName={'ITR'}
                pagetableName={'ITR'}
            />
        </div>
    )
}

export default Itr