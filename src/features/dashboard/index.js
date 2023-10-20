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
import jwtDecode from 'jwt-decode';
import Transactions from "../transactions"
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
    const [statsData, setCount] = useState([]);
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [category, setCategory] = useState('');
    const [categoryType, setCategoryType] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0)
    const [totalCount, setTotalCount] = useState(0)

    // i am getting authantication role
    var token = localStorage?.getItem("token")
    const decodedToken = jwtDecode(token);
    const { role } = decodedToken?.user;

    console.log(role, "=ddfffffffffff role")

    const updateDashboardPeriod = (newRange) => {
        // Dashboard range changed, write code to refresh your values
        dispatch(showNotification({ message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status: 1 }))
    }

    // type dropdown
    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const SendRequest = async () => {
        setisLoading(true)
        let config = {
            url: ApiUrl.superadminGetCount,
            method: 'get',
        };
        APIRequest(
            config,
            res => {
                console.log(res, "================= dfsdfd fren");

                if (role === "superAdmin") {
                    setCount(
                        [
                            { title: "All Cluster", value: res?.clusterCount, icon: <CreditCardIcon className='w-8 h-8' />, description: "" },
                            { title: "All distributor", value: res?.distributorCount, icon: <CircleStackIcon className='w-8 h-8' />, description: "" },
                            { title: "All Retailer", value: res?.retailerCount, icon: <UsersIcon className='w-8 h-8' />, description: "" },
                            { title: "All Franchise", value: res?.franchiseCount, icon: <UserGroupIcon className='w-8 h-8' />, description: "" },
                        ]
                    )
                } else if (role === "cluster") {
                    setCount(
                        [
                            { title: "All distributor", value: res?.distributorCount, icon: <CircleStackIcon className='w-8 h-8' />, description: "" },
                            { title: "All Retailer", value: res?.retailerCount, icon: <UsersIcon className='w-8 h-8' />, description: "" },
                        ]
                    )
                } else if (role === "distributor") {
                    setCount(
                        [
                            { title: "All Retailer", value: res?.retailerCount, icon: <UsersIcon className='w-8 h-8' />, description: "" },
                            { title: "All Franchise", value: res?.franchiseCount, icon: <UserGroupIcon className='w-8 h-8' />, description: "" },
                        ]
                    )
                } else if (role === "retailer") {
                    setCount(
                        [
                            { title: "All Users", value: res?.userCount, icon: <UserGroupIcon className='w-8 h-8' />, description: "" },
                        ]
                    )
                }else if (role === "subAdmin") {
                    setCount(
                        [
                            { title: "All Cluster", value: res?.clusterCount, icon: <CreditCardIcon className='w-8 h-8' />, description: "" },
                            { title: "All distributor", value: res?.distributorCount, icon: <CircleStackIcon className='w-8 h-8' />, description: "" },
                            { title: "All Retailer", value: res?.retailerCount, icon: <UsersIcon className='w-8 h-8' />, description: "" },
                            { title: "All Franchise", value: res?.franchiseCount, icon: <UserGroupIcon className='w-8 h-8' />, description: "" },
                        ]
                    )
                }


                setisLoading(false)
            },
            err => {
                console.log(err);
                setisLoading(false)
            }
        );
    }

    // get data from the api
    const SendRequestAll = async () => {
        setisLoading(true)
        let config = {
            url: `${ApiUrl.transactionAll}`,
            method: 'post',
            body: {
                page: currentPage,
                type: category
            }
        };
        APIRequest(
            config,
            res => {
                console.log(res, "this is cate api");
                setTotalCount(res.count)
                setTotalAmount(res.total)
                setUsers(res.data)
                setisLoading(false)
            },
            err => {
                console.log(err);
                setisLoading(false)
            }
        );
    }
    // get type from the api
    const SendRequestGetType = async () => {
        setisLoading(true)
        let config = {
            url: `${ApiUrl.transaction_getType}`,
            method: 'get',
        };
        APIRequest(
            config,
            res => {
                console.log(res);
                setCategoryType(res.data)
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
        SendRequestAll();
        SendRequestGetType();
        // SendRequestAllTransaction()
    }, [currentPage, category, totalCount]);



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
            <div className="mt-4"></div>
            {role !== "subAdmin" ?  <Transactions /> : null }
        </>
    )
}

export default Dashboard