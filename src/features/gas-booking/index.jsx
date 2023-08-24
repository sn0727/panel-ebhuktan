import moment from "moment"
import { useEffect, useState } from "react"
// import { useDispatch, useSelecmobiler } from "react-redux"
// import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import { ApiUrl } from "../../utils/commanApiUrl";
import axios from "axios";

function GasBooking(){

    const [transactions, setTransaction] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalUser, setTotalUser] = useState("")
    const recordsPerPage = 10;
    const nPages = Math.ceil(totalUser / recordsPerPage);

    // create page array
    let pageOfNumber = []
    for (let index = 1; index < nPages; index++) {
        pageOfNumber.push(index)
    }

    // data fetch from the api
    const fetchTransaction = async () => {
        try {

            const res = await axios.get(`${ApiUrl.transaction_getLPGGas}/${currentPage}`);
            // const res = await axios.get(ApiUrl.superadminGetAllUsers);
            const result = await res.data;
            const { error, message, data, count } = result
            if (!error) {
                // alert(message)
                setTotalUser(count)
                setTransaction(data)
            } else {
                alert(message)
            }
        } catch ({error, message}) {
            alert(message)
        }
    }
    
    // paginatin code 
    function prePage() {
        if (currentPage <= 1) {
            alert("Record is not found!")
        } else {
            setCurrentPage(currentPage - 1)
        }
    }

    function changePage(id) {
        setCurrentPage(id)
    }

    function nextPage() {
        if (currentPage >= nPages) {
            alert("Record is not found!")
        } else {
            setCurrentPage(currentPage + 1)
        }
    }

    useEffect(()=> {
        fetchTransaction()
    }, [currentPage])

    return(
        <>
            
            <TitleCard title="Recent Transactions" topMargin="mt-2">

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Consumer Id</th>
                        <th>Image</th>
                        <th>Date</th>
                        <th>Invoice No.</th>
                        <th>Type</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                        {

                            
                            transactions.map((l, k) => {
                                return(
                                    <tr key={k}>
                                        <td>{l.consumerId}</td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-circle w-12 h-12">
                                                        <img src={l.image} alt="Avatar" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{moment(l.date).format("D MMM")}</td>
                                        <td>{l.invoiceNo}</td>
                                        <td>{l.type}</td>
                                        <td>{l.amount}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            {/* <Pagination /> */}
            <nav aria-label="Page navigation example text-right" className="navigation example">
                    <span class="text-sm text-gray-700 dark:text-gray-400">
                        Showing <span class="font-semibold text-gray-900 dark:text-white">1</span> to <span class="font-semibold text-gray-900 dark:text-white">10</span> of <span class="font-semibold text-gray-900 dark:text-white">{totalUser}</span> Entries
                    </span>
                    <ul class="inline-flex -space-x-px text-sm">
                        <li>
                            <a href="#" onClick={prePage} class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                        </li>
                        {
                            pageOfNumber.map((n, i) => (
                                <li key={i} className={`${currentPage === n ? "active" : ""}`}>
                                    <a href="#" onClick={() => changePage(n)} class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{n}</a>
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


export default GasBooking
