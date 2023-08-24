import moment from "moment"
import { useEffect, useState } from "react"
import { ApiUrl } from "../../utils/commanApiUrl"
// import { useDispatch, useSelecmobiler } from "react-redux"
// import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Pagination from "../../components/pagination"
import axios from "axios"

function ClientUserContent() {

    const [transactions, setTransaction] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    // const [count, setCount] = useState("")
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = transactions.slice(firstIndex, lastIndex);
    const nPages = Math.ceil(transactions.length / recordsPerPage);

    const numbers = [...Array(nPages + 1).keys()].slice(1);
    console.log(firstIndex)


    // const nextbuttonhandler = () => {
    //     setPageCounter(count => count + 1);
    // };

    // const prebuttonhandler = () => {
    //     if (pagecounter > 1) {
    //         setPageCounter(count => count - 1);

    //     } else {
    //         setPageCounter(1)
    //     }
    // };

    const fetchTransaction = async () => {
        try {

            // const res = await axios.get(`${ApiUrl.superadminGetUsers}/${1}`);
            const res = await axios.get(ApiUrl.superadminGetAllUsers);
            const result = await res.data;
            const { error, message, data, count } = result
            // setCount(count)
            if (!error) {
                // alert(message)
                setTransaction(data)
            } else {
                alert(message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // paginatin code 
    function prePage (){
        if(currentPage !== firstIndex) {
            setCurrentPage(currentPage - 1)
        }
    }
    
    function changePage(id) {
        setCurrentPage(id)
    }
    
    function nextPage () {
        if(currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1)
        }
    }


    useEffect(() => {
        fetchTransaction()
    }, [])

    return (
        <>
            <TitleCard title="Recent Transactions" topMargin="mt-2">

                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Consumer Id</th>
                                <th>Email</th>
                                <th>Contact No</th>
                                <th>Pin Code</th>
                                <th>DOB</th>
                                <th>Address</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {


                            records.map((l, k) => {
                                    // data formate 


                                    return (
                                        <tr key={k}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-circle w-12 h-12">
                                                            <img src={l.image === "" ? "/intro.png" : l.image} alt="Avatar" />
                                                        </div>
                                                    </div>
                                                    <div><div class="font-bold">{l.name !== "" ? l.name : "Mohd Alam"}</div></div>
                                                </div>
                                            </td>
                                            <td>{l.id}</td>
                                            <td>{l.email !== null ? l.email : "alam.sndigitech@gmail.com"}</td>
                                            <td>{l.contact}</td>
                                            <td>{l.pincode}</td>
                                            <td>

                                                {l.dob}



                                            </td>
                                            <td>{l.address !== "" ? l.address : "Noida sector - 62 (U.P)"}</td>
                                            <td>{l.amount}</td>

                                            {/* <td>{moment(l.date).format("D MMM")}</td>
                                        <td>{l.invoiceNo}</td>
                                        <td>{l.type}</td>
                                        <td>{l.amount}</td> */}
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>

                {/* <Pagination /> */}

                {/* <div>
                    <button type="button" className="btn btn-primary" onClick={prebuttonhandler}>Previous</button>
                    <span className="px-4">
                        {pagecounter}    
                        </span>
                    <button type="button" className="btn btn-primary" onClick={nextbuttonhandler}>Next</button>
                </div> */}

                <nav aria-label="Page navigation example text-right" style={{ textAlign: 'right', marginTop: 40 }}>
                    <ul class="inline-flex -space-x-px text-sm">
                        <li>
                            <a href="#" onClick={prePage} class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                        </li>
                        {
                            numbers.map((n, i) => (
                                <li key={i} className={`${currentPage === n ? "active" : ""}`}>
                                    <a href="#" onClick={()=>changePage(n)} class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{n}</a>
                                </li>
                            ))
                        }

                        <li>
                            <a href="#" onClick={nextPage} class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                        </li>
                    </ul>
                </nav>


            </TitleCard>
        </>
    )
}

export default ClientUserContent
