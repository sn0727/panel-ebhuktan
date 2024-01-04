import React, { useEffect } from 'react'
import DynamicTitle from '../../../components/dynamic_title'
import InsuranceServicesTable from '../../../components/InsuranceServicesTable/InsuranceServicesTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'

const HealthInsurance = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Health Insurance" }))
  }, [])

  return (
    <div>
      <DynamicTitle pageTitle={"Health Insurance"} />
      <InsuranceServicesTable
        getPageLimit={ApiUrl.getPageLimit}
        getFilterInsuranceServices={ApiUrl.healthInsurance}
        requestPageName={'HealthInsurance'}
        pagetableName={'Health Insurance'}
      />
    </div>
  )
}

export default HealthInsurance