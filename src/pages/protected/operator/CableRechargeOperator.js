import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import DynamicTitle from '../../../components/dynamic_title'

const CableRechargeOperator = () => {

  console.log(ApiUrl.updateCommission)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Cable Tv Operator" }))
  }, [])

  return (
    <div>
      <DynamicTitle pageTitle={"Cable Tv Operator"} />
      <OperatorListTable pageTitlle={"Cable Tv Operator"} getOperatorList={ApiUrl.CableGetOperatorList} getCommission={ApiUrl.CableUpdateCommission} getAddIcon={ApiUrl.CableAddIcon} filterOperatorList={ApiUrl.dthRechargeCableSearchOp} />
    </div>
  )
}

export default CableRechargeOperator
