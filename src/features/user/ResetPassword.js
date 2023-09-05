import {useState} from 'react'
import {Link} from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from  '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import CheckCircleIcon  from '@heroicons/react/24/solid/CheckCircleIcon';
import { ApiUrl } from '../../utils/commanApiUrl';
import { toast } from 'react-toastify'

function ForgotPassword(){

    const INITIAL_USER_OBJ = {
        email : "",
        OTP : "",
        password : ""
    }

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [linkSent, setLinkSent] = useState(false)
    const [userObj, setUserObj] = useState(INITIAL_USER_OBJ)

    let email = userObj.email;
    let OTP = userObj.OTP;
    let password = userObj.password;

    console.log(email + OTP + password)

    const Authuser = async () => {
        let result = await fetch(ApiUrl.resetPassword, {
            method: "post",
            body: JSON.stringify({email, OTP, password}),
            headers: {
                'Content-Type' : 'application/json'
            }
            
        })

        let response = await result.json();
        if(!response.error) {
            setLoading(true)
            setTimeout(()=>{
                toast.success(response.message)
                setLoading(false)
            }, [1000])
            setLinkSent(true)
            
        }else{
            toast.error(response.message)
        }
    }

    const submitForm = (e) =>{
        e.preventDefault()
        setErrorMessage("")

        if(userObj.email.trim() === "")return setErrorMessage("Email Id is required! (use any value)")
        else{
            Authuser()
            // setLoading(true)
            // // Call API to send password reset link
            // setLoading(false)
            // setLinkSent(true)
        }
    }

    const updateFormValue = ({updateType, value}) => {
        setErrorMessage("")
        setUserObj({...userObj, [updateType] : value})
    }

    return(
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                <div className=''>
                        <LandingIntro />
                </div>
                <div className='py-24 px-10'>
                    <h2 className='text-2xl font-semibold mb-2 text-center'>Reset Password</h2>

                    {
                        linkSent && 
                        <>
                            <div className='text-center mt-8'><CheckCircleIcon className='inline-block w-32 text-success'/></div>
                            <p className='my-4 text-xl font-bold text-center'>You Password Successfully Reset</p>
                            <p className='mt-4 mb-8 font-semibold text-center'>You can click login button</p>
                            <div className='text-center mt-4'><Link to="/login"><button className="btn btn-block btn-primary ">Login</button></Link></div>

                        </>
                    }

                    {
                        !linkSent && 
                        <>
                            <p className='my-8 font-semibold text-center'>We will send password reset link on your email Id</p>
                            <form onSubmit={(e) => submitForm(e)}>

                                <div className="mb-4">

                                    <InputText type="email" defaultValue={userObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email" updateFormValue={updateFormValue}/>
                                    <InputText type="number" defaultValue={userObj.OTP} updateType="OTP" containerStyle="mt-4" labelTitle="OTP" updateFormValue={updateFormValue}/>
                                    <InputText type="password" defaultValue={userObj.password} updateType="password" containerStyle="mt-4" labelTitle="Change Password" updateFormValue={updateFormValue}/>


                                </div>

                                <ErrorText styleClass="mt-12">{errorMessage}</ErrorText>
                                <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Reset Password</button>

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

// reset password