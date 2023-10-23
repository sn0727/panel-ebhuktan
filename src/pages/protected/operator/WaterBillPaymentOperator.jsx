import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import DynamicTitle from '../../../components/dynamic_title'

const WaterBillPaymentOperator = () => {

  console.log(ApiUrl.updateCommission)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Water Operator" }))
    
  }, [])

  return (
    <div>
      <DynamicTitle pageTitle={"Water Operator"} />
      <OperatorListTable pageTitlle={"Water Operator"} getOperatorList={ApiUrl.waterGetOperaterList} getCommission={ApiUrl.waterBillPaymentUpdateCommission} getAddIcon={ApiUrl.electricityOperatorAddIcon} filterOperatorList={ApiUrl.waterSearchOp}/>
    </div>
  )
}

export default WaterBillPaymentOperator
