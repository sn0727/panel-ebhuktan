import DynamicTitle from '../components/dynamic_title'
import ResetPassword from '../features/user/ResetPassword'

function ExternalPage() {


    return (
        <div className="">
            <DynamicTitle pageTitle={"Reset Password"} />
            <ResetPassword />
        </div>
    )
}

export default ExternalPage