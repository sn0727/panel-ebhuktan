import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'
import { ApiUrl } from '../../../utils/commanApiUrl'

const MunicipalityOperator = () => {

  console.log(ApiUrl.updateCommission)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Municipality" }))
  }, [])

  return (
    <div>
      <OperatorListTable pageTitlle={"Municipality Operator"} getOperatorList={ApiUrl.municipalityGetOperatorList} getCommission={ApiUrl.municipalityUpdateCommission} getAddIcon={ApiUrl.municipalityOperatorAddIcon} />
    </div>
  )
}

export default MunicipalityOperator
