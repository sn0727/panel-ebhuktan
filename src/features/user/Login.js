import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText';
import { APIRequest, ApiUrl } from '../../utils/commanApiUrl';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function Login() {
    const navigation = useNavigate();
    const [isLoading, setisLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [showPass, setShowPass] = useState('password')
    const [loginObj, setLoginObj] = useState({
        email: "",
        password: "",
    })

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLoginObj({ ...loginObj, [updateType]: value })
    }

    const Authuser = () => {
        setisLoading(true)
        let config = {
            url: ApiUrl.login,
            method: 'post',
            body: {
                data: loginObj.email,
                password: loginObj.password
            }
        }
        APIRequest(
            config,
            res => {
                if (!res?.error) {
                    toast.success(res?.message)
                    sessionStorage.setItem("token", res?.token)
                    setisLoading(false)
                    // navigation('/app/dashboard')
                    window.location.href = '/app/dashboard'
                }else {
                    toast.error(res?.message)
                    setisLoading(false)
                }

            },
            err => {
                console.log(err, "err ==============")
                toast.error(err?.message)
                setisLoading(false)
            }
        )
    }

    const submitForm = (e) => {
        e.preventDefault()
        setErrorMessage("")

        if (loginObj.email.trim() === "") return setErrorMessage("Email Id is required! (use any value)")
        if (loginObj.password.trim() === "") return setErrorMessage("Password is required! (use any value)")
        else {
            Authuser()
        }
    }

    const showPassword = () => {
        showPass === "password" ? setShowPass("text") : setShowPass("password")
    }
    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro />
                    </div>
                    <div className='py-10 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                        <form onSubmit={(e) => submitForm(e)}>
                            <div className="mb-2">
                                <InputText type="email" defaultValue={loginObj.email} updateType="email" containerStyle="mt-4" placeholder={'Email id'} labelTitle="Email Id" updateFormValue={updateFormValue} />
                                <div className='relative'>
                                    <InputText defaultValue={loginObj.password} type={showPass} updateType="password" placeholder={'Password'} containerStyle="mt-2" labelTitle="Password" updateFormValue={updateFormValue} />
                                    {showPass === "password" ? <AiOutlineEye onClick={showPassword} className='eye-icon' /> : <AiOutlineEyeInvisible onClick={showPassword} className='eye-icon' />}
                                </div>
                            </div>

                            <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
                            </div>
                            {errorMessage ? <ErrorText styleClass="mt-1">{errorMessage}</ErrorText> : null}
                            <button type="submit" isLoading={isLoading ? 'isLoading' : ''} loadingText='Loading' className={"btn mt-2 w-full btn-primary" + (isLoading ? " loading" : "")}>Login</button>
                            {/* <button type="submit" className={"btn mt-2 w-full btn-primary"}>Login</button> */}
                            <div className='text-center mt-4'>Don't have an account yet? <Link to="/registration"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login