import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import DynamicTitle from '../../../components/dynamic_title'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'
import { ApiUrl } from '../../../utils/commanApiUrl'

const Electricity = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Electricity Operator" }))
  }, [])

  return (
    <>
      <DynamicTitle pageTitle={"Electricity Operator"} />
      <OperatorListTable
        pageTitlle={"Electricity Operator"}
        getOperatorList={ApiUrl.electricityGetOperatorList}
        getCommission={ApiUrl.electricityUpdateCommission}
        getAddIcon={ApiUrl.electricityOperatorAddIcon}
        filterOperatorList={ApiUrl.electricitybillPaymentSearchOp}
      />
    </>
  )
}

export default Electricity
