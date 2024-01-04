import React, { useEffect } from 'react'
import DynamicTitle from '../../../components/dynamic_title'
import InsuranceServicesTable from '../../../components/InsuranceServicesTable/InsuranceServicesTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'

const VehicleInsurance = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Vehicle Insurance" }))
  }, [])

  return (
    <div>
      <DynamicTitle pageTitle={"Vehicle Insurance"} />
      <InsuranceServicesTable
        getPageLimit={ApiUrl.getPageLimit}
        getFilterInsuranceServices={ApiUrl.vehicleInsurance}
        requestPageName={'vehicleInsurance'}
        pagetableName={'Vehicle Insurance'}
      />
    </div>
  )
}

export default VehicleInsurance