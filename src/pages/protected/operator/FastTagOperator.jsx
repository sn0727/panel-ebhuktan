import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../features/common/headerSlice'
import OperatorListTable from '../../../features/operatorListTable'
import { ApiUrl } from '../../../utils/commanApiUrl'
import DynamicTitle from '../../../components/dynamic_title'

const FastTagOperator = () => {

  console.log(ApiUrl.updateCommission)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Fast Tag Operator" }))
  }, [])

  return (
    <div>
      <DynamicTitle pageTitle={"Fast Tag Operator"} />
      <OperatorListTable
        pageTitlle={"Fast Tag Operator"} getOperatorList={ApiUrl.fastTagGetOperatorList} getCommission={ApiUrl.fastTagUpdateCommission} getAddIcon={ApiUrl.fastTagOperatorAddIcon} filterOperatorList={ApiUrl.fastTagSearchOp} />
    </div>
  )
}

export default FastTagOperator
