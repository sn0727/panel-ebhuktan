import DynamicTitle from '../components/dynamic_title'
import ForgotPassword from '../features/user/ForgotPassword'

function ExternalPage() {


    return (
        <div className="">
            <DynamicTitle pageTitle={"Forgot Password"} />
            <ForgotPassword />
        </div>
    )
}

export default ExternalPage