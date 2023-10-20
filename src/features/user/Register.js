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
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [role, setRole] = useState('');
    const [isLoading, setisLoading] = useState(false)
    const [aadharOTP, setaadharOTP] = useState('')
    const [aadharclient_id, setaadharclient_id] = useState('')
    const [file, setFile] = useState(null);

    const [registerObj, setRegisterObj] = useState({
        name: "",
        email: "",
        contact: mobileNoSave,
        state: '',
        aadharNo: aadhaarObj,
        role: '',
        adminId: '',
        district: '',
        postalCode: '',
    });

    // console.log(registerObj.contact.length)

    // get file path.
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    // get form value
    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setRegisterObj({ ...registerObj, [updateType]: value })
    }

    // select file path
    const selectHandler = (event) => {
        setRole(event.target.value)
    }

    // create user funcation
    const userProfieleUpdate = () => {
        // create formdata 
        let formdata = new FormData();
        formdata.append('name', registerObj.name);
        formdata.append('contact', registerObj.contact);
        formdata.append('email', registerObj.email);
        formdata.append('state', registerObj.state);
        formdata.append('aadharNo', registerObj.aadharNo);
        formdata.append('panNo', registerObj.panNo);
        formdata.append('role', role);
        formdata.append('district', registerObj.district);
        formdata.append('postalCode', registerObj.postalCode);
        formdata.append('image', file);
        formdata.append('adminId', registerObj.adminId);
        setLoading(true)
        setisLoading(true)
        let config = {
            url: ApiUrl.editProfileRes,
            method: 'post',
            body: formdata
        }
        APIRequestWithFile(
            config,
            res => {
                console.log(res, "============== ala")
                if (!res.error) {
                    toast.success(res?.message)
                    setLoading(false)
                    setisLoading(false)
                    navigation('/login')
                } else {
                    toast.error(res?.message)
                    setLoading(false)
                    setisLoading(false)
                }

            },
            err => {
                console.log(err, "================= alm")
                if (err?.data?.error) {
                    toast.error(err?.data?.message)
                }
                setLoading(false)
                setisLoading(false)

            }
        )
    }

    // preview button
    const handlePrevious = () => {
        revicedIdRegister(2)
    }

    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    function validateEmail(email) {
        return emailRegex.test(email);
    }

    const submitForm = (e) => {
        // e.preventDefault()
        // setErrorMessage("")
        // // if (registerObj.name.trim() === "") return setErrorMessage("Name is required! (use any value)")
        // // if (registerObj.contact.trim().length !== 10) return setErrorMessage("Please enter correct Contact No")
        // // if (registerObj.email.trim() === "") return setErrorMessage("Email Id is required! (use any value)")
        // // if (!validateEmail(registerObj.email)) return setErrorMessage("Please enter valid email!")
        // // if (registerObj.aadharNo.trim().length !== 12) return setErrorMessage("Please enter correct Aadhaar No")
        // // if (registerObj.panNo.trim().length !== 10) return setErrorMessage("Please enter correct Pan Card No")
        // // if (registerObj.state.trim() === "") return setErrorMessage("State is required! (use any value)")
        // // if (registerObj.district.trim() === "") return setErrorMessage("District is required! (use any value)")
        // // if (registerObj.postalCode.trim().length !== 6) return setErrorMessage("Please enter correct Postal Code")
        // // if (role.trim() === "") return setErrorMessage("Role is required! (use any value)")
        // // if (registerObj.password.trim() === "") return setErrorMessage("Password is required! (use any value)")
        // // if (registerObj.password.length < 8 || registerObj.password.length > 20) return setErrorMessage("Password must be 8 characters and maximum characters length 20!")
        // else {
        //     userProfieleUpdate()
        // }
        userProfieleUpdate()
    }

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
                                <InputText defaultValue={registerObj.district} updateType="district" containerStyle="mt-1" labelTitle="District (Optional)" updateFormValue={updateFormValue} />
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
                                    <InputText type="number" defaultValue={registerObj.adminId} updateType="adminId" containerStyle="mt-1" labelTitle={role === 'distributor' ? "Cluster Id (Optional)" : role === 'retailer' || role === 'franchise' ? 'Distributor Id (Optional)' : 'Referral Id (Optional)'} updateFormValue={updateFormValue} />
                                    : null}
                                <InputText type="number" defaultValue={registerObj.postalCode} updateType="postalCode" containerStyle="mt-1" labelTitle="Postal Code (Optional)" updateFormValue={updateFormValue} />
                            </div>

                            <div className='inputRow1  mt-3'>
                                <label className='please-choice'>Please choice profile image</label>
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
                            {/* <Button colorScheme='blue' spacing={2} loadingText='Loading' onClick={() => submitForm()}>Submit</Button> */}
                        </Stack>
                        <div className='text-center mt-4'>Already have an account? <Link to="/login"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Login</span></Link></div>
                        {/* </form>  */}
                    </div>
                </div>
            </div>
            {/* {loading ? document.body.classList.add('loading-indicator') : document.body.classList.remove('loading-indicator')} */}
        </div>
    )
}

export default Register