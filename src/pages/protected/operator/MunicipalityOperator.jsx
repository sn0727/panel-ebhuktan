import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import DynamicTitle from '../../../components/dynamic_title'

const MunicipalityOperator = () => {

  console.log(ApiUrl.updateCommission)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Municipality Operator" }))
  }, [])

  return (
    <div>
      <DynamicTitle pageTitle={"Municipality Operator"} />
      <OperatorListTable pageTitlle={"Municipality Operator"} getOperatorList={ApiUrl.municipalityGetOperatorList} getCommission={ApiUrl.municipalityUpdateCommission} getAddIcon={ApiUrl.municipalityOperatorAddIcon} filterOperatorList={ApiUrl.municipalitySearchOp} />
    </div>
  )
}

export default MunicipalityOperator
