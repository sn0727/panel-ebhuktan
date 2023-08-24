import { useState } from "react"
import { ApiUrl } from '../../../utils/commanApiUrl';
import axios from "axios";


function AddLeadModalBody({ closeModal }) {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [postCode, setPostCode] = useState("")
    const [addharcard, setAddharCard] = useState("")
    const [pancard, setPanCard] = useState("")
    const [state, setState] = useState("")
    const [district, setDistrict] = useState("")

    // console.log(addharcard)
    // console.log(pancard)


    const submitHandler = async (e) => {
        e.preventDefault();


        var formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('contact', contact);
        formData.append('postalCode', postCode);
        formData.append('state', state);
        formData.append('district', district);
        formData.append('aadharCard', addharcard);
        formData.append('panCard', pancard);
        
        axios({
            method: "post",
            url: ApiUrl.clusterPostList,
            data: formData,
            headers: {
                'Content-Type': `multipart/form-data`,
            }
        }).then((response) => {
            if(response.data.error) {
                alert(response.data.message)
            }else {
                alert(response.data.message)
            }
        }).catch((error) => {
            console.log(error);
        })
        
        closeModal()
    }


    return (
        <>
            <form className="w-full max-w-lg" method="post" onSubmit={submitHandler}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Name
                        </label>
                        <input 

                            onChange={(e)=>setName(e.target.value)}
                            value={name}
                            name="name"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                            id="grid-first-name" 
                            type="text" placeholder="Jane" />
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Email
                        </label>
                        <input 
                             onChange={(e)=>setEmail(e.target.value)}
                             value={email}
                             name="email"
                        
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Email" />
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Contact
                        </label>
                        <input 
                             onChange={(e)=>setContact(e.target.value)}
                             value={contact}
                             name="number"
                        
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="enter number" />
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                            Post Code
                        </label>
                        <input 
                            onChange={(e)=>setPostCode(e.target.value)}
                            value={postCode}
                            name="number"
                        className="mb-3 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" 
                        type="number" placeholder={90210} />
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                            State
                        </label>
                        <div className="relative">
                            <select 

                            onChange={(e)=>setState(e.target.value)}
                            value={state}
                            className="mb-3 block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option>New Mexico</option>
                                <option>Missouri</option>
                                <option>Texas</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                            District
                        </label>
                        <div className="relative">
                            <select 

                                onChange={(e)=>setDistrict(e.target.value)}
                                value={district}
                            
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option>New Mexico</option>
                                <option>Missouri</option>
                                <option>Texas</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Pan Card file Upload
                        </label>
                        <input 
                             onChange={(e)=>setPanCard(e.target.files[0])}
                             defaultValue={pancard}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                            type="file" accept="image/*" placeholder="Upload file" 
                            />
                    </div>

                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Addhar Card file Upload
                        </label>
                        <input 
                             onChange={(e)=>setAddharCard(e.target.files[0])}
                             defaultValue={addharcard}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                            type="file" accept="image/*" placeholder="Upload file" />
                    </div>
                    <button type="submit" class="my-4  mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add Cluster
                    </button>
                </div>
            </form>


        </>
    )
}

export default AddLeadModalBody