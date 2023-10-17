import { useState, useEffect } from "react"
import { ApiUrl, APIRequest, APIRequestWithFile } from '../../../utils/commanApiUrl';
import ErrorText from '../../../components/Typography/ErrorText'
import jwtDecode from 'jwt-decode';
import { toast } from "react-toastify";


function AddLeadModalBody({ closeModal, createRoleName }) {
    const [isLoading, setisLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    console.log(createRoleName, "createRoleName")

    // get token object 
    var token = localStorage.getItem("token")
    const decodedToken = jwtDecode(token);
    const { id } = decodedToken.user

    console.log(id)
    console.log(decodedToken)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [postCode, setPostCode] = useState("")
    // const [password, setPassword] = useState("")
    const [statevalue, setStateValue] = useState("")
    const [district, setDistrict] = useState("")
    const [addharcard, setAddharCard] = useState("")
    const [pancard, setPanCard] = useState("")
    const [Id, setId] = useState('');
    const [addharcardOtp, setaddharcardOtp] = useState('')
    const [aadharOTP, setaadharOTP] = useState('')
    const [aadharclient_id, setaadharclient_id] = useState('')


    const submitHandler = async (e) => {
        e.preventDefault();
        setErrorMessage("")

        if (name.trim() === "") return setErrorMessage("Name is required! (use any value)")
        if (email.trim() === "") return setErrorMessage("Email Id is required! (use any value)")
        if (contact.trim().length !== 10) return setErrorMessage("Please enter correct contact no")
        if (postCode.trim().length !== 6) return setErrorMessage("Please enter correct Postal Code")
        // if (password.trim() === "") return setErrorMessage("Password is required! (use any value)")
        if (statevalue.trim() == "") return setErrorMessage("State is reqiured (use any value)")
        if (district.trim() === "") return setErrorMessage("District is required! (use any value)")
        if (addharcard.trim().length !== 12) return setErrorMessage("Please enter correct aadhar no")
        if (pancard.trim().length !== 10) return setErrorMessage("Please enter correct pan card no")
        if (aadharOTP !== 'verify') return setErrorMessage("Please enter valid Aadhaar no.!")
        else {
            try {

                const SendRequest = async () => {
                    // create formdata 
                    let formdata = new FormData();
                    formdata.append('name', name);
                    formdata.append('contact', contact);
                    formdata.append('email', email);
                    formdata.append('state', statevalue);
                    formdata.append('aadharNo', addharcard);
                    formdata.append('panNo', pancard);
                    formdata.append('role', createRoleName);
                    formdata.append('district', district);
                    formdata.append('postalCode', postCode);
                    formdata.append('adminId', Id);
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
                SendRequest();

            } catch (error) {
                console.log(error?.response?.data)
            }
        }

        closeModal()
    }

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
                setaadharOTP('show')
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
                otp: addharcardOtp,
                client_id: aadharclient_id
            }
        };
        APIRequest(
            config,
            res => {
                console.log(res);
                setaadharOTP('verify')
                toast.success(res?.message)
                setisLoading(false)
            },
            err => {
                toast.error(err?.message)
                setisLoading(false)
            }
        );
    }

    useEffect(() => {
        if (addharcard.length === 12) {
            AadhaarWithOTP(addharcard)
        }
        console.log('123456');
    }, [addharcard])
    useEffect(() => {
        if (addharcardOtp?.length === 6) {
            VerifyAadhaarOTP()
        }
    }, [addharcardOtp])


    return (
        <>
            <form className="w-full max-w-lg" method="post" onSubmit={submitHandler}>
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
                            type="text" placeholder="Jane"
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
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Email" />
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Contact
                        </label>
                        <input

                            onChange={(e) => setContact(e.target.value)}
                            value={contact}
                            name="number"
                            required
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="enter number" />
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                            Post Code
                        </label>
                        <input
                            onChange={(e) => setPostCode(e.target.value)}
                            value={postCode}
                            name="number"
                            required
                            className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                            type="number" placeholder={90210} />
                    </div>

                    {/* <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            name="text"
                            required
                            className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                            type="text" placeholder={'Enter Valid Password'} />
                    </div> */}

                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                            State
                        </label>
                        <input
                            onChange={(e) => setStateValue(e.target.value)}
                            value={statevalue}
                            name="text"
                            required
                            className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                            type="text" placeholder={"state"} />
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                            District
                        </label>
                        <input
                            onChange={(e) => setDistrict(e.target.value)}
                            value={district}
                            name="text"
                            required
                            className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                            type="text" placeholder={"District"} />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                            Pan Card No
                        </label>
                        <input
                            onChange={(e) => setPanCard(e.target.value)}
                            value={pancard}
                            name="number"
                            required
                            className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                            type="text" placeholder={"Pan Card No"} />
                    </div>
                    <div className="w-full md:w-1/2 px-3 relative">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                            Addhar Card No
                        </label>
                        {aadharOTP === 'verify' ? <p className='verify add-form'>✅</p> : null}
                        <input
                            onChange={(e) => setAddharCard(e.target.value)}
                            value={addharcard}
                            name="number"
                            required
                            className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                            type="number" placeholder={"Addhar Card No"} />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                            Referral Id
                        </label>
                        <input
                            onChange={(e) => setId(e.target.value)}
                            value={Id}
                            name="number"
                            required
                            className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                            type="text" placeholder={"Referral Id"} />
                    </div>
                    {aadharOTP === 'show' ? <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                            Aadhaar OTP
                        </label>
                        <input
                            onChange={(e) => setaddharcardOtp(e.target.value)}
                            value={addharcardOtp}
                            name="number"
                            required
                            className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip"
                            type="number" placeholder={"Aadhaar OTP"} />
                    </div> : null}
                    <div className="w-full px-3">
                        <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                    </div>

                    <button type="submit" class="my-4  mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add
                    </button>
                </div>
            </form>

            {isLoading ? document.body.classList.add('loading-indicator') : document.body.classList.remove('loading-indicator')}

        </>
    )
}

export default AddLeadModalBody