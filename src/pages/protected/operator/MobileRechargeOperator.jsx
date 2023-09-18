import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'
import { ApiUrl } from '../../../utils/commanApiUrl'

const MobileRecharge = () => {

  console.log(ApiUrl.updateCommission)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Mobile Bill" }))
  }, [])

  return (
    <div>
      <OperatorListTable pageTitlle={"Mobile Operator"} getOperatorList={ApiUrl.rechargeGetOperatorList} getCommission={ApiUrl.updateMobileRechargeCommission} />
    </div>
  )
}

export default MobileRecharge
