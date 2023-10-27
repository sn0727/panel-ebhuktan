import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText';
import { APIRequest, ApiUrl } from '../../utils/commanApiUrl';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Button, Stack } from '@chakra-ui/react';
import { mobileNoValidation } from '../../components/Validation';

function MobileNumberVerify({ sendId, mobileAllData }) {
    const navigation = useNavigate();
    const [isLoading, setisLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [showPass, setShowPass] = useState('password')
    const [hiddeOtpFeild, setHiddeOtpFeild] = useState(false)
    const [loginObj, setLoginObj] = useState({
        mobileNumber: "",
        otp: "",
    })

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLoginObj({ ...loginObj, [updateType]: value })
    }

    const mobileNoVerify = () => {
        if (mobileNoValidation(loginObj?.mobileNumber)) {
            setisLoading(true)
            let config = {
                url: ApiUrl.sendOTPMobileNo,
                method: 'post',
                body: {
                    contact: loginObj.mobileNumber,
                }
            }
            APIRequest(
                config,
                res => {
                    if (!res?.error) {
                        toast.success(res?.message)
                        sessionStorage.setItem("token", res?.token)
                        setHiddeOtpFeild(true)
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

    const OtpVerify = () => {
        setisLoading(true)
        let config = {
            url: ApiUrl.contactVerification,
            method: 'post',
            body: {
                contact: loginObj.mobileNumber,
                OTP: loginObj.otp
            }
        }
        APIRequest(
            config,
            res => {
                if (!res?.error) {
                    toast.success(res?.message)
                    setisLoading(false)
                    sendId(2)
                } else {
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

    // save mobile no.
    mobileAllData(loginObj?.mobileNumber)

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
                                <InputText type="text" defaultValue={loginObj.mobileNumber} updateType="mobileNumber" containerStyle="mt-4" placeholder={'Enter Mobile'} labelTitle="Enter Mobile" updateFormValue={updateFormValue} />
                                <div className='relative'>
                                    {/* <InputText defaultValue={loginObj.otp} type={showPass} updateType="otp" placeholder={'Enter OTP'} containerStyle="mt-2" labelTitle="Enter OTP" updateFormValue={updateFormValue} /> */}
                                    {hiddeOtpFeild ?
                                        <InputText defaultValue={loginObj.otp} type={showPass} updateType="otp" placeholder={'Enter OTP'} containerStyle="mt-2" labelTitle="Enter OTP" updateFormValue={updateFormValue} />
                                        : null}
                                    {hiddeOtpFeild ? showPass === "password" ? <AiOutlineEye onClick={showPassword} className='eye-icon' /> : <AiOutlineEyeInvisible onClick={showPassword} className='eye-icon' /> : null}
                                </div>
                            </div>

                            {hiddeOtpFeild ? <div className='text-right text-primary'><div><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200" onClick={() => mobileNoVerify()}>Resend OTP</span></div>
                            </div> : null}
                            {errorMessage ? <ErrorText styleClass="mt-1">{errorMessage}</ErrorText> : null}
                            {/* <button type="submit" className={"btn mt-2 w-full btn-primary" + (isLoading ? " loading" : "")}>Verify</button> */}
                            <Stack direction='colunm' align='center' spacing={4}>
                                {hiddeOtpFeild ? <Button type='submit' colorScheme='blue' spacing={2} onClick={() => sendId(1)} style={{ backgroundColor: '#2c427d', color: '#fff' }}>Previous</Button> : null}
                                {!hiddeOtpFeild ?
                                    <Button colorScheme='blue' isLoading={isLoading ? 'isLoading' : ''} loadingText='Loading' spacing={2} onClick={() => mobileNoVerify()} style={{ backgroundColor: '#2c427d', color: '#fff' }}>Get OTP</Button>
                                    : <Button colorScheme='blue' isLoading={isLoading ? 'isLoading' : ''} loadingText='Loading' spacing={2} onClick={() => OtpVerify()} style={{ backgroundColor: '#2c427d', color: '#fff' }}>Verify OTP</Button>}
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

export default MobileNumberVerify