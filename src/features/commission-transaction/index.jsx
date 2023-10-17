import moment from "moment"
import { useEffect, useState } from "react"
// import { useDispatch, useSelecmobiler } from "react-redux"
// import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import Pagination from "../../components/pagination/Pagination";
import { APIRequest, ApiUrl } from '../../utils/commanApiUrl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DashboardTopBar from "../dashboard/components/DashboardTopBar";
import { useDispatch } from 'react-redux'
import { showNotification } from '../common/headerSlice'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon'
import jwtDecode from 'jwt-decode';
import DashboardStats from "../dashboard/components/DashboardStats";
import { FaRupeeSign } from "react-icons/fa"
import TablePagination from '@mui/material/TablePagination';
import { Button } from "@mui/material";
import { DateByFilter } from "../../components/DateByFilter/DateByFilter";

function CommissionTransactionContent() {
    const dispatch = useDispatch()
    const [statsData, setCount] = useState([]);
    const [users, setUsers] = useState([])
    const [isLoading, setisLoading] = useState(true);
    const [category, setCategory] = useState('');
    const [categoryType, setCategoryType] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [Check, setCheck] = useState(false);
    const [pageLimit, setPageLimit] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    // i am getting authantication role
    var token = localStorage.getItem("token")
    const decodedToken = jwtDecode(token);
    const { role } = decodedToken.user

    // show commision amount table.
    const SendRequest02 = async () => {
        setisLoading(true)
        let config = {
            url: ApiUrl.TotalCommissionTransaction,
            method: 'get',
        };
        APIRequest(
            config,
            res => {
                if (role === "superAdmin") {
                    setCount(
                        [
                            { title: "Total Commission", value: res?.totalCommission?.totalCommission, icon: <FaRupeeSign className='w-6 h-6' />, description: "" },
                            { title: "Admin Commission", value: res?.totalCommission?.adminCommission, icon: <FaRupeeSign className='w-6 h-6' />, description: "" },
                            { title: "Cluster Commission", value: res?.totalCommission?.clusterCommission, icon: <FaRupeeSign className='w-6 h-6' />, description: "" },
                            { title: "Distributor Commission", value: res?.totalCommission?.distributorCommission, icon: <FaRupeeSign className='w-6 h-6' />, description: "" },
                            { title: "Franchise Commission", value: res?.totalCommission?.franchiseCommission, icon: <FaRupeeSign className='w-6 h-6' />, description: "" },
                            { title: "Retailer Commission", value: res?.totalCommission?.retailerCommission, icon: <FaRupeeSign className='w-6 h-6' />, description: "" },
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

    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    // set category in the select box
    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    // get page per page record
    const getPageLimitFun = () => {
        let config = {
            url: ApiUrl.getPageLimit,
            method: 'get'
        }
        APIRequest(
            config,
            res => {
                setPageLimit(res?.limit)
            },
            err => {
                console.log(err)
            }
        )
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(1);
    };

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
                setCategoryType(res?.data)
                setisLoading(false)
            },
            err => {
                console.log(err);
                setisLoading(false)
            }
        );
    }

    // filter data 
    const filterTransaction = () => {
        setisLoading(true)
        let body;
        if (Check) {
            body = {
                page: page + 1,
                limit: rowsPerPage,
                type: category ? category : 'All',
                startDate: moment(selectionRange.startDate).format('YYYY-MM-DD'),
                endDate: moment(selectionRange.endDate).format('YYYY-MM-DD'),

            }
        } else {
            body = {
                page: page + 1,
                limit: rowsPerPage,
                type: category ? category : 'All',
                startDate: null,
                endDate: null,

            }
        }
        const config = {
            url: ApiUrl.getFilterCommissionTranc,
            method: 'post',
            body: body
        };

        APIRequest(
            config,
            (res) => {
                console.log(res, "res =================== ddd");
                setUsers(res?.data)
                setTotalAmount(res?.total)
                setTotalCount(res?.count)
                setisLoading(false)
            },
            (err) => {
                console.log(err, "================== erro");
                setisLoading(false)
            }
        );

    };

    // CLEAR filter funcation
    const clearFun = () => {
        setSelectionRange({
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        })
        // setCategoryType([])
        setCategory('')
        setCheck(false)
    }

    useEffect(() => {
        SendRequestGetType()
        SendRequest02()
        getPageLimitFun()
    }, [])

    useEffect(() => {
        filterTransaction();
    }, [selectionRange, category, rowsPerPage, page])


    const updateDashboardPeriod = (newRange) => {
        // Dashboard range changed, write code to refresh your values
        dispatch(showNotification({ message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status: 1 }))
    }

    return (
        <>
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
            {/* total amout section */}
            <div className="total-amount mt-5">
                <div>total : {`${parseFloat(totalAmount).toFixed(2)}`}</div>
                <div>count : {`${parseFloat(totalCount)}`}</div>
            </div>

            {/* Team Member list in table format loaded constant */}
            <TitleCard title="Commission Transactions" topMargin="mt-2">
                <div className="date-by-filter">
                    <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                        <InputLabel id="demo-select-small-label">Choice Category</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={category}
                            label="Choice Category"
                            onChange={handleChange}
                        >
                            {
                                categoryType.map(({ type }) => (
                                    <MenuItem value={type}>{type}</MenuItem>
                                ))
                            }

                        </Select>
                    </FormControl>
                    <DateByFilter selectionRange={selectionRange} setSelectionRange={setSelectionRange} setCheck={setCheck} />
                    <Button onClick={clearFun} style={{ backgroundColor: '#2c427d', color: '#fff' }}>Clear</Button>
                </div>
                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    {users.length > 0 ?

                        <table className="table w-full">
                            <thead>
                                <tr>
                                    {/* <th>Sr.No</th> */}
                                    <th>Sr.No</th>
                                    <th>Transaction Id</th>
                                    <th>Amount</th>
                                    <th>Operator Id</th>
                                    <th>Partner Id</th>
                                    <th>Pin Code</th>
                                    {users[0]['clusterAmount'] ? <th>Cluster Amount</th> : null}
                                    {users[0]['retailerAmount'] ? <th>Retailer Amount</th> : null}
                                    {users[0]['franchiseAmount'] ? <th>Franchise Amount</th> : null}
                                    {users[0]['distributorAmount'] ? <th>Distributor Amount</th> : null}
                                    {users[0]['adminAmount'] ? <th>Admin Amount</th> : null}
                                    <th className="text-center">Type</th>
                                    <th className="text-center">Date and time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map(({transactionId, amount, operatorId, consumerId, adminPinCode, clusterAmount, retailerAmount, distributorAmount, adminAmount, type, modifiedCreatedAt, franchiseAmount }, k) => {
                                        return (
                                            <tr key={k}>
                                                <td className="text-center">{(parseInt(page) * parseInt(rowsPerPage) + k) + 1}</td>
                                                <td className="text-center">{transactionId}</td>
                                                <td className="text-center"> &#8377; {parseFloat(amount).toFixed(2)}</td>
                                                <td className="text-center">{operatorId}</td>
                                                <td className="text-center">{consumerId}</td>
                                                <td className="text-center">{adminPinCode}</td>
                                                {users[0]['clusterAmount'] ? <td className="text-center">{clusterAmount}</td> : null}
                                                {users[0]['retailerAmount'] ? <td className="text-center">{retailerAmount}</td> : null}
                                                {users[0]['franchiseAmount'] ? <td className="text-center">{franchiseAmount}</td> : null}
                                                {users[0]['distributorAmount'] ? <td className="text-center">{distributorAmount}</td> : null}
                                                {users[0]['adminAmount'] ? <td className="text-center">{adminAmount}</td> : null}
                                                <td className="text-center">{type}</td>
                                                <td className="text-center">{moment(modifiedCreatedAt).utc().format("MM/DD/YYYY, hh:mm a")}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        :
                        <div className="w-100">
                            <h3 className="text-center w-100 p-5 text-xl">Data Not found!</h3>
                        </div>
                    }
                </div>

                <TablePagination
                    rowsPerPageOptions={pageLimit.map((item) => item.limit)}
                    component="div"
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TitleCard>
            {isLoading ? document.body.classList.add('loading-indicator') : document.body.classList.remove('loading-indicator')}

        </>
    )
}


export default CommissionTransactionContent
