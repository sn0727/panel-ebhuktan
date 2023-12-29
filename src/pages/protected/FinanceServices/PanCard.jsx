import React, { useEffect } from 'react'
import FinanceServicesTable from '../../../components/FinanceServicesTable/FinanceServicesTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import { useDispatch } from 'react-redux'
import DynamicTitle from '../../../components/dynamic_title'
import { setPageTitle } from '../../../features/common/headerSlice'

const PanCard = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Pan Card" }))
    }, [])
    return (
        <div>
            <DynamicTitle pageTitle={"Pan Card"} />
            <FinanceServicesTable
                superadminDeleteUser={ApiUrl.superadminDeleteUser}
                getPageLimit={ApiUrl.getPageLimit}
                getFilterCluster={ApiUrl.getFilterCluster}
                pagetableName={'Pan Card'}
            />
        </div>
    )
}

export default PanCard