import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import DynamicTitle from '../../../components/dynamic_title'

const MobileRechargeOperator = () => {

  console.log(ApiUrl.updateCommission)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Prepaid Mobile Operator" }))
  }, [])

  return (
    <div>
      <DynamicTitle pageTitle={"Prepaid Mobile Operator"} />
      <OperatorListTable
        pageTitlle={"Prepaid Mobile Operator"}
        getOperatorList={ApiUrl.rechargeGetOperatorList}
        getCommission={ApiUrl.updateMobileRechargeCommission}
        getAddIcon={ApiUrl.MobileRechargeAddIcon}
        filterOperatorList={ApiUrl.prepaidRechargeSearchOp}
      />
    </div>
  )
}

export default MobileRechargeOperator
