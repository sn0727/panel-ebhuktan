import React, { useEffect } from 'react'
import DynamicTitle from '../../../components/dynamic_title'
import InsuranceServicesTable from '../../../components/InsuranceServicesTable/InsuranceServicesTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'

const LifeInsurance = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Life Insurance" }))
  }, [])

  return (
    <div>
      <DynamicTitle pageTitle={"Life Insurance"} />
      <InsuranceServicesTable
        getPageLimit={ApiUrl.getPageLimit}
        getFilterInsuranceServices={ApiUrl.lifeInsurance}
        requestPageName={'LifeInsurance'}
        pagetableName={'Life Insurance'}
      />
    </div>
  )
}

export default LifeInsurance