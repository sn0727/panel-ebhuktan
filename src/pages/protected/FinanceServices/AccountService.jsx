import React, { useEffect } from 'react'
import FinanceServicesTable from '../../../components/FinanceServicesTable/FinanceServicesTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import { useDispatch } from 'react-redux'
import DynamicTitle from '../../../components/dynamic_title'
import { setPageTitle } from '../../../features/common/headerSlice'

const AccountService = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Accounting Services" }))
    }, [])
    return (
        <div>
            <DynamicTitle pageTitle={"Accounting Services"} />
            <FinanceServicesTable
                superadminDeleteUser={ApiUrl.superadminDeleteUser}
                getPageLimit={ApiUrl.getPageLimit}
                getFilterFinanceService={ApiUrl.dataGetAccountingService}
                requestPageName={'AccountingServices'}
                pagetableName={'Accounting Services'}
            />
        </div>
    )
}

export default AccountService