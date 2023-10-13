import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import { APIRequest, APIRequestWithFile, ApiUrl } from '../../utils/commanApiUrl'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Button, Stack } from '@chakra-ui/react'

function Register({ revicedIdRegister, mobileNoSave, aadhaarObj }) {
    const navigation = useNavigate();
    const INITIAL_REGISTER_OBJ = {
        name: "",
        password: "",
        email: "",
        contact: mobileNoSave,
        state: '',
        aadharNo: aadhaarObj,
        panOtp: '',
        aadharOtp: '',
        panOtp: '',
        role: '',
        adminId: '',
        district: '',
        postalCode: '',

    }

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);
    const [role, setRole] = useState('');
    const [isLoading, setisLoading] = useState(false)
    const [aadharOTP, setaadharOTP] = useState('')
    const [aadharclient_id, setaadharclient_id] = useState('')
    const [file, setFile] = useState(null);



    // get file path.
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    // add profile image
    const userProfieleUpdate = () => {
        // create formdata 
        let formdata = new FormData();
        formdata.append('image', file);

        let config = {
            url: ApiUrl.editProfile,
            method: 'post',
            body: formdata
        }
        APIRequestWithFile(
            config,
            res => { console.log(res) },
            err => { console.log(err) }
        )
    }

    const Authuser = async () => {
        setisLoading(true)
        try {
            const result = await axios.post(ApiUrl.createUser,
                {
                    name: registerObj.name,
                    email: registerObj.email,
                    contact: registerObj.contact,
                    state: registerObj.state,
                    aadharNo: registerObj.aadharNo,
                    panNo: registerObj.panNo,
                    role: role,
                    adminId: registerObj.adminId,
                    district: registerObj.district,
                    postalCode: registerObj.postalCode,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            const { error, message } = result?.data
            if (error) {
                toast.error(message)
            } else {
                toast.success(message)
                // window.location.href = '/login'
                setisLoading(false)
                navigation("/login")
            }

        } catch (error) {
            console.log(error.response.data)
        }


    }

    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    function validateEmail(email) {
        return emailRegex.test(email);
    }

    const submitForm = (e) => {
        // e.preventDefault()
        setErrorMessage("")
        if (registerObj.name.trim() === "") return setErrorMessage("Name is required! (use any value)")
        if (registerObj.contact.trim().length !== 10) return setErrorMessage("Please enter correct Contact No")
        if (registerObj.email.trim() === "") return setErrorMessage("Email Id is required! (use any value)")
        if (!validateEmail(registerObj.email)) return setErrorMessage("Please enter valid email!")
        if (registerObj.aadharNo.trim().length !== 12) return setErrorMessage("Please enter correct Aadhaar No")
        if (registerObj.panNo.trim().length !== 10) return setErrorMessage("Please enter correct Pan Card No")
        if (registerObj.state.trim() === "") return setErrorMessage("State is required! (use any value)")
        if (registerObj.district.trim() === "") return setErrorMessage("District is required! (use any value)")
        if (registerObj.postalCode.trim().length !== 6) return setErrorMessage("Please enter correct Postal Code")
        if (role.trim() === "") return setErrorMessage("Role is required! (use any value)")
        // if (registerObj.password.trim() === "") return setErrorMessage("Password is required! (use any value)")
        // if (registerObj.password.length < 8 || registerObj.password.length > 20) return setErrorMessage("Password must be 8 characters and maximum characters length 20!")
        else {
            console.log(registerObj);
            Authuser()
            userProfieleUpdate()
            setLoading(true)
            setLoading(false)
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setRegisterObj({ ...registerObj, [updateType]: value })
    }

    const selectHandler = (event) => {
        setRole(event.target.value)
    }

    // const AadhaarWithOTP = (aadharNo) => {
    //     setLoading(true)
    //     let config = {
    //         url: `${ApiUrl.aadhaarWithOTP}`,
    //         method: 'post',
    //         body: {
    //             id_number: aadharNo
    //         }
    //     };
    //     APIRequest(
    //         config,
    //         res => {
    //             console.log(res);
    //             setaadharOTP('show')
    //             setaadharclient_id(res?.data?.data?.client_id)
    //             toast.success(res?.message)
    //             setLoading(false)
    //         },
    //         err => {
    //             toast.error(err?.message)
    //             setLoading(false)
    //         }
    //     );
    // }

    // const VerifyAadhaarOTP = () => {
    //     setLoading(true)
    //     let config = {
    //         url: `${ApiUrl.verifyAadhaarOTP}`,
    //         method: 'post',
    //         body: {
    //             otp: registerObj.aadharOtp,
    //             client_id: aadharclient_id
    //         }
    //     };
    //     APIRequest(
    //         config,
    //         res => {
    //             console.log(res);
    //             setaadharOTP('verify')
    //             toast.success(res?.message)
    //             setLoading(false)
    //         },
    //         err => {
    //             toast.error(err?.message)
    //             setLoading(false)
    //         }
    //     );
    // }

    const handlePrevious = () => {
        revicedIdRegister(2)
    }

    // useEffect(() => {
    //     if (registerObj.aadharNo.length === 12) {
    //         AadhaarWithOTP(registerObj.aadharNo)
    //     }
    // }, [registerObj.aadharNo])
    // useEffect(() => {
    //     if (registerObj.aadharOtp?.length === 6) {
    //         VerifyAadhaarOTP()
    //     }
    // }, [registerObj.aadharOtp])


    return (
        <div className="bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl mt-4">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro />
                    </div>
                    <div className='py-10 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Contact Information</h2>
                        {/* <form onSubmit={(e) => submitForm(e)}> */}
                        <div className="mb-4">
                            <div className='inputRow'>
                                <InputText defaultValue={registerObj.name} updateType="name" containerStyle="mt-1" labelTitle="Name" updateFormValue={updateFormValue} />
                                <InputText type="number" defaultValue={registerObj.contact} updateType="contact" containerStyle="mt-1" labelTitle="Contact No." updateFormValue={updateFormValue} disabled={'disabled'} />
                            </div>

                            <div className='inputRow'>
                                <InputText defaultValue={registerObj.email} updateType="email" containerStyle="mt-1" labelTitle="Email Id" updateFormValue={updateFormValue} />
                            </div>

                            <div className='inputRow'>
                                <InputText defaultValue={registerObj.state} updateType="state" containerStyle="mt-1" labelTitle="State" updateFormValue={updateFormValue} />
                                <InputText defaultValue={registerObj.district} updateType="district" containerStyle="mt-1" labelTitle="District" updateFormValue={updateFormValue} />
                            </div>
                            <div className='inputRow relative'>
                                <InputText defaultValue={registerObj.aadharNo} updateType="aadharNo" containerStyle="mt-1" labelTitle="Aadhaar No" updateFormValue={updateFormValue} disabled={'disabled'} />
                                <InputText defaultValue={registerObj.panNo} updateType="panNo" containerStyle="mt-1" labelTitle="Pan No" updateFormValue={updateFormValue} />
                            </div>
                            <div className='inputRow'>
                                <select name="role" defaultValue={role} id="role" onChange={selectHandler} className='select-style'>
                                    <option value="">Select role</option>
                                    <option value="cluster">Cluster</option>
                                    <option value="distributor">Distributor</option>
                                    <option value="retailer">Retailer</option>
                                    <option value="franchise">Franchise</option>
                                </select>
                            </div>
                            <div className='inputRow'>
                                {role !== 'cluster' ?
                                    <InputText type="number" defaultValue={registerObj.adminId} updateType="adminId" containerStyle="mt-1" labelTitle={role === 'distributor' ? "Cluster Id" : role === 'retailer' || role === 'franchise' ? 'Distributor Id' : 'Referral Id'} updateFormValue={updateFormValue} />
                                    : null}
                                <InputText type="number" defaultValue={registerObj.postalCode} updateType="postalCode" containerStyle="mt-1" labelTitle="Postal Code" updateFormValue={updateFormValue} />
                            </div>

                            <div className='inputRow mt-3'>
                                <div className="sdfhsd-sdfkdsj-res">
                                    <input type="file" accept="*" onChange={handleFileChange} className="fileProfile-res" />
                                </div>
                            </div>
                        </div>
                        {errorMessage ? <ErrorText styleClass="mt-0">{errorMessage}</ErrorText> : null}
                        {/* <button type="submit" onClick={() => submitForm()} className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Register</button> */}
                        <Stack direction='colunm' align='center' spacing={4}>
                            <Button type='submit' colorScheme='blue' spacing={2} onClick={handlePrevious}>Previous</Button>
                            <Button colorScheme='blue' spacing={2} isLoading={isLoading ? 'isLoading' : ''} loadingText='Loading' onClick={() => submitForm()}>Submit</Button>
                        </Stack>
                        <div className='text-center mt-4'>Already have an account? <Link to="/login"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Login</span></Link></div>
                        {/* </form>  */}
                    </div>
                </div>
            </div>
            {loading ? document.body.classList.add('loading-indicator') : document.body.classList.remove('loading-indicator')}
        </div>
    )
}

export default Register