import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import DynamicTitle from '../../../components/dynamic_title'

const InsuranceEmiRechargeOperator = () => {

  console.log(ApiUrl.updateCommission)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Insurance EMI Operator" }))
  }, [])

  return (
    <div>
      <DynamicTitle pageTitle={"Insurance EMI Operator"} />
      <OperatorListTable pageTitlle={"Insurance EMI Operator"} 
      getOperatorList={ApiUrl.InsuranceGetOperatorList} 
      getCommission={ApiUrl.InsuranceUpdateCommission} 
      getAddIcon={ApiUrl.InsuranceAddIcon} 
      filterOperatorList={ApiUrl.insuranceSearchOp}/>
    </div>
  )
}

export default InsuranceEmiRechargeOperator
