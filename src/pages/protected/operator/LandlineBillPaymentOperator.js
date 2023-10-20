import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'
import { ApiUrl } from '../../../utils/commanApiUrl'

const LandlineBillPaymentOperator = () => {

  console.log(ApiUrl.updateCommission)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Landline Bill-Payment Operator" }))
  }, [])

  return (
    <div>
      <OperatorListTable pageTitlle={"Landline Bill-Payment Operator"} getOperatorList={ApiUrl.LandlineGetOperatorList} getCommission={ApiUrl.LandlineUpdateCommission} getAddIcon={ApiUrl.LandlineAddIcon} filterOperatorList={ApiUrl.landlineSearchOp}/>
    </div>
  )
}

export default LandlineBillPaymentOperator
