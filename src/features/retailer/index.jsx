import React from "react"
import UserRoleTable from "../../components/UserRoleTable/UserRoleTable"
import { ApiUrl } from "../../utils/commanApiUrl"

function RetailerContent() {

    return (
        <UserRoleTable
            superadminDeleteUser={ApiUrl.superadminDeleteUser}
            getPageLimit={ApiUrl.getPageLimit}
            getFilterCluster={ApiUrl.getFilterRetailer}
            createRoleName={'retailer'}
            pagetableName={'Retailer'}
        />
    )
}


export default RetailerContent
