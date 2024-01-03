import React from 'react'
import DynamicTitle from '../../../components/dynamic_title'
import LoanSearvicesTable from '../../../components/LoanSearvicesTable/LoanSearvicesTable'
import { ApiUrl } from '../../../utils/commanApiUrl'

const BusinessLoan = () => {
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