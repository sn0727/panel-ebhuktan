import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from  '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import CheckCircleIcon  from '@heroicons/react/24/solid/CheckCircleIcon';
import { APIRequest, ApiUrl } from '../../utils/commanApiUrl';
import { toast } from 'react-toastify'

function ForgotPassword(){
    const navigation = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [linkSent, setLinkSent] = useState(false)
    const [userObj, setUserObj] = useState({
        email : ""
    })

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setUserObj({...userObj, [updateType] : value})
    }

    const Authuser = async () => {
        setLoading(true)
        let config = {
            url : ApiUrl.forgotPassword,
            method : 'post',
            body : {
                email : userObj.email
            }
        }
        APIRequest(
            config,
            res => {
                console.log(res)
                toast.success(res?.message)
                setLoading(false)
                setLinkSent(true)
            },
            err => {
                console.log(err)
                toast.error(err?.message)
                setLoading(false)
            }
        )
    }

    const submitForm = (e) =>{
        e.preventDefault()
        setErrorMessage("")

        if(userObj.email.trim() === "")return setErrorMessage("Email Id is required! (use any value)")
        else{
            Authuser()
        } 
    }

    return(
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                <div className=''>
                        <LandingIntro />
                </div>
                <div className='py-24 px-10'>
                    <h2 className='text-2xl font-semibold mb-2 text-center'>Forgot Password</h2>

                    {
                        linkSent && 
                        <>
                            <div className='text-center mt-8'><CheckCircleIcon className='inline-block w-32 text-success'/></div>
                            <p className='my-4 text-xl font-bold text-center'>Verification code send successfully</p>
                            <p className='mt-4 mb-8 font-semibold text-center'>Check your email to  reset password</p>
                            <div className='text-center mt-4'><Link to="/reset-password" className='text-white-sdfdskbj'><button className="btn btn-block btn-primary">Reset Password</button></Link></div>

                        </>
                    }

                    {
                        !linkSent && 
                        <>
                            <p className='my-8 font-semibold text-center'>Verification code will be sent on your email id</p>
                            <form onSubmit={(e) => submitForm(e)}>

                                <div className="mb-4">
                                    <InputText type="email" defaultValue={userObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue}/>
                                </div>

                                <ErrorText styleClass="mt-12">{errorMessage}</ErrorText>
                                <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Send verification code </button>

                            </form>
                        </>
                    }
                    
                </div>
            </div>
            </div>
        </div>
    )
}

export default ForgotPassword  


// forgate page