import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'
import { ApiUrl } from '../../../utils/commanApiUrl'

const InsuranceEmiRechargeOperator = () => {

  console.log(ApiUrl.updateCommission)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Insurance EMI Operator" }))
  }, [])

  return (
    <div>
      <OperatorListTable pageTitlle={"Insurance EMI Operator"} getOperatorList={ApiUrl.InsuranceGetOperatorList} getCommission={ApiUrl.InsuranceUpdateCommission} getAddIcon={ApiUrl.InsuranceAddIcon} />
    </div>
  )
}

export default InsuranceEmiRechargeOperator
