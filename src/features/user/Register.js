import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import { ApiUrl } from '../../utils/commanApiUrl'
import axios from 'axios'

function Register() {

    const INITIAL_REGISTER_OBJ = {
        name: "",
        password: "",
        email: "",
        contact: '',
        state: '',
        aadharNo: '',
        panNo: '',
        role: '',
        adminId: '',
        district: '',
        postalCode: '',

    }

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);
    const [role, setRole] = useState('');
    const Authuser = async () => {
        // var formData = new FormData();
        // formData.append('name', registerObj.name)
        // formData.append('password', registerObj.password)
        // formData.append('email', registerObj.email)
        // formData.append('contact', registerObj.contact)
        // formData.append('state', registerObj.state)
        // formData.append('aadharNo', registerObj.aadharNo)
        // formData.append('panNo', registerObj.panNo)
        // formData.append('role', role)
        // formData.append('adminId', registerObj.adminId)
        // formData.append('district', registerObj.district)
        // formData.append('postalCode', registerObj.postalCode)


        try {
            const result = await axios.post(ApiUrl.createUser,
                {
                    name: registerObj.name,
                    password: registerObj.password,
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
            const { error, message } = result.data

            if (error) {
                alert(message)
            } else {
                alert(message)
                window.location.href = '/login'
            }

        } catch (error) {
            console.log(error.response.data)
        }


    }

    const submitForm = (e) => {
        e.preventDefault()
        setErrorMessage("")

        if (registerObj.name.trim() === "") return setErrorMessage("Name is required! (use any value)")
        if (registerObj.email.trim() === "") return setErrorMessage("Email Id is required! (use any value)")
        if (registerObj.password.trim() === "") return setErrorMessage("Password is required! (use any value)")
        if (registerObj.panNo.trim() === "") return setErrorMessage("Pan No is required! (use any value)")
        if (registerObj.aadharNo.trim() === "") return setErrorMessage("Aadhar No is required! (use any value)")
        if (registerObj.aadharNo.trim().length !== 12) return setErrorMessage("Please enter correct Aadhaar No")
        if (registerObj.state.trim() === "") return setErrorMessage("State is required! (use any value)")
        if (registerObj.contact.trim() === "") return setErrorMessage("Contact is required! (use any value)")
        if (registerObj.postalCode.trim() === "") return setErrorMessage("Postal Code is required! (use any value)")
        if (registerObj.postalCode.trim().length !== 6) return setErrorMessage("Please enter correct Postal Code")
        if (registerObj.district.trim() === "") return setErrorMessage("District is required! (use any value)")
        if (registerObj.adminId.trim() === "") return setErrorMessage("Admin Id is required! (use any value)")
        if (role.trim() === "") return setErrorMessage("Role is required! (use any value)")
        else {
            console.log(registerObj);
            Authuser()
            setLoading(true)
            // Call API to check user credentials and save token in localstorage
            // localStorage.setItem("token", "DumyTokenHere")
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


    // name: Rizwan
    // contact:9891798071
    // email:povem52105 @gienig.com
    // state: delhi
    // aadharNo: 1234123412341234
    // panNo: DSRFGAU123H
    // password: 123456789
    // role: retailer
    // adminId: 108
    // district: Delhi
    // postalCode: 110094

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro />
                    </div>
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Register</h2>
                        <form onSubmit={(e) => submitForm(e)}>
                            <div className="mb-4">
                                <div className='inputRow'>
                                    <InputText defaultValue={registerObj.name} updateType="name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue} />
                                    <InputText defaultValue={registerObj.contact} updateType="contact" containerStyle="mt-4" labelTitle="Contact No." updateFormValue={updateFormValue} />
                                </div>
                                <InputText defaultValue={registerObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue} />
                                <div className='inputRow'>
                                    <InputText defaultValue={registerObj.aadharNo} updateType="aadharNo" containerStyle="mt-4" labelTitle="Aadhaar No." updateFormValue={updateFormValue} />
                                    <InputText defaultValue={registerObj.panNo} updateType="panNo" containerStyle="mt-4" labelTitle="Pan No" updateFormValue={updateFormValue} />
                                </div>
                                <div className='inputRow'>
                                    <InputText defaultValue={registerObj.state} updateType="state" containerStyle="mt-4" labelTitle="State" updateFormValue={updateFormValue} />
                                    <InputText defaultValue={registerObj.district} updateType="district" containerStyle="mt-4" labelTitle="District" updateFormValue={updateFormValue} />
                                </div>
                                <div className='inputRow'>
                                    <InputText defaultValue={registerObj.adminId} updateType="adminId" containerStyle="mt-4" labelTitle="Admin Id" updateFormValue={updateFormValue} />
                                    <InputText defaultValue={registerObj.postalCode} updateType="postalCode" containerStyle="mt-4" labelTitle="Postal Code" updateFormValue={updateFormValue} />
                                </div>
                                <div className='inputRow'>
                                    <select name="role" defaultValue={role} id="role" onChange={selectHandler} className='select-style'>
                                        <option value="cluster">Cluster</option>
                                        <option value="distributor">Distributor</option>
                                        <option value="retailer">Retailer</option>
                                    </select>
                                </div>
                                <div className='inputRow'>
                                    {/* <InputText defaultValue={registerObj.role} updateType="role" containerStyle="mt-4" labelTitle="Role" updateFormValue={updateFormValue} /> */}
                                    <InputText defaultValue={registerObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />
                                </div>
                            </div>

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Register</button>

                            <div className='text-center mt-4'>Already have an account? <Link to="/login"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Login</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register