import React, { useEffect } from 'react'
import DynamicTitle from '../../../components/dynamic_title'
import LoanSearvicesTable from '../../../components/LoanSearvicesTable/LoanSearvicesTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'

const MSMELoan = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "MSME Loan" }))
  }, [])
  return (
    <div>
      <DynamicTitle pageTitle={"MSME Loan"} />
      <LoanSearvicesTable
        getPageLimit={ApiUrl.getPageLimit}
        getFilterLoanServices={ApiUrl.MSMELoan}
        requestPageName={'msme-loan'}
        pagetableName={'MSME Loan'}
      />
    </div>
  )
}

export default MSMELoan