import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import DynamicTitle from '../../../components/dynamic_title'

const DTHRechargeOperator = () => {

  console.log(ApiUrl.updateCommission)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "DTHRecharge Operator" }))
  }, [])

  return (
    <div>
      <DynamicTitle pageTitle={"DTHRecharge Operator"} />
      <OperatorListTable
        pageTitlle={"DTHRecharge Operator"}
        getOperatorList={ApiUrl.DthGetOperatorList}
        getCommission={ApiUrl.MobileRechargeAddIcon}
        getAddIcon={ApiUrl.MobileRechargeAddIcon}
        filterOperatorList={ApiUrl.dthRechargeSearchOp}
      />
    </div>
  )
}

export default DTHRechargeOperator
