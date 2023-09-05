import React from 'react'
import { useEffect, useState } from "react"
import { ApiUrl, APIRequest } from "../../utils/commanApiUrl"
import ReactPaginate from 'react-paginate';
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";

const Pagination = (props) => {

    const { setCurrentPage, totalCount, setTotalCount } = props;
    const [isLoading, setisLoading] = useState(true);

    // console.log(totalCount)

    // pagination code 
    const [count, setCount] = useState(totalCount);
    const itemsPerPage = 10;
    const pageCount = Math.ceil(count / itemsPerPage);
    // pagination code 

    // console.log(count)
    // get data from the api
    // const SendRequest = async () => {
    //     let config = {
    //         url: `${apiRoute}`,
    //         method: 'post',
    //         body: {
    //             page: currentPage,
    //             type : category
    //         }
    //     };
    //     APIRequest(
    //         config,
    //         res => {
    //             console.log(res, "typesdfd");
    //             setCount(res.count)
    //             setisLoading(false)
    //         },
    //         err => {
    //             console.log(err);
    //             setisLoading(false)
    //         }
    //     );
    // }

    const handlePageClick = (event) => {
        setCurrentPage((event.selected) + 1);
        setTotalCount((event.selected) + 1);
    };

    // useEffect(() => {
    //     SendRequest()
    // }, [currentPage, totalCount, category])

    return (
        <>
            {/* <Pagination /> */}
            {count > 9 ? <span class="text-sm text-gray-700 dark:text-gray-400">
                Showing <span class="font-semibold text-gray-900 dark:text-white">1</span> to <span class="font-semibold text-gray-900 dark:text-white">10</span> of <span class="font-semibold text-gray-900 dark:text-white">{count}</span> Entries
            </span> : null}
            {count > 9 ? <div className="pagination-perent">
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
            </div> : null}
        </>
    )
}

export default Pagination