import React from 'react'
import moment from "moment"
import { useEffect, useState } from "react"
import { ApiUrl, APIRequest } from '../../utils/commanApiUrl';
import TitleCard from "../../components/Cards/TitleCard"
import axios from "axios"
import { Link } from 'react-router-dom';

const MobileRecharge = () => {
    const [users, setUsers] = useState([]);
    const [totalUser, setTotalUser] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setisLoading] = useState(true);
    const records = 10;
    const nPage = Math.ceil(totalUser / records);

    console.log(currentPage)

    // how to covert string to array
    let pageNumber = [];
    for (let i = 1; i <= nPage; i++) {
        pageNumber.push(i)
    }

    // get data from the api
    // const fetchUserData = async () => {
    //     try {
    //         let response = await axios.get(`${ApiUrl.transaction_getRecharge}/${currentPage}`)
    //         let result = await response.data;
    //         const { data, count } = result;
    //         setUsers(data)
    //         setTotalUser(count)
    //     } catch ({ message }) {
    //         alert(message)
    //     }
    // }
    const SendRequest = async () => {
        setisLoading(true)
        let config = {
            url: `${ApiUrl.transaction_getRecharge}/${currentPage}`,
            method: 'get',
        };
        APIRequest(
            config,
            res => {
                console.log(res);
                setUsers(res?.data)
                setTotalUser(res?.count)
                setisLoading(false)
            },
            err => {
                console.log(err);
                setisLoading(false)
            }
        );
    }





    const prePage = () => {
        if (currentPage <= nPage) {
            alert("Record not found !")
        } else {
            setCurrentPage(currentPage - 1)
        }
    }
    const nextPage = () => {
        if (currentPage >= nPage) {
            alert("Record not found !")
        } else {
            setCurrentPage(currentPage + 1)
        }
    }
    const changePage = (id) => {
        setCurrentPage(id)
    }

    useEffect(() => {
        SendRequest()
    }, [currentPage])

    return (
        <>
            <TitleCard title="Recent Transactions" topMargin="mt-2">
                {/* Team Member list in table format loaded constant */}
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

                                users.map((l, k) => {
                                    return (
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
                            <Link to="#" onClick={prePage} class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</Link>
                        </li>
                        {
                            pageNumber.map((n, i) => (
                                <li key={i} className={currentPage === n ? "active" : ""}>
                                    <Link to="#" onClick={() => changePage(n)} class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{n}</Link>
                                </li>
                            ))
                        }

                        <li>
                            <Link to="#" onClick={nextPage} class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</Link>
                        </li>
                    </ul>
                </nav>
            </TitleCard>
        </>
    )
}


export default MobileRecharge



