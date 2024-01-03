import React from 'react'
import DynamicTitle from '../../../components/dynamic_title'
import LoanSearvicesTable from '../../../components/LoanSearvicesTable/LoanSearvicesTable'
import { ApiUrl } from '../../../utils/commanApiUrl'

const HousingLoan = () => {
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