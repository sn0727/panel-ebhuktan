import React from 'react'
import DynamicTitle from '../../../components/dynamic_title'
import LoanSearvicesTable from '../../../components/LoanSearvicesTable/LoanSearvicesTable'
import { ApiUrl } from '../../../utils/commanApiUrl'

const LoanAgainstProperty = () => {
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