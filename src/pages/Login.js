import React from 'react'
import Login from '../features/user/Login'
import DynamicTitle from '../components/dynamic_title'

function ExternalPage() {

    return (
        <div className="">
            <DynamicTitle pageTitle={"Login"} />
            <Login />
        </div>
    )
}

export default ExternalPage