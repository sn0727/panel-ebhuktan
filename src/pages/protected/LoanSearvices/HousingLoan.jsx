import React, { useEffect } from 'react'
import DynamicTitle from '../../../components/dynamic_title'
import LoanSearvicesTable from '../../../components/LoanSearvicesTable/LoanSearvicesTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'

const HousingLoan = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Housing Loan" }))
  }, [])

  return (
    <div>
      <DynamicTitle pageTitle={"Housing Loan"} />
      <LoanSearvicesTable
        getPageLimit={ApiUrl.getPageLimit}
        getFilterLoanServices={ApiUrl.housingLoan}
        requestPageName={'HousingLoan'}
        pagetableName={'Housing Loan'}
      />
    </div>
  )
}

export default HousingLoan