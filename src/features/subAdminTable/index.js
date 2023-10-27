import React from "react"
import UserRoleTable from "../../components/UserRoleTable/UserRoleTable"
import { ApiUrl } from "../../utils/commanApiUrl"
import DynamicTitle from "../../components/dynamic_title";
// select box code 

function SubAdminTable() {

    return (
        <>
            <DynamicTitle pageTitle={"Sub Admin"} />
            <UserRoleTable
                superadminDeleteUser={ApiUrl.superadminDeleteUser}
                getPageLimit={ApiUrl.getPageLimit}
                getFilterCluster={ApiUrl.getSubAdmin}
                createRoleName={'subAdmin'}
                pagetableName={'Sub Admin'}
            />
        </>
    )
}


export default SubAdminTable