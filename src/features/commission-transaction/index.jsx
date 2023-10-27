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
import { useDispatch } from 'react-redux'
import { showNotification } from '../common/headerSlice'
import jwtDecode from 'jwt-decode';
import DashboardStatsTwo from "../dashboard/components/DashboardStatsTwo";
import { FaRupeeSign } from "react-icons/fa"
import TablePagination from '@mui/material/TablePagination';
import { Button } from "@mui/material";
import { DateByFilter } from "../../components/DateByFilter/DateByFilter";
import { AiOutlineSearch } from 'react-icons/ai'

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
    const [searchOperatorName, setSearchOperatorName] = useState('');
    const [searchPartnerId, setSearchPartnerId] = useState('');
    const [pageLimit, setPageLimit] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    // i am getting authantication role
    var token = sessionStorage.getItem("token")
    const decodedToken = jwtDecode(token);
    const { role } = decodedToken.user;

    console.log(role, "================== sdfsd")

    // show commision amount table.
    const SendRequest02 = () => {
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
        // setRowsPerPage(+event.target.value);
        setRowsPerPage(event.target.value);
        // setPage(1);
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

    // search filter Operator Name
    const searchOperatorHandler = () => {
        setisLoading(true)
        let body;
        if (Check) {
            body = {
                page: page + 1,
                limit: rowsPerPage,
                type: category ? category : 'All',
                operatorName: searchOperatorName,
                startDate: moment(selectionRange.startDate).format('YYYY-MM-DD'),
                endDate: moment(selectionRange.endDate).format('YYYY-MM-DD'),

            }
        } else {
            body = {
                page: page + 1,
                limit: rowsPerPage,
                operatorName: searchOperatorName,
                type: category ? category : 'All',
                startDate: null,
                endDate: null,

            }
        }
        const config = {
            url: ApiUrl.getFilterTransaction,
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
    }

    // search filer with partner id
    const searchPartnerIdHandler = () => {
        setisLoading(true)
        let body;
        if (Check) {
            body = {
                page: page + 1,
                limit: rowsPerPage,
                type: category ? category : 'All',
                consumerId: searchPartnerId,
                startDate: moment(selectionRange.startDate).format('YYYY-MM-DD'),
                endDate: moment(selectionRange.endDate).format('YYYY-MM-DD'),

            }
        } else {
            body = {
                page: page + 1,
                limit: rowsPerPage,
                consumerId: searchPartnerId,
                type: category ? category : 'All',
                startDate: null,
                endDate: null,

            }
        }
        const config = {
            url: ApiUrl.getFilterTransaction,
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
    }

    // CLEAR filter funcation
    const clearFun = () => {
        setSelectionRange({
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        })
        // setCategoryType([])
        setCategory('')
        setRowsPerPage(25)
        setPage(0)
        setSearchOperatorName('')
        setSearchPartnerId('')
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
                                <DashboardStatsTwo key={k} {...d} colorIndex={k} />
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
                    <div className="relative w-52 mt-0 rounded-md shadow-sm">
                        <input
                            onChange={(e) => setSearchOperatorName(e.target.value)}
                            type="text"
                            value={searchOperatorName}
                            name="price"
                            id="price"
                            className="block w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Operator Name"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center" onClick={() => searchOperatorHandler()}>
                            <AiOutlineSearch className="search-icon" />
                        </div>
                    </div>
                    <div className="relative w-40 mt-0 rounded-md shadow-sm">
                        <input
                            onChange={(e) => setSearchPartnerId(e.target.value)}
                            type="text"
                            value={searchPartnerId}
                            name="price"
                            id="price"
                            className="block w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Partner id"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center" onClick={() => searchPartnerIdHandler()}>
                            <AiOutlineSearch className="search-icon" />
                        </div>
                    </div>
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
                                    <th>Id</th>
                                    <th>Transaction Id</th>
                                    <th>Operator Id</th>
                                    <th>Partner Id</th>
                                    <th className="text-center">Operator Name</th>
                                    {/* <th>Image</th> */}
                                    <th className="text-center">Type</th>
                                    <th>Pin Code</th>
                                    {users[0]['clusterAmount'] ? <th>Cluster Amount</th> : null}
                                    {users[0]['retailerAmount'] ? <th>Retailer Amount</th> : null}
                                    {users[0]['franchiseAmount'] ? <th>Franchise Amount</th> : null}
                                    {users[0]['distributorAmount'] ? <th>Distributor Amount</th> : null}
                                    {users[0]['adminAmount'] ? <th>Admin Amount</th> : null}
                                    <th className="text-center">Date and time</th>
                                    {role === "superAdmin" && <th className="text-right">Total Amount</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users?.map(({ id, transactionId, amount, operatorId, userImage, operatorName, consumerId, adminPinCode, clusterAmount, retailerAmount, distributorAmount, adminAmount, type, modifiedCreatedAt, franchiseAmount }, k) => {
                                        return (
                                            <tr key={k}>
                                                <td className="text-center">{(parseInt(page) * parseInt(rowsPerPage) + k) + 1}</td>
                                                <td className="text-center">{id}</td>
                                                <td className="text-center">{transactionId}</td>
                                                <td className="text-center">{operatorId}</td>
                                                <td className="text-center">{consumerId}</td>
                                                <td className="text-center">{operatorName?.slice(0, 20)} </td>
                                                {/* <td className="text-center">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            {userImage ? <img src={userImage} alt="Avatar" /> : "Not"}
                                                        </div>
                                                    </div>
                                                </td> */}
                                                <td className="text-center">{type}</td>
                                                <td className="text-center">{adminPinCode}</td>
                                                {users[0]['clusterAmount'] ? <td className="text-center">&#8377; {clusterAmount}</td> : null}
                                                {users[0]['retailerAmount'] ? <td className="text-center">&#8377; {retailerAmount}</td> : null}
                                                {users[0]['franchiseAmount'] ? <td className="text-center">&#8377; {franchiseAmount}</td> : null}
                                                {users[0]['distributorAmount'] ? <td className="text-center">&#8377; {distributorAmount}</td> : null}
                                                {users[0]['adminAmount'] ? <td className="text-center">&#8377; {adminAmount}</td> : null}
                                                <td className="text-center">{moment(modifiedCreatedAt).utc().format("MM/DD/YYYY, hh:mm A")}</td>
                                                {role === "superAdmin" && <td className="text-right"> &#8377; {parseFloat(amount).toFixed(2)}</td>}
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
