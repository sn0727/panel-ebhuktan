import React from 'react'
import { useEffect, useState } from "react"
import { ApiUrl, APIRequest } from "../../utils/commanApiUrl"
import ReactPaginate from 'react-paginate';
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";

const Pagination = (props) => {

    const { apiRoute, currentPage, setCurrentPage } = props;
    const [isLoading, setisLoading] = useState(true);

    // console.log(apiRoute)

    // pagination code 
    const [count, setCount] = useState("");
    const itemsPerPage = 10;
    const pageCount = Math.ceil(count / itemsPerPage);
    // pagination code 

    console.log(pageCount)
    // get data from the api
    const SendRequest = async () => {
        let config = {
            url: `${apiRoute}/${currentPage}`,
            method: 'get',
        };
        APIRequest(
            config,
            res => {
                console.log(res);
                setCount(res.count)
                setisLoading(false)
            },
            err => {
                console.log(err);
                setisLoading(false)
            }
        );
    }

    const handlePageClick = (event) => {
        setCurrentPage((event.selected) + 1);
    };

    useEffect(() => {
        SendRequest()
    }, [currentPage])

    return (
        <>
            {/* <Pagination /> */}
            <span class="text-sm text-gray-700 dark:text-gray-400">
                Showing <span class="font-semibold text-gray-900 dark:text-white">1</span> to <span class="font-semibold text-gray-900 dark:text-white">10</span> of <span class="font-semibold text-gray-900 dark:text-white">{count}</span> Entries
            </span>
            <div className="pagination-perent">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel={<BiChevronRight />}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel={<BiChevronLeft />}
                    renderOnZeroPageCount={null}
                    breakClassName="pagination 1"
                />
            </div>
        </>
    )
}

export default Pagination