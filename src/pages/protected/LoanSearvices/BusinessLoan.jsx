import React, { useEffect } from 'react'
import DynamicTitle from '../../../components/dynamic_title'
import LoanSearvicesTable from '../../../components/LoanSearvicesTable/LoanSearvicesTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'

const BusinessLoan = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Business Loan" }))
  }, [])
  return (
    <div>
      <DynamicTitle pageTitle={"Business Loan"} />
      <LoanSearvicesTable
        getPageLimit={ApiUrl.getPageLimit}
        getFilterLoanServices={ApiUrl.businessLoan}
        requestPageName={'BusinessLoan'}
        pagetableName={'Business Loan'}
      />
    </div>
  )
}

export default BusinessLoan