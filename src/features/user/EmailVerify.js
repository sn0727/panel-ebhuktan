import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText';
import { APIRequest, ApiUrl } from '../../utils/commanApiUrl';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Button, Stack } from '@chakra-ui/react';
import { emailValidation, mobileNoValidation } from '../../components/Validation';

function EmailVerify({ sendId, getingEmailId }) {
    const navigation = useNavigate();
    const [isLoading, setisLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [showPass, setShowPass] = useState('password')
    const [hiddeOtpFeild, setHiddeOtpFeild] = useState(false)
    const [loginObj, setLoginObj] = useState({
        emailId: "",
    })

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLoginObj({ ...loginObj, [updateType]: value })
    }

    const emailIdVerify = () => {
        if (emailValidation(loginObj?.emailId)) {
            setisLoading(true)
            let config = {
                url: ApiUrl?.checkEmail,
                method: 'post',
                body: {
                    email: loginObj?.emailId,
                }
            }
            APIRequest(
                config,
                res => {
                    if (!res?.error) {
                        toast.success(res?.message)
                        sendId(3)
                        setisLoading(false)
                        // navigation('/app/dashboard')
                    } else {
                        toast.error(res?.message)
                    }

                },
                err => {
                    console.log(err, "err ==============")
                    toast.error(err?.message)
                    setisLoading(false)
                }
            )
        }
    }

    // save mobile no.
    getingEmailId(loginObj?.emailId)

    const showPassword = () => {
        showPass === "password" ? setShowPass("text") : setShowPass("password")
    }

    return (
        <div className="flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl mt-5" >
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro />
                    </div>
                    <div className='py-10 px-10' style={{ height: '400px' }}>
                        {/* <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2> */}
                        <form>
                            <div className="mb-2">
                                <InputText type="text" defaultValue={loginObj.emailId} updateType="emailId" containerStyle="mt-4" placeholder={'Enter Email'} labelTitle="Enter Email" updateFormValue={updateFormValue} />
                                <div className='relative'>
                                    {/* <InputText defaultValue={loginObj.otp} type={showPass} updateType="otp" placeholder={'Enter OTP'} containerStyle="mt-2" labelTitle="Enter OTP" updateFormValue={updateFormValue} /> */}
                                    {hiddeOtpFeild ?
                                        <InputText defaultValue={loginObj.otp} type={showPass} updateType="otp" placeholder={'Enter OTP'} containerStyle="mt-2" labelTitle="Enter OTP" updateFormValue={updateFormValue} />
                                        : null}
                                    {hiddeOtpFeild ? showPass === "password" ? <AiOutlineEye onClick={showPassword} className='eye-icon' /> : <AiOutlineEyeInvisible onClick={showPassword} className='eye-icon' /> : null}
                                </div>
                            </div>

                            {/* <button type="submit" className={"btn mt-2 w-full btn-primary" + (isLoading ? " loading" : "")}>Verify</button> */}
                            <Stack direction='colunm' align='center' spacing={4}>
                                <Button type='submit' colorScheme='blue' spacing={2} onClick={() => sendId(1)} style={{ backgroundColor: '#2c427d', color: '#fff' }}>Previous</Button>
                                <Button colorScheme='blue' isLoading={isLoading ? 'isLoading' : ''} loadingText='Loading' spacing={2} onClick={() => emailIdVerify()} style={{ backgroundColor: '#2c427d', color: '#fff' }}>Verify Email</Button>
                            </Stack>
                            {/* <button type="submit" className={"btn mt-2 w-full btn-primary"}>Login</button> */}
                            <div className='text-center mt-4'>Don't have an account yet? <Link to="/login"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Login</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailVerify