import { useState, useEffect } from "react"
import { ApiUrl, APIRequest, APIRequestWithFile } from '../../../utils/commanApiUrl';
import ErrorText from '../../../components/Typography/ErrorText'
import jwtDecode from 'jwt-decode';
import { toast } from "react-toastify";



// Mobile No Verification component
const MobileNumberVerifyCompent = () => {
    const [mobileNo, setMobileNo] = useState("")
    const [mobileNoOtp, setMobileNoOtp] = useState("")
    const [isLoading, setisLoading] = useState(false)
    const [hiddeOtpFeild, setHiddeOtpFeild] = useState(false)

    // final registration func
    // const mobileNoVerifyFun = () => {
    //     setisLoading(true)
    //     let config = {
    //         url: ApiUrl.sendOTPMobileNo,
    //         method: 'post',
    //         body: {
    //             contact: mobileNo,
    //         }
    //     }
    //     APIRequest(
    //         config,
    //         res => {
    //             if (!res?.error) {
    //                 toast.success(res?.message)
    //                 setHiddeOtpFeild(true)
    //                 setisLoading(false)
    //             } else {
    //                 toast.error(res?.message)
    //             }

    //         },
    //         err => {
    //             console.log(err, "err ==============")
    //             toast.error(err?.message)
    //             setisLoading(false)
    //         }
    //     )
    // }

    function submitHandler(e) {
        e.preventDefault()
    }

    const OtpVerify = () => {
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

    // const mobileNoVerifyFunHandler = ( ) => {
    //     mobileNoVerifyFun()
    // }

    return (
        <form className="w-full max-w-lg" onSubmit={(event) => {
            event.preventDefault()
            console.log("helo")
        }}>
            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Enter mobile number.
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
                            Enter Vaild (OTP)
                        </label>
                        <input

                            onChange={(e) => setMobileNoOtp(e.target.value)}
                            value={mobileNoOtp}
                            name="number"
                            required
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name"
                            type="mobileNoOtp"
                            placeholder="Enter Mobile OTP." />
                    </div>
                    : null}
            </div>
            {/* {
                    !hiddeOtpFeild ? <button
                        onClick={mobileNoVerifyFunHandler}
                        type="submit"
                        isLoading={isLoading ? 'isLoading' : ''} loadingText='Loading'
                        class="mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Get (OTP)
                    </button> : <button
                        onClick={() => OtpVerify()}
                        type="submit"
                        isLoading={isLoading ? 'isLoading' : ''} loadingText='Loading'
                        class="mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Verify (OTP)
                    </button>
                } */}

                <button type="submit"> button</button>
        </form>
    )
}

// Aadhaar Verification component
const AddharCardCompent = () => {
    const [aadhaarOtp, setAadhaarOtp] = useState("")
    const [aadhaarNo, setAadhaarNo] = useState("")
    const [aadharclient_id, setaadharclient_id] = useState('')
    const [isLoading, setisLoading] = useState(false)

    const AadhaarWithOTP = (aadharNo) => {
        setisLoading(true)
        let config = {
            url: `${ApiUrl.aadhaarWithOTP}`,
            method: 'post',
            body: {
                id_number: aadharNo
            }
        };
        APIRequest(
            config,
            res => {
                console.log(res);
                setaadharclient_id(res?.data?.data?.client_id)
                toast.success(res?.message)
                setisLoading(false)
            },
            err => {
                toast.error(err?.message)
                setisLoading(false)
            }
        );
    }

    const VerifyAadhaarOTP = () => {
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
                setisLoading(false)
            },
            err => {
                toast.error(err?.message)
                setisLoading(false)
            }
        );
    }

    // final registration func
    const aadhaarNoVerifyFun = () => {
        alert('click')
    }

    // aadhaarNo registration func
    const aadharNoHandler = () => {
        alert('clik')
    }

    return (
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Aadhaar No.
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
            <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Enter Vaild (OTP)
                </label>
                <input

                    onChange={(e) => setAadhaarOtp(e.target.value)}
                    value={aadhaarOtp}
                    name="number"
                    required
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name"
                    type="aadhaarOtp"
                    placeholder="Enter Aadhaar OTP." />
            </div>
            <button
                type="submit"
                class="my-4  mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={aadharNoHandler}
            >
                Verify (OTP)
            </button>
        </div>
    )
}

// final Ristration component
const FinalRistrationComponent = ({ createRoleName }) => {
    const [isLoading, setisLoading] = useState(false)
    const [aadharclient_id, setaadharclient_id] = useState('')
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [stateValue, setStateValue] = useState("")
    const [district, setDistrict] = useState("")
    const [panNo, setPanNo] = useState("")
    const [referralId, setReferralId] = useState('');

    // final registration func
    const AddFinalRisHandler = () => {
        // create formdata 
        let formdata = new FormData();
        formdata.append('name', name);
        // formdata.append('contact', mobileNo);
        formdata.append('email', email);
        formdata.append('state', stateValue);
        // formdata.append('aadharNo', aadhaarNo);
        formdata.append('panNo', panNo);
        formdata.append('role', createRoleName);
        formdata.append('district', district);
        formdata.append('postalCode', postalCode);
        formdata.append('adminId', referralId);
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
                    setisLoading(false)
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

    return (
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                    Name
                </label>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    name="name"
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text" placeholder="Enter name."
                    required />
            </div>

            <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Email
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
                    Postal Code
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
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                    State
                </label>
                <input
                    onChange={(e) => setStateValue(e.target.value)}
                    value={stateValue}
                    name="text"
                    required
                    className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                    type="text" placeholder={"Use current state"} />
            </div>

            <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                    District
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
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                    Enter PAN
                </label>
                <input
                    onChange={(e) => setPanNo(e.target.value)}
                    value={panNo}
                    name="panNo"
                    required
                    className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                    type="text" placeholder={"Enter PAN"} />
            </div>

            <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                    Referral Id
                </label>
                <input
                    onChange={(e) => setReferralId(e.target.value)}
                    value={referralId}
                    name="number"
                    required
                    className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                    type="text" placeholder={"Referral Id"} />
            </div>
            <div className="w-full px-3">
                {/* <ErrorText styleClass="mt-8">{errorMessage}</ErrorText> */}
            </div>

            <button
                type="submit"
                class="my-4  mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={AddFinalRisHandler}
            >
                Add
            </button>
        </div>
    )
}


function ConfirmationModalBody({ closeModal, createRoleName }) {
    // get token object 
    var token = sessionStorage.getItem("token")
    const decodedToken = jwtDecode(token);
    const { id } = decodedToken.user

    return (
        <>
            <form className="w-full max-w-lg">
                <MobileNumberVerifyCompent />
                {/* <AddharCardCompent closeModal={closeModal} />
                <FinalRistrationComponent createRoleName={createRoleName} /> */}
            </form>

            {/* {isLoading ? document.body.classList.add('loading-indicator') : document.body.classList.remove('loading-indicator')} */}

        </>
    )
}

export default ConfirmationModalBody