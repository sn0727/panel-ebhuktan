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
    const [statsData, setCount] = useState([]);
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [category, setCategory] = useState('');
    const [categoryType, setCategoryType] = useState([]);

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
    }, [currentPage, category]);



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

            <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                    <InputLabel id="demo-select-small-label">Choice Category</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={category}
                        label="Choice Category"
                        onChange={handleChange}
                    >
                        <MenuItem value="None">
                            <em>None</em>
                        </MenuItem>

                        {
                            categoryType.map(({ type }) => (
                                <MenuItem value={type}>{type}</MenuItem>
                            ))
                        }

                    </Select>
                </FormControl>

                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Consume Id</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Image</th>
                                <th>Invoice No</th>
                                <th>Admin Pin Code</th>
                                <th className="text-center">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(({ id, consumerId, amount, type, image, invoiceNo, adminPinCode, createdAt }, k) => {
                                    return (
                                        <tr key={k}>
                                            <td className="text-center">{id}</td>
                                            <td className="text-center">{consumerId}</td>
                                            <td className="text-center">{amount}</td>
                                            <td className="text-center">{type}</td>
                                            <td className="text-center">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">

                                                        <img src={image ? image : "https://e-bhuktan.s3.eu-north-1.amazonaws.com/image/1692695219537_image.png"} alt="Avatar" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center">{invoiceNo}</td>
                                            <td className="text-center">{adminPinCode}</td>
                                            <td className="text-center">{moment(createdAt).utc().format("MM/DD/YYYY hh:mm a")}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <nav aria-label="Page navigation example text-right" className="navigation example">
                    <nav aria-label="Page navigation example text-right" className="navigation example">
                        <Pagination apiRoute={ApiUrl.transactionAll} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </nav>
                </nav>
            </TitleCard>
            {/* all transaction table show in the dashboard */}
        </>
    )
}

export default Dashboard