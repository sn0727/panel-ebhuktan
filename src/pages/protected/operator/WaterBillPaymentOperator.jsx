import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'
import { ApiUrl } from '../../../utils/commanApiUrl'

const WaterBillPaymentOperator = () => {

  console.log(ApiUrl.updateCommission)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Water Bill-Payment Operator" }))
    
  }, [])

  return (
    <div>
      <OperatorListTable pageTitlle={"Water Bill-Payment Operator"} getOperatorList={ApiUrl.waterGetOperaterList} getCommission={ApiUrl.waterBillPaymentUpdateCommission} getAddIcon={ApiUrl.electricityOperatorAddIcon} filterOperatorList={ApiUrl.waterSearchOp}/>
    </div>
  )
}

export default WaterBillPaymentOperator
