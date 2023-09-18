import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'
import { ApiUrl } from '../../../utils/commanApiUrl'

const LPGGasOperator = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "LPG Gas Operator" }))
  }, [])

  return (
    <div>
      <OperatorListTable pageTitlle={"LPG Gas Operator"} getOperatorList={ApiUrl.lpgGasGetOperatorList} getCommission={ApiUrl.lpgGasUpdateCommission} />
    </div>
  )
}

export default LPGGasOperator
