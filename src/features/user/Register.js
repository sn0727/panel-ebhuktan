import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import { APIRequest, APIRequestWithFile, ApiUrl } from '../../utils/commanApiUrl'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Button, Stack } from '@chakra-ui/react'
import InputTextOptional from '../../components/Input/InputTextOptional'
import {
    AadhaarNoValidation,
    PanNoValidation,
    emailValidation,
    mobileNoValidation,
    nameValidation,
    postalCodeValidation,
    stateValidation
} from '../../components/Validation'
import InputTextUpperCase from '../../components/Input/InputTextUpperCase'

function Register({ revicedIdRegister, mobileNoSave, aadhaarObj }) {
    const navigation = useNavigate();
    const [loading, setLoading] = useState(false)
    const [stateData, setStateData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("")
    const [role, setRole] = useState('');
    const [stateValue, setStateValue] = useState('');
    const [isLoading, setisLoading] = useState(false)
    const [file, setFile] = useState(null);

    const [registerObj, setRegisterObj] = useState({
        name: "",
        email: "",
        contact: mobileNoSave,
        aadharNo: aadhaarObj,
        panNo: '',
        role: '',
        adminId: '',
        district: '',
        postalCode: '',
    });

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

    // select state value 
    const stateHandler = (event) => {
        setStateValue(event.target.value)
    }

    // select file path
    const selectHandler = (event) => {
        setRole(event.target.value)
    }

    // create user funcation
    const registrationFun = () => {
        if (
            nameValidation(registerObj.name) && mobileNoValidation(registerObj.contact) &&
            emailValidation(registerObj.email) &&
            postalCodeValidation(registerObj.postalCode) &&
            stateValidation(stateValue) &&
            AadhaarNoValidation(registerObj.aadharNo)
        ) {
            // create formdata 
            let formdata = new FormData();
            formdata.append('name', registerObj.name);
            formdata.append('contact', registerObj.contact);
            formdata.append('email', registerObj.email);
            formdata.append('state', stateValue);
            formdata.append('aadharNo', registerObj.aadharNo);
            formdata.append('panNo', registerObj.panNo.toUpperCase());
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


    }

    // get state from the api
    const stateGetFun = () => {
        let config = {
            url: ApiUrl.electricityGetState,
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
                                <InputText defaultValue={registerObj.name} placeholder={'Name'} updateType="name" containerStyle="mt-1" labelTitle="Name" updateFormValue={updateFormValue} />
                                <InputText type="number" placeholder={'Mobile no'} defaultValue={registerObj.contact} updateType="contact" containerStyle="mt-1" labelTitle="Contact No." updateFormValue={updateFormValue} disabled={'disabled'} />
                            </div>

                            <div className='inputRow'>
                                <InputText defaultValue={registerObj.email} placeholder={'Email id'} updateType="email" containerStyle="mt-1" labelTitle="Email Id" updateFormValue={updateFormValue} />
                                <InputText type="number" placeholder={'Postal code'} defaultValue={registerObj.postalCode} updateType="postalCode" containerStyle="mt-1" labelTitle="Postal Code (Optional)" updateFormValue={updateFormValue} />
                            </div>

                            <div className='inputRow'>
                                {/* <InputText defaultValue={registerObj.state} updateType="state" containerStyle="mt-1" labelTitle="State" updateFormValue={updateFormValue} /> */}
                                <div className='sdkjfsdfsd-dsfsdk'>
                                    <label className='sdfdsbkdsf-sdfdsk'>Select State</label>
                                    <select name="role" onChange={stateHandler} className='select-style mt-0'>
                                        <option value="">Select State</option>
                                        {
                                            stateData.map((items, index) => (
                                                <option key={index} value={items.statename}>{items.statename}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <InputTextOptional placeholder={'District'} defaultValue={registerObj.district} updateType="district" containerStyle="mt-1" labelTitle="District (Optional)" updateFormValue={updateFormValue} />
                            </div>
                            <div className='inputRow relative'>
                                <InputText placeholder={'Aadhaar no'} defaultValue={registerObj.aadharNo} updateType="aadharNo" containerStyle="mt-1" labelTitle="Aadhaar No" updateFormValue={updateFormValue} disabled={'disabled'} />
                                <InputTextUpperCase placeholder={'Pan no'} defaultValue={registerObj.panNo} updateType="panNo" containerStyle="mt-1" labelTitle="Pan No" updateFormValue={updateFormValue} />
                            </div>
                            <div className='inputRow'>

                            </div>
                            <div className='inputRow'>
                                {/* {role !== 'cluster' ?
                                    <InputTextOptional type="text" defaultValue={registerObj.adminId} updateType="adminId" containerStyle="mt-1" labelTitle={role === 'distributor' ? "Cluster Id (Optional)" : role === 'retailer' || role === 'franchise' ? 'Distributor Id (Optional)' : 'Referral Id (Optional)'} updateFormValue={updateFormValue} />
                                    : null} */}


                                <InputTextOptional type="text" placeholder={'Referral Id'} defaultValue={registerObj.adminId} updateType="adminId" containerStyle="mt-1" labelTitle={role === 'cluster' ? "Sub Admin Id (Optional)" : role === 'distributor' ? "Cluster Id (Optional)" : role === 'retailer' || role === 'franchise' ? 'Distributor Id (Optional)' : 'Referral Id (Optional)'} updateFormValue={updateFormValue} />

                                <div className='sdkjfsdfsd-dsfsdk'>
                                    <label className='sdfdsbkdsf-sdfdsk'>Select role</label>
                                    <select name="role" defaultValue={role} id="role" onChange={selectHandler} className='select-style mt-0'>
                                        <option value="">Select role</option>
                                        <option value="cluster">Cluster</option>
                                        <option value="distributor">Distributor</option>
                                        <option value="retailer">Retailer</option>
                                        <option value="franchise">Franchise</option>
                                    </select>
                                </div>
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
                            <Button type='submit' colorScheme='blue' spacing={2} onClick={() => revicedIdRegister(2)} style={{ backgroundColor: '#2c427d', color: '#fff' }}>Previous</Button>
                            <Button colorScheme='blue' spacing={2} isLoading={isLoading ? 'isLoading' : ''} loadingText='Loading' onClick={() => registrationFun()} style={{ backgroundColor: '#2c427d', color: '#fff' }}>Submit</Button>
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