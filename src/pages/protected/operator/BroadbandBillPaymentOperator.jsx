import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import DynamicTitle from '../../../components/dynamic_title'

const BroadbandBillPaymentOperator = () => {

  console.log(ApiUrl.updateCommission)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Broadband Operator" }))
  }, [])

  return (
    <div>
      <DynamicTitle pageTitle={"Broadband Operator"} />
      <OperatorListTable pageTitlle={"Broadband Operator"} getOperatorList={ApiUrl.broadbandGetOperatorList} getCommission={ApiUrl.broadbandBillPaymentUpdateCommission} getAddIcon={ApiUrl.electricityOperatorAddIcon} filterOperatorList={ApiUrl.broadbandbillPaymentSearchOp} />
    </div>
  )
}

export default BroadbandBillPaymentOperator
