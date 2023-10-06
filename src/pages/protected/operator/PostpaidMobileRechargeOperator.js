import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'
import { ApiUrl } from '../../../utils/commanApiUrl'

const PostpaidMobileRechargeOperator = () => {

  console.log(ApiUrl.updateCommission)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Postpaid Mobile Bill" }))
  }, [])

  return (
    <div>
      <OperatorListTable pageTitlle={"Postpaid Mobile Operator"} getOperatorList={ApiUrl.rechargePostpaidGetOperatorList} getCommission={ApiUrl.updatePostpaidMobileRechargeCommission} getAddIcon={ApiUrl.PostpaidMobileRechargeAddIcon} />
    </div>
  )
}

export default PostpaidMobileRechargeOperator
