import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import CustomizeCommissionTable from '../../features/CustomizeCommissionTable'
import { ApiUrl } from '../../utils/commanApiUrl'

const CustomizeCommission = () => {

  console.log(ApiUrl.updateCommission)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "Customize Commission" }))
  }, [])

  return (
    <div>
      <CustomizeCommissionTable pageTitlle={"Customize Commission"} GetConfigList={ApiUrl.superAdminGetConfigList} getAddIcon={ApiUrl.MobileRechargeAddIcon} />
    </div>
  )
}

export default CustomizeCommission
