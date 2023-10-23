import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import DynamicTitle from '../../../components/dynamic_title'

const LandlineBillPaymentOperator = () => {

  console.log(ApiUrl.updateCommission)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Landline Operator" }))
  }, [])

  return (
    <div>
      <DynamicTitle pageTitle={"Landline Operator"} />
      <OperatorListTable pageTitlle={"Landline Operator"} getOperatorList={ApiUrl.LandlineGetOperatorList} getCommission={ApiUrl.LandlineUpdateCommission} getAddIcon={ApiUrl.LandlineAddIcon} filterOperatorList={ApiUrl.landlineSearchOp}/>
    </div>
  )
}

export default LandlineBillPaymentOperator
