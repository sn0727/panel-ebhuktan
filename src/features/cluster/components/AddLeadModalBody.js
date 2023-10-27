import { useState, useEffect } from "react"
import { ApiUrl, APIRequest, APIRequestWithFile } from '../../../utils/commanApiUrl';
import ErrorText from '../../../components/Typography/ErrorText'
import jwtDecode from 'jwt-decode';
import { toast } from "react-toastify";
import {
    AadhaarNoValidation,
    PanNoValidation,
    emailValidation,
    mobileNoValidation,
    nameValidation,
    postalCodeValidation,
    stateValidation
} from "../../../components/Validation"



// Mobile No Verification component
const MobileNumberVerifyCompent = ({ setStepId, mobileSendAnthorComponent }) => {
    // get token object
    var token = sessionStorage.getItem("token")
    const decodedToken = jwtDecode(token);
    const { id } = decodedToken.user

    const [mobileNo, setMobileNo] = useState("")
    const [mobileNoOtp, setMobileNoOtp] = useState("")
    const [isLoading, setisLoading] = useState(false)
    const [hiddeOtpFeild, setHiddeOtpFeild] = useState(false)

    // final registration func
    const mobileNoVerifyFun = (e) => {
        e.stopPropagation();
        if (mobileNoValidation(mobileNo)) {
            setisLoading(true)
            let config = {
                url: ApiUrl.sendOTPMobileNo,
                method: 'post',
                body: {
                    contact: mobileNo,
                }
            }
            APIRequest(
                config,
                res => {
                    if (!res?.error) {
                        toast.success(res?.message)
                        setHiddeOtpFeild(true)
                        setisLoading(false)
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

    const OtpVerify = (e) => {
        e.stopPropagation();
        setisLoading(true)
        let config = {
            url: ApiUrl.contactVerification,
            method: 'post',
            body: {
                contact: mobileNo,
                OTP: mobileNoOtp
            }
        }
        APIRequest(
            config,
            res => {
                if (!res?.error) {
                    toast.success(res?.message)
                    setisLoading(false)
                    setStepId(2)
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

    // save mobile 
    mobileSendAnthorComponent(mobileNo)

    return (
        <div className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Enter mobile number. <span className="text-red">*</span>
                    </label>
                    <input

                        onChange={(e) => setMobileNo(e.target.value)}
                        value={mobileNo}
                        defaultValue={mobileNo}
                        name="mobileNo"
                        required
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="number"
                        placeholder="Enter mobile number." />
                </div>
                {hiddeOtpFeild ?
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Enter Vaild (OTP) <span className="text-red">*</span>
                        </label>
                        <input

                            onChange={(e) => setMobileNoOtp(e.target.value)}
                            value={mobileNoOtp}
                            name="number"
                            required
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name"
                            type="mobileNoOtp"
                            placeholder="Enter Mobile OTP." />

                        {hiddeOtpFeild ? <div className='text-right text-primary'><div><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200" onClick={(e) => mobileNoVerifyFun(e)}><b>Resend OTP</b></span></div>
                        </div> : null}
                    </div>
                    : null}

            </div>
            {
                !hiddeOtpFeild ? <button
                    onClick={(e) => mobileNoVerifyFun(e)}
                    type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                    {isLoading ? <div>
                        <svg aria-hidden="false" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                        Loading...
                    </div> : 'Get (OTP)'}
                </button> : <button
                    onClick={(e) => OtpVerify(e)}
                    type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                    {isLoading ? <div>
                        <svg aria-hidden="false" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                        Loading...
                    </div> : 'Verify (OTP)'}
                </button>
            }
        </div>
    )
}

// Aadhaar Verification component
const AddharCardCompent = ({ setStepId, AadhaarNoSn }) => {
    const [aadhaarOtp, setAadhaarOtp] = useState("")
    const [aadhaarNo, setAadhaarNo] = useState("")
    const [aadharclient_id, setaadharclient_id] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [hiddeOtpFeild, setHiddeOtpFeild] = useState(false)

    // send aadhaar no to registrotion component
    AadhaarNoSn(aadhaarNo)

    const AadhaarWithOTP = (e) => {
        e.stopPropagation()
        if (AadhaarNoValidation(aadhaarNo)) {
            setisLoading(true)
            let config = {
                url: `${ApiUrl.aadhaarWithOTP}`,
                method: 'post',
                body: {
                    id_number: aadhaarNo
                }
            };
            APIRequest(
                config,
                res => {
                    console.log(res);
                    setaadharclient_id(res?.data?.data?.client_id)
                    toast.success(res?.message)
                    setHiddeOtpFeild(true)
                    setisLoading(false)
                },
                err => {
                    toast.error(err?.message)
                    setisLoading(false)
                }
            );
        }
    }

    const VerifyAadhaarOTP = (e) => {
        e.stopPropagation()
        setisLoading(true)
        let config = {
            url: `${ApiUrl.verifyAadhaarOTP}`,
            method: 'post',
            body: {
                otp: aadhaarOtp,
                client_id: aadharclient_id
            }
        };
        APIRequest(
            config,
            res => {
                console.log(res);
                toast.success(res?.message)
                setStepId(3)
                setisLoading(false)
            },
            err => {
                toast.error(err?.message)
                setisLoading(false)
            }
        );
    }

    return (
        <div className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Aadhaar No. <span className="text-red">*</span>
                    </label>
                    <input

                        onChange={(e) => setAadhaarNo(e.target.value)}
                        value={aadhaarNo}
                        name="number"
                        required
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name"
                        type="aahaarNo"
                        placeholder="Enter aadhaar no." />
                </div>
                {hiddeOtpFeild ?
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Enter Vaild (OTP) <span className="text-red">*</span>
                        </label>
                        <input

                            onChange={(e) => setAadhaarOtp(e.target.value)}
                            value={aadhaarOtp}
                            name="number"
                            required
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name"
                            type="aadhaarOtp"
                            placeholder="Enter Aadhaar OTP." />
                        {hiddeOtpFeild ? <div className='text-right text-primary'><div><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200" onClick={(e) => AadhaarWithOTP(e)}><b>Resend OTP</b></span></div>
                        </div> : null}
                    </div> : null}
            </div>
            {
                !hiddeOtpFeild ? <button
                    onClick={(e) => AadhaarWithOTP(e)}
                    type="submit"
                    isLoading={isLoading ? 'isLoading' : ''} loadingText='Loading'
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                    {isLoading ? <div>
                        <svg aria-hidden="false" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                        Loading...
                    </div> : 'Get (OTP)'}
                </button> : <button
                    onClick={(e) => VerifyAadhaarOTP(e)}
                    type="submit"
                    isLoading={isLoading ? 'isLoading' : ''} loadingText='Loading'
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                    {isLoading ? <div>
                        <svg aria-hidden="false" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                        Loading...
                    </div> : 'Verify (OTP)'}
                </button>
            }
        </div>
    )
}

// final Ristration component
const FinalRistrationComponent = ({ createRoleName, saveAadharNo, saveMobileNo, closeModal, filterTransaction}) => {
    const [isLoading, setisLoading] = useState(false)
    const [name, setName] = useState("")
    const [mobileNo, setMobileNo] = useState(saveMobileNo)
    const [email, setEmail] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [stateData, setStateData] = useState([]);
    const [stateValue, setStateValue] = useState("")
    const [district, setDistrict] = useState("")
    const [panNo, setPanNo] = useState("")
    const [aadhaarNo, setAadhaarNo] = useState(saveAadharNo)
    const [referralId, setReferralId] = useState('');
    const [file, setFileProfile] = useState(null);

    // let filteFun = filterTransaction();
    // console.log(filteFun, "================== filterTransaction alam addres")

    // select state value 
    const stateHandler = (event) => {
        setStateValue(event.target.value)
    }
    
    // final registration func
    const AddFinalRisHandler = (e) => {
        // e.stopPropagation();
        if (
            nameValidation(name) && mobileNoValidation(mobileNo) &&
            emailValidation(email) &&
            postalCodeValidation(postalCode) &&
            stateValidation(stateValue) &&
            AadhaarNoValidation(aadhaarNo) &&
            PanNoValidation(panNo)
        ) {
            // create formdata 
            let formdata = new FormData();
            formdata.append('name', name);
            formdata.append('contact', mobileNo);
            formdata.append('email', email);
            formdata.append('state', stateValue);
            formdata.append('aadharNo', aadhaarNo);
            formdata.append('panNo', panNo);
            formdata.append('role', createRoleName);
            formdata.append('district', district);
            formdata.append('postalCode', postalCode);
            formdata.append('adminId', referralId);
            formdata.append('image', file);
            setisLoading(true)
            let config = {
                url: ApiUrl.editProfileRes,
                method: 'post',
                body: formdata
            };
            APIRequestWithFile(
                config,
                res => {
                    console.log(res, "add modle");
                    if (!res.error) {
                        toast.success(res?.message)
                        setisLoading(false);
                        setTimeout(()=>{
                            window.location.reload(true);
                        }, 1500)
                        // filterTransaction();
                        closeModal();
                    } else {
                        toast.error(res?.message)
                        setisLoading(false)
                    }
                },
                err => {
                    console.log(err, "================= alm")
                    if (err?.data?.error) {
                        toast.error(err?.data?.message)
                    }
                    setisLoading(false)
                }
            );
        }

    }

    // get state from the api
    const stateGetFun = () => {
        let config = {
            url: ApiUrl?.electricityGetState,
            method: 'get'
        }
        APIRequest(
            config,
            res => {
                // console.log(res?.data, 'res======================= kkk')
                setStateData(res?.data)
            },
            err => {
                console.log(err?.data, 'res======================= kkk')
            }
        )
    }

    useEffect(() => { stateGetFun() }, [])

    return (
        <div className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                        Name <span className="text-red">*</span>
                    </label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        name="name"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="text" placeholder="Enter name."
                        required />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Enter mobile number. <span className="text-red">*</span>
                    </label>
                    <input
                        defaultValue={mobileNo}
                        name="mobileNo"
                        required
                        disabled
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="number"
                        placeholder="Enter mobile number." />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Email <span className="text-red">*</span>
                    </label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        name="email"
                        required
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name"
                        type="email"
                        placeholder="Enter Email." />
                </div>

                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                        Postal Code <span className="text-red">*</span>
                    </label>
                    <input
                        onChange={(e) => setPostalCode(e.target.value)}
                        value={postalCode}
                        name="postalCode"
                        required
                        className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                        type="number" placeholder='Enter postal code.' />
                </div>

                <div className="w-full md:w-1/2 px-3">
                    {/* <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                        State <span className="text-red">*</span>
                    </label>
                    <input
                        onChange={(e) => setStateValue(e.target.value)}
                        value={stateValue}
                        name="text"
                        required
                        className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                        type="text" placeholder={"Use current state"} /> */}
                    <div className='sdkjfsdfsd-dsfsdk'>
                        <label className='sdfdsbkdsf-sdfdsk'>Select State</label>
                        <select name="role" onChange={stateHandler} className='block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'>
                            <option value="">Select State</option>
                            {
                                stateData?.map((items, index) => (
                                    <option key={index} value={items?.statename}>{items?.statename}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                        District (Optional)
                    </label>
                    <input
                        onChange={(e) => setDistrict(e.target.value)}
                        value={district}
                        name="district"
                        required
                        className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                        type="text" placeholder={"Enter district name."} />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Aadhaar No. <span className="text-red">*</span>
                    </label>
                    <input
                        defaultValue={aadhaarNo}
                        name="number"
                        required
                        disabled
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name"
                        type="aahaarNo"
                        placeholder="Enter aadhaar no." />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                        Enter PAN <span className="text-red">*</span>
                    </label>
                    <input
                        onChange={(e) => setPanNo(e.target.value.toUpperCase())}
                        value={panNo}
                        name="panNo"
                        required
                        className="text-sm uppercase mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                        type="text" placeholder={"Enter PAN"} />
                </div>

                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                        Referral Id <span className="text-red">*</span>
                        {/* {role === 'distributor' ? "Cluster Id (Optional)" : role === 'retailer' || role === 'franchise' ? 'Distributor Id (Optional)' : 'Referral Id (Optional)'} */}
                    </label>
                    <input
                        onChange={(e) => setReferralId(e.target.value)}
                        value={referralId}
                        name="number"
                        required
                        className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                        type="text" placeholder={"Referral Id"} />
                </div>

                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                        select Profile Image (Optional)
                    </label>
                    <input
                        onChange={(e) => setFileProfile(e.target.files[0])}
                        name="number"
                        className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                        type="file" />
                </div>
                <div className="w-full px-3">
                    {/* <ErrorText styleClass="mt-8">{errorMessage}</ErrorText> */}
                </div>
            </div>
            <button
                onClick={(e) => AddFinalRisHandler(e)}
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                {isLoading ? <div>
                    <svg aria-hidden="false" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg>
                    Loading...
                </div> : 'Add'}
            </button>
        </div>
    )
}

// final Ristration component
const SubAdminRistrationComponent = ({ createRoleName, closeModal }) => {
    const [isLoading, setisLoading] = useState(false)
    const [name, setName] = useState("")
    const [mobileNo, setMobileNo] = useState('')
    const [email, setEmail] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [stateData, setStateData] = useState([]);
    const [stateValue, setStateValue] = useState("")
    const [district, setDistrict] = useState("")
    const [panNo, setPanNo] = useState("")
    const [aadhaarNo, setAadhaarNo] = useState('')
    const [referralId, setReferralId] = useState('');
    const [file, setFileProfile] = useState(null);

    // console.log(filterTransaction(), "========================== filterTransaction")

    // select state value 
    const stateHandler = (event) => {
        setStateValue(event.target.value)
    }

    // final registration func
    const AddFinalRisHandler = (e) => {
        // e.stopPropagation();

        if (
            nameValidation(name) && mobileNoValidation(mobileNo) &&
            emailValidation(email) &&
            postalCodeValidation(postalCode) &&
            stateValidation(stateValue) &&
            AadhaarNoValidation(aadhaarNo) &&
            PanNoValidation(panNo)
        ) {
            // create formdata 
            let formdata = new FormData();
            formdata.append('name', name);
            formdata.append('contact', mobileNo);
            formdata.append('email', email);
            formdata.append('state', stateValue);
            formdata.append('aadharNo', aadhaarNo);
            formdata.append('panNo', panNo);
            formdata.append('role', createRoleName);
            formdata.append('district', district);
            formdata.append('postalCode', postalCode);
            formdata.append('adminId', referralId);
            formdata.append('image', file);
            setisLoading(true)
            let config = {
                url: ApiUrl.editProfileRes,
                method: 'post',
                body: formdata
            };
            APIRequestWithFile(
                config,
                res => {
                    console.log(res, "add modle");
                    if (!res.error) {
                        toast.success(res?.message)
                        setisLoading(false);
                        window.location.reload(true);
                        // filterTransaction();
                        closeModal();
                    } else {
                        toast.error(res?.message)
                        setisLoading(false)
                    }
                },
                err => {
                    console.log(err, "================= alm")
                    if (err?.data?.error) {
                        toast.error(err?.data?.message)
                    }
                    setisLoading(false)
                }
            );
        }

    }

    // get state from the api
    const stateGetFun = () => {
        let config = {
            url: ApiUrl?.electricityGetState,
            method: 'get'
        }
        APIRequest(
            config,
            res => {
                // console.log(res?.data, 'res======================= kkk')
                setStateData(res?.data)
            },
            err => {
                console.log(err?.data, 'res======================= kkk')
            }
        )
    }

    useEffect(() => { stateGetFun() }, [])

    return (
        <div className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                        Name <span className="text-red">*</span>
                    </label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        name="name"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        id="grid-first-name"
                        type="text" placeholder="Enter name."
                        required />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Enter mobile number. <span className="text-red">*</span>
                    </label>
                    <input
                        defaultValue={mobileNo}
                        name="mobileNo"
                        onChange={(e) => setMobileNo(e.target.value)}
                        required
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="number"
                        placeholder="Enter mobile number." />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Email <span className="text-red">*</span>
                    </label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        name="email"
                        required
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name"
                        type="email"
                        placeholder="Enter Email." />
                </div>

                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                        Postal Code <span className="text-red">*</span>
                    </label>
                    <input
                        onChange={(e) => setPostalCode(e.target.value)}
                        value={postalCode}
                        name="postalCode"
                        required
                        className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                        type="number" placeholder='Enter postal code.' />
                </div>

                <div className="w-full md:w-1/2 px-3">
                    {/* <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                        State <span className="text-red">*</span>
                    </label>
                    <input
                        onChange={(e) => setStateValue(e.target.value)}
                        value={stateValue}
                        name="text"
                        required
                        className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                        type="text" placeholder={"Use current state"} /> */}
                    <div className='sdkjfsdfsd-dsfsdk'>
                        <label className='sdfdsbkdsf-sdfdsk'>Select State</label>
                        <select name="role" onChange={stateHandler} className='block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'>
                            <option value="">Select State</option>
                            {
                                stateData?.map((items, index) => (
                                    <option key={index} value={items?.statename}>{items?.statename}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                        District (Optional)
                    </label>
                    <input
                        onChange={(e) => setDistrict(e.target.value)}
                        value={district}
                        name="district"
                        required
                        className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                        type="text" placeholder={"Enter district name."} />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Aadhaar No. <span className="text-red">*</span>
                    </label>
                    <input
                        defaultValue={aadhaarNo}
                        name="number"
                        onChange={(e) => setAadhaarNo(e.target.value)}
                        required
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name"
                        type="aahaarNo"
                        placeholder="Enter aadhaar no." />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                        Enter PAN <span className="text-red">*</span>
                    </label>
                    <input
                        onChange={(e) => setPanNo(e.target.value.toUpperCase())}
                        value={panNo}
                        name="panNo"
                        required
                        className="text-sm uppercase mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                        type="text" placeholder={"Enter PAN"} />
                </div>

                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                        Referral Id <span className="text-red">*</span>
                        {/* {role === 'distributor' ? "Cluster Id (Optional)" : role === 'retailer' || role === 'franchise' ? 'Distributor Id (Optional)' : 'Referral Id (Optional)'} */}
                    </label>
                    <input
                        onChange={(e) => setReferralId(e.target.value)}
                        value={referralId}
                        name="number"
                        required
                        className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                        type="text" placeholder={"Referral Id"} />
                </div>

                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                        select Profile Image (Optional)
                    </label>
                    <input
                        onChange={(e) => setFileProfile(e.target.files[0])}
                        name="number"
                        className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                        type="file" />
                </div>
                <div className="w-full px-3">
                    {/* <ErrorText styleClass="mt-8">{errorMessage}</ErrorText> */}
                </div>
            </div>
            <button
                onClick={(e) => AddFinalRisHandler(e)}
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                {isLoading ? <div>
                    <svg aria-hidden="false" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg>
                    Loading...
                </div> : 'Add'}
            </button>
        </div>
    )
}

function AddLeadModalBody({ closeModal, createRoleName, filterTransaction }) {
    const [saveMobileNo, setSaveMobileNo] = useState('')
    const [saveAadharNo, setSaveAadhaarNo] = useState('')
    const [stepId, setStepId] = useState(1)

    // console.log(filterTransaction , "===================== alam sdsd")

    const mobileSendAnthorComponent = (mobileNo) => {
        setSaveMobileNo(mobileNo)
    }

    const AadhaarNoSn = (aadhaarNo) => {
        setSaveAadhaarNo(aadhaarNo)
    }
    if (createRoleName === "subAdmin") {
        return (
            <>
                <SubAdminRistrationComponent
                    createRoleName={createRoleName}
                />
            </>
        )
    } else if (stepId === 1) {
        return (
            <>
                <MobileNumberVerifyCompent setStepId={setStepId} mobileSendAnthorComponent={mobileSendAnthorComponent} />
            </>
        )
    } else if (stepId === 2) {
        return (
            <>
                <AddharCardCompent setStepId={setStepId} AadhaarNoSn={AadhaarNoSn} />
            </>
        )
    } else if (stepId === 3) {
        return (
            <>
                <FinalRistrationComponent
                    saveMobileNo={saveMobileNo}
                    saveAadharNo={saveAadharNo}
                    createRoleName={createRoleName}
                    closeModal={closeModal}
                    filterTransaction={filterTransaction}
                />
            </>
        )
    }



}

export default AddLeadModalBody