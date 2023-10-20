import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'
import { ApiUrl } from '../../../utils/commanApiUrl'

const GasOperator = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Gas Operator" }))
  }, [])

  return (
    <div>
      <OperatorListTable pageTitlle={"Gas Operator"} getOperatorList={ApiUrl.lpgGasGetOperatorList} getCommission={ApiUrl.lpgGasUpdateCommission} getAddIcon={ApiUrl.lpgGasOperatorAddIcon} filterOperatorList={ApiUrl.gasSearchOp} />
    </div>
  )
}

export default GasOperator
