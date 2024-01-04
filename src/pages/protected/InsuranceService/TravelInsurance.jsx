import React, { useEffect } from 'react'
import DynamicTitle from '../../../components/dynamic_title'
import InsuranceServicesTable from '../../../components/InsuranceServicesTable/InsuranceServicesTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'

const TravelInsurance = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Travel Insurance" }))
  }, [])

  return (
    <div>
      <DynamicTitle pageTitle={"Travel Insurance"} />
      <InsuranceServicesTable
        getPageLimit={ApiUrl.getPageLimit}
        getFilterInsuranceServices={ApiUrl.travelInsurance}
        requestPageName={'TravelInsurance'}
        pagetableName={'Travel Insurance'}
      />
    </div>
  )
}

export default TravelInsurance