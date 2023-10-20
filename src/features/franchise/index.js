import React from "react";
import UserRoleTable from "../../components/UserRoleTable/UserRoleTable"
import { ApiUrl } from "../../utils/commanApiUrl"

function FranchiseContent() {

    return (
        <UserRoleTable
            superadminDeleteUser={ApiUrl.superadminDeleteUser}
            getPageLimit={ApiUrl.getPageLimit}
            getFilterCluster={ApiUrl.getFilterFranchise}
            createRoleName={'franchise'}
            pagetableName={'Franchise'}
        />
    )
}


export default FranchiseContent
