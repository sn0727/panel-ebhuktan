import React from "react"
import UserRoleTable from "../../components/UserRoleTable/UserRoleTable"
import { ApiUrl } from "../../utils/commanApiUrl"
// select box code 

function Cluster() {

    return (
        <>

            <UserRoleTable
                superadminDeleteUser={ApiUrl.superadminDeleteUser}
                getPageLimit={ApiUrl.getPageLimit}
                getFilterCluster={ApiUrl.getFilterCluster}
                createRoleName={'cluster'}
                pagetableName={'Cluster'}
            />
        </>
    )
}


export default Cluster