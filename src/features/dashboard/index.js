import moment from "moment"
import React, { useEffect, useState } from 'react'
import DashboardStats from './components/DashboardStats'
import AmountStats from './components/AmountStats'
import PageStats from './components/PageStats'

import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon'
import UserChannels from './components/UserChannels'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import { showNotification } from '../common/headerSlice'
import DoughnutChart from './components/DoughnutChart'
import { APIRequest, ApiUrl } from '../../utils/commanApiUrl'

// THIS IS CODE ALL TANSACTION TABLE CODE
import TitleCard from "../../components/Cards/TitleCard";
import Pagination from "../../components/pagination/Pagination";
import DynamicTitle from "../../components/dynamic_title";
import SelectBox from "../../components/Input/SelectBox";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ReactPaginate from 'react-paginate';
// THIS IS CODE ALL TANSACTION TABLE CODE

// const statsData = [
//     { title: "New Users", value: "34.7k", icon: <UserGroupIcon className='w-8 h-8' />, description: "↗︎ 2300 (22%)" },
//     { title: "Total Sales", value: "$34,545", icon: <CreditCardIcon className='w-8 h-8' />, description: "Current month" },
//     { title: "Pending Leads", value: "450", icon: <CircleStackIcon className='w-8 h-8' />, description: "50 in hot leads" },
//     { title: "Active Users", value: "5.6k", icon: <UsersIcon className='w-8 h-8' />, description: "↙ 300 (18%)" },
// ]



function Dashboard() {
    const dispatch = useDispatch()
    const [isLoading, setisLoading] = useState(true);
    const [statsData, setCount] = useState('');
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pageCount, setPageCount] = useState(1)

    const updateDashboardPeriod = (newRange) => {
        // Dashboard range changed, write code to refresh your values
        dispatch(showNotification({ message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status: 1 }))
    }


    const SendRequest = async () => {
        setisLoading(true)
        let config = {
            url: ApiUrl.superadminGetCount,
            method: 'get',
        };
        APIRequest(
            config,
            res => {
                console.log(res);
                setCount(
                    [
                        { title: "All Users", value: res?.userCount, icon: <UserGroupIcon className='w-8 h-8' />, description: "↗︎ 2300 (22%)" },
                        { title: "All Cluster", value: res?.clusterCount, icon: <CreditCardIcon className='w-8 h-8' />, description: "Current month" },
                        { title: "All distributor", value: res?.distributorCount, icon: <CircleStackIcon className='w-8 h-8' />, description: "50 in hot leads" },
                        { title: "All Retailer", value: res?.retailerCount, icon: <UsersIcon className='w-8 h-8' />, description: "↙ 300 (18%)" },
                    ]
                )
                setisLoading(false)
            },
            err => {
                console.log(err);
                setisLoading(false)
            }
        );
    }

    // THIS IS CODE ALL TRANSATION TABLE
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * 10) % pageCount;
        // console.log(event.selected)
        // setItemOffset(newOffset);
        setCurrentPage(event.selected)
    };

    // get data from the api
    const SendRequestAllTransaction = async () => {
        setisLoading(true)
        let config = {
            url: `${ApiUrl.transactionAll}/${currentPage}`,
            method: 'get',
        };
        APIRequest(
            config,
            res => {
                console.log(res);
                setUsers(res.data)
                setisLoading(false)
            },
            err => {
                console.log(err);
                setisLoading(false)
            }
        );
    }
    // THIS IS CODE ALL TRANSATION TABLE

    useEffect(() => {
        SendRequest()
        SendRequestAllTransaction()
    }, []);



    return (
        <>
            {/** ---------------------- Select Period Content ------------------------- */}
            <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} />

            {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    !isLoading ?
                        statsData.map((d, k) => {
                            return (
                                <DashboardStats key={k} {...d} colorIndex={k} />
                            )
                        })
                        : null
                }
            </div>



            {/** ---------------------- Different charts ------------------------- */}
            {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <LineChart />
                <BarChart />
            </div> */}

            {/** ---------------------- Different stats content 2 ------------------------- */}

            {/* <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
                <AmountStats />
                <PageStats />
            </div> */}

            {/** ---------------------- User source channels table  ------------------------- */}

            {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <UserChannels />
                <DoughnutChart />
            </div> */}


            {/* all transaction table show in the dashboard */}
            {/* <SelectBox labelTitle="sd" labelDescription="des " placeholder="pla" options={[{ name: "dd", value: "dsd" }, 'sd', "sdfF"]} /> */}
            <DynamicTitle pageTitle={"Transaction"} />
            <TitleCard title="All Recent Transactions" topMargin="mt-2">

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

                <nav aria-label="Page navigation example text-right" className="navigation example">
                    <span className="text-sm text-gray-700 dark:text-gray-400">
                        Showing <span className="font-semibold text-gray-900 dark:text-white">1</span> to <span className="font-semibold text-gray-900 dark:text-white">10</span> of <span className="font-semibold text-gray-900 dark:text-white">22</span> Entries
                    </span>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={1}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                        containerClassName={"inline-flex -space-x-px text-sm"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"active"}
                    />
                </nav>
                <Pagination apiRoute={ApiUrl.transactionAllUserList} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </TitleCard>
            {/* all transaction table show in the dashboard */}
        </>
    )
}

export default Dashboard