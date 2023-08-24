import React from 'react'
import { useEffect, useState } from "react"
import { ApiUrl } from "../../utils/commanApiUrl"
import axios from "axios";

const Pagination = (props) => {

    const {apiRoute, currentPage , setCurrentPage} = props;

    // const [currentPage, setCurrentPage] = useState(1);
    const [totalUser, setTotalUser] = useState("")
    const recordsPerPage = 10;
    const nPages = Math.ceil(totalUser / recordsPerPage);


    // set array inside nPage
    const pageOfNumber = [];
    for (let i = 1; i <= nPages; i++) {
        pageOfNumber.push(i)
    }
    

    const fetchTransaction = async () => {
        
        try {
            const response = await axios.get(`${apiRoute}/${currentPage}`);
            const result = await response.data;
            const { count } = result
            // setTransaction(data)
            setTotalUser(count)
        } catch ({ message }) {
            alert(message)
        }
    }

    const prePage = () => {
        if (currentPage <= 1) {
            alert("Records not founds !")
        } else {
            setCurrentPage(currentPage - 1)
        }
    }
    const nextPage = () => {
        if (currentPage >= nPages) {
            alert("Records not founds !")
        } else {
            setCurrentPage(currentPage + 1)
        }
    }
    const changePage = (id) => {
        setCurrentPage(id)
    }


    useEffect(() => {
        fetchTransaction()
    }, [currentPage])

    return (
        <>
            {/* <Pagination /> */}
            <nav aria-label="Page navigation example text-right" className="navigation example">
                <span className="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">1</span> to <span className="font-semibold text-gray-900 dark:text-white">10</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalUser}</span> Entries
                </span>
                <ul className="inline-flex -space-x-px text-sm">
                    <li>
                        <a href="#" onClick={prePage} className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                    </li>
                    {
                        pageOfNumber.map((n, i) => (
                            <li key={i} className={`${currentPage === n ? "active" : ""}`}>
                                <a href="#" onClick={() => changePage(n)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{n}</a>
                            </li>
                        ))
                    }

                    <li>
                        <a href="#" onClick={nextPage} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Pagination