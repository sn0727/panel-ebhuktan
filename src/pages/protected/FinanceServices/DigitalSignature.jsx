import React, { useEffect } from 'react'
import FinanceServicesTable from '../../../components/FinanceServicesTable/FinanceServicesTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import { useDispatch } from 'react-redux'
import DynamicTitle from '../../../components/dynamic_title'
import { setPageTitle } from '../../../features/common/headerSlice'

const DigitalSignature = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Digital Signature" }))
    }, [])
    return (
        <div>
            <DynamicTitle pageTitle={"Digital Signature"} />
            <FinanceServicesTable
                superadminDeleteUser={ApiUrl.superadminDeleteUser}
                getPageLimit={ApiUrl.getPageLimit}
                getFilterFinanceService={ApiUrl.dataGetDigitalSignature}
                requestPageName={'DigitalSignature'}
                pagetableName={'Digital Signature'}
            />
        </div>
    )
}

export default DigitalSignature