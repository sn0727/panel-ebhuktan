import React from 'react'
import DynamicTitle from '../../../components/dynamic_title'
import LoanSearvicesTable from '../../../components/LoanSearvicesTable/LoanSearvicesTable'
import { ApiUrl } from '../../../utils/commanApiUrl'

const PersonalLoan = () => {
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