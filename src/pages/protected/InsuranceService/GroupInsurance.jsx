import React, { useEffect } from 'react'
import DynamicTitle from '../../../components/dynamic_title'
import { ApiUrl } from '../../../utils/commanApiUrl'
import InsuranceServicesTable from '../../../components/InsuranceServicesTable/InsuranceServicesTable'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'

const GroupInsurance = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle({ title: "Group Insurance" }))
    }, [])
    
    return (
        <div>
            <DynamicTitle pageTitle={"Group Insurance"} />
            <InsuranceServicesTable
                getPageLimit={ApiUrl.getPageLimit}
                getFilterInsuranceServices={ApiUrl.groupInsurance}
                requestPageName={'GroupInsurance'}
                pagetableName={'Group Insurance'}
            />
        </div>
    )
}

export default GroupInsurance