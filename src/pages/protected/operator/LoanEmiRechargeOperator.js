import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import DynamicTitle from '../../../components/dynamic_title'

const LoanEmiRechargeOperator = () => {

  console.log(ApiUrl.updateCommission)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Loan EMI Operator" }))
  }, [])

  return (
    <div>
      <DynamicTitle pageTitle={"Loan EMI Operator"} />
      <OperatorListTable pageTitlle={"Loan EMI Operator"} 
      getOperatorList={ApiUrl.LoanGetOperatorList} getCommission={ApiUrl.LoanUpdateCommission} getAddIcon={ApiUrl.LoanAddIcon} filterOperatorList={ApiUrl.loanEmiSearchOp} />
    </div>
  )
}

export default LoanEmiRechargeOperator
