import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText';
import { APIRequest, ApiUrl } from '../../utils/commanApiUrl';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Button, Stack } from '@chakra-ui/react';

function AddharNumberVerify({ revicedIdAaddhar, aaddhaarAllData }) {
    const navigation = useNavigate();
    const [isLoading, setisLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [showPass, setShowPass] = useState('password')
    const [hiddeOtpFeild, setHiddeOtpFeild] = useState(false)
    const [aaddaarData, setAaddaarData] = useState({})
    const [loginObj, setLoginObj] = useState({
        aadhaarNo: "",
        otp: "",
    })

    // console.log(aaddaarData, '-----------------------')

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLoginObj({ ...loginObj, [updateType]: value })
    }

    const AaddaarVerify = () => {
        setisLoading(true)
        let config = {
            url: ApiUrl.aadhaarWithOTP,
            method: 'post',
            body: {
                id_number: loginObj.aadhaarNo,
            }
        }
        APIRequest(
            config,
            res => {
                if (!res?.error) {
                    toast.success(res?.message)
                    setAaddaarData(res?.data?.data)
                    setisLoading(false)
                    setHiddeOtpFeild(true)
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

    const AaddaarOtpVerify = () => {
        setisLoading(true)
        let config = {
            url: ApiUrl.verifyAadhaarOTP,
            method: 'post',
            body: {
                otp: loginObj?.otp,
                client_id: aaddaarData?.client_id
            }
        }
        APIRequest(
            config,
            res => {
                if (!res?.error) {
                    toast.success(res?.message)
                    setisLoading(false)
                    revicedIdAaddhar(3)
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

    const submitAadhaarNoHandler = (e) => {
        e.preventDefault()
        setErrorMessage("")
        if (loginObj.aadhaarNo.trim() === "") return setErrorMessage("Aaddhaar No, is required! (use any value)")
        // if (loginObj.password.trim() === "") return setErrorMessage("Password is required! (use any value)")
        else {
            AaddaarVerify()
            // revicedIdAaddhar(3)
        }
    }

    const submitVerifyOtpNoHandler = (e) => {
        e.preventDefault()
        setErrorMessage("")

        if (loginObj.aadhaarNo.trim() === "") return setErrorMessage("Aaddhaar No, is required! (use any value)")
        if (loginObj.otp.trim() === "") return setErrorMessage("OTP is required! (use any value)")
        else {
            AaddaarOtpVerify()
            if (aaddaarData?.otp_sent) {
                aaddhaarAllData(loginObj.aadhaarNo)
            }
        }
    }

    // resend otp 
    const handleResendOtp = () => {
        AaddaarVerify();
    }

    const handlePrevious = () => {
        revicedIdAaddhar(1)
    }

    const showPassword = () => {
        showPass === "password" ? setShowPass("text") : setShowPass("password")
    }
    return (
        <div className="flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl mt-5">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro />
                    </div>
                    <div className='py-10 px-10' style={{height: '400px'}}>
                        {/* <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2> */}
                        <form >
                            <div className="mb-2">
                                <InputText type="text" defaultValue={loginObj.aadhaarNo} updateType="aadhaarNo" containerStyle="mt-4" placeholder={'Enter 12 digits Aadhaar No.'} labelTitle="Enter 12 digits Aadhaar No." updateFormValue={updateFormValue} disabled={!hiddeOtpFeild ? '' : 'disabled'} />
                                <div className='relative'>
                                    {hiddeOtpFeild ?
                                        <InputText defaultValue={loginObj.otp} type={showPass} updateType="otp" placeholder={'Enter OTP'} containerStyle="mt-2" labelTitle="Enter OTP" updateFormValue={updateFormValue} />
                                        : null}
                                    {hiddeOtpFeild ? showPass === "password" ? <AiOutlineEye onClick={showPassword} className='eye-icon' /> : <AiOutlineEyeInvisible onClick={showPassword} className='eye-icon' /> : null}
                                </div>
                            </div>

                            {hiddeOtpFeild ? <div className='text-right text-primary'><div><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200" onClick={handleResendOtp}>Resend OTP</span></div>
                            </div> : null}
                            {errorMessage ? <ErrorText styleClass="mt-1">{errorMessage}</ErrorText> : null}
                            <Stack direction='colunm' align='center' spacing={4}>
                                {/* <button type="submit" className={"btn mt-2 w-full btn-primary" + (isLoading ? " loading" : "")}>Verify</button> */}
                                <Button type='submit' colorScheme='blue' spacing={2} onClick={handlePrevious}>Previous</Button>
                                {/* <Button colorScheme='blue' spacing={2} onClick={submitForm}>Next</Button> */}
                                {/* <button type="submit" className={"btn mt-2 w-full btn-primary" + (isLoading ? " loading" : "")}>Verify</button> */}
                                {!hiddeOtpFeild ?
                                    <Button colorScheme='blue' isLoading={isLoading ? 'isLoading' : ''} loadingText='Loading' spacing={2} onClick={submitAadhaarNoHandler}>Next</Button>
                                    : <Button colorScheme='blue' isLoading={isLoading ? 'isLoading' : ''} loadingText='Loading' spacing={2} onClick={submitVerifyOtpNoHandler}>Verify OTP</Button>}
                            </Stack>
                            {/* <button type="submit" className={"btn mt-2 w-full btn-primary"}>Login</button> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddharNumberVerify