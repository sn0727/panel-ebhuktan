import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import DynamicTitle from '../../../components/dynamic_title'

const PostpaidMobileRechargeOperator = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Postpaid Mobile Operator" }))
  }, [])

  return (
    <div>
      <DynamicTitle pageTitle={"Postpaid Mobile Operator"} />
      <OperatorListTable pageTitlle={"Postpaid Mobile Operator"} getOperatorList={ApiUrl.rechargePostpaidGetOperatorList} getCommission={ApiUrl.updatePostpaidMobileRechargeCommission} getAddIcon={ApiUrl.PostpaidMobileRechargeAddIcon} filterOperatorList={ApiUrl.postpaidRechargeSearchOp} />
    </div>
  )
}

export default PostpaidMobileRechargeOperator
