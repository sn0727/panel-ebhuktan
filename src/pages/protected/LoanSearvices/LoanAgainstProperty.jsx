import React, { useEffect } from 'react'
import DynamicTitle from '../../../components/dynamic_title'
import LoanSearvicesTable from '../../../components/LoanSearvicesTable/LoanSearvicesTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'

const LoanAgainstProperty = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Loan Against Property" }))
  }, [])

  return (
    <div>
      <DynamicTitle pageTitle={"Loan Against Property"} />
      <LoanSearvicesTable
        getPageLimit={ApiUrl.getPageLimit}
        getFilterLoanServices={ApiUrl.propertyLoan}
        requestPageName={'LoanAgainstProperty'}
        pagetableName={'Loan Against Property'}
      />
    </div>
  )
}

export default LoanAgainstProperty