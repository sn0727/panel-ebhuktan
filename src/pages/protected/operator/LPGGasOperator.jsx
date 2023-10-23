import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import DynamicTitle from '../../../components/dynamic_title'

const LPGGasOperator = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "LPG Gas Operator" }))
  }, [])

  return (
    <div>
      <DynamicTitle pageTitle={"LPG Gas Operator"} />
      <OperatorListTable pageTitlle={"LPG Gas Operator"} 
      getOperatorList={ApiUrl.lpgGetBookingList} 
      getCommission={ApiUrl.lpgGasUpdateCommission} 
      getAddIcon={ApiUrl.lpgGasOperatorAddIcon}
      filterOperatorList={ApiUrl.bookinGasSearchOp} />
    </div>
  )
}

export default LPGGasOperator
