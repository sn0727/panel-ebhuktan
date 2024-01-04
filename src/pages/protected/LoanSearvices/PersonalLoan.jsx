import React, { useEffect } from 'react'
import DynamicTitle from '../../../components/dynamic_title'
import LoanSearvicesTable from '../../../components/LoanSearvicesTable/LoanSearvicesTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'

const PersonalLoan = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Personal Loan" }))
  }, [])
  
  return (
    <div>
      <DynamicTitle pageTitle={"Personal Loan"} />
      <LoanSearvicesTable
        getPageLimit={ApiUrl.getPageLimit}
        getFilterLoanServices={ApiUrl.personalLoan}
        requestPageName={'PersonalLoan'}
        pagetableName={'Personal Loan'}
      />
    </div>
  )
}

export default PersonalLoan