import React from "react"
import UserRoleTable from "../../components/UserRoleTable/UserRoleTable"
import { ApiUrl } from "../../utils/commanApiUrl"

function DistributorContent() {

    return (
        <>
            <UserRoleTable
                superadminDeleteUser={ApiUrl.superadminDeleteUser}
                getPageLimit={ApiUrl.getPageLimit}
                getFilterCluster={ApiUrl.getFilterDistributor}
                createRoleName={'distributor'}
                pagetableName={'District Partner'}
            />
        </>
    )
}


export default DistributorContent
