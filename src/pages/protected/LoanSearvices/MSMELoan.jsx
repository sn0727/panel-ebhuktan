import React from 'react'
import DynamicTitle from '../../../components/dynamic_title'
import LoanSearvicesTable from '../../../components/LoanSearvicesTable/LoanSearvicesTable'
import { ApiUrl } from '../../../utils/commanApiUrl'

const MSMELoan = () => {
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