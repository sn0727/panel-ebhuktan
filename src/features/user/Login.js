import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText';
import { ApiUrl } from '../../utils/commanApiUrl';

function Login() {

    const naviagte = useNavigate();

    const INITIAL_LOGIN_OBJ = {
        email: "",
        password: "",
    }

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)

    let email = loginObj.email;
    let password = loginObj.password

    const Authuser = async () => {
        let result = await fetch(ApiUrl.login, {
            method: "post",
            body: JSON.stringify({ data: email, password }),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        
        let response = await result.json();
        if (!response.error) {
            setLoading(true)
            setTimeout(() => {
                alert(response.message)
                // // Call API to check user credentials and save token in localstorage
                localStorage.setItem("token", response.token)
                setLoading(false)
                naviagte('/app/dashboard')
            }, [500])

        } else {
            alert(response.message)

        }
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

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLoginObj({ ...loginObj, [updateType]: value })
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro />
                    </div>
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                        <form onSubmit={(e) => submitForm(e)}>

                            <div className="mb-4">

                                <InputText type="email" defaultValue={loginObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue} />

                                <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />

                            </div>

                            <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
                            </div>

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button>

                            <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login