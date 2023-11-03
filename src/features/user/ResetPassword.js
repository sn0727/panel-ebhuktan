import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon';
import { APIRequest, ApiUrl } from '../../utils/commanApiUrl';
import { toast } from 'react-toastify'
import { emailValidation, passwordValidation } from '../../components/Validation'

function ForgotPassword() {

    const [loading, setLoading] = useState(false)
    const [linkSent, setLinkSent] = useState(false)
    const [userObj, setUserObj] = useState({
        email: "",
        OTP: "",
        password: ""
    })


    const updateFormValue = ({ updateType, value }) => {
        setUserObj({ ...userObj, [updateType]: value })
    }

    const Authuser = async () => {
        if (emailValidation(userObj?.email)
            && passwordValidation(userObj?.password)
        ) {
            setLoading(true)
            let config = {
                url: ApiUrl.resetPassword,
                method: 'post',
                body: {
                    email: userObj.email,
                    OTP: userObj.OTP,
                    password: userObj.password
                }
            }
            APIRequest(
                config,
                res => {
                    if (!res?.error) {
                        toast.success(res?.message)
                        setLoading(false)
                        setLinkSent(true)
                    } else {
                        toast.error(res?.message)
                        setLoading(false)
                    }

                },
                err => {
                    toast.error(err?.message)
                    setLoading(false)
                }
            )
        }
    }

    const submitForm = (e) => {
        e.preventDefault()
        Authuser()
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro />
                    </div>
                    <div className='py-10 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Reset Password</h2>

                        {
                            linkSent &&
                            <>
                                <div className='text-center mt-8'><CheckCircleIcon className='inline-block w-32 text-success' /></div>
                                <p className='my-4 text-xl font-bold text-center'>You Password Successfully Reset</p>
                                <p className='mt-4 mb-8 font-semibold text-center'>You can click login button</p>
                                <div className='text-center mt-4'><Link to="/login" className='text-white-sdfdskbj'><button className="btn btn-block btn-primary ">Login</button></Link></div>

                            </>
                        }

                        {
                            !linkSent &&
                            <>
                                {/* <p className='my-8 font-semibold text-center'>We will send password reset link on your email Id</p> */}
                                <form onSubmit={(e) => submitForm(e)}>

                                    <div className="mb-4">

                                        <InputText type="email" defaultValue={userObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email *" updateFormValue={updateFormValue} />
                                        <InputText type="number" defaultValue={userObj.OTP} updateType="OTP" containerStyle="mt-4" labelTitle="OTP *" updateFormValue={updateFormValue} />
                                        <InputText type="password" defaultValue={userObj.password} updateType="password" containerStyle="mt-4" labelTitle="Change Password *" updateFormValue={updateFormValue} />


                                    </div>
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