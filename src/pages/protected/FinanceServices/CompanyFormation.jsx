import React, { useEffect } from 'react'
import FinanceServicesTable from '../../../components/FinanceServicesTable/FinanceServicesTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import { useDispatch } from 'react-redux'
import DynamicTitle from '../../../components/dynamic_title'
import { setPageTitle } from '../../../features/common/headerSlice'

const CompanyFormation = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Company Formation" }))
    }, [])
    return (
        <div>
            <DynamicTitle pageTitle={"Company Formation"} />
            <FinanceServicesTable
                getPageLimit={ApiUrl.getPageLimit}
                getFilterFinanceService={ApiUrl.companyDataGet}
                requestPageName={'CompanyFormation'}
                pagetableName={'Company Formation'}
            />
        </div>
    )
}

export default CompanyFormation