import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'
import { ApiUrl } from '../../../utils/commanApiUrl'

const BroadbandBillPaymentOperator = () => {

  console.log(ApiUrl.updateCommission)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Broadband  Bill-Payment Operator" }))
  }, [])

  return (
    <div>
      <OperatorListTable pageTitlle={"Broadband  Bill-Payment Operator"} getOperatorList={ApiUrl.broadbandGetOperatorList} getCommission={ApiUrl.broadbandBillPaymentUpdateCommission} getAddIcon={ApiUrl.electricityOperatorAddIcon} filterOperatorList={ApiUrl.broadbandbillPaymentSearchOp} />
    </div>
  )
}

export default BroadbandBillPaymentOperator
