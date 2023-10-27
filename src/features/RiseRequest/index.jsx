import React from "react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../../features/common/modalSlice"
import { getLeadsContent } from "../../features/cluster/leadSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import { APIRequest, ApiUrl } from "../../utils/commanApiUrl"
import Pagination from "../../components/pagination/Pagination"
import jwtDecode from 'jwt-decode';
import AddMoneyModal from "../../components/Model/AddMoneyModal"
// select box code 
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AiOutlineSearch, AiTwotoneDelete } from "react-icons/ai"
import { FaArrowCircleRight } from "react-icons/fa";
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import EditAdminIdModal from "../../components/Model/EditAdminIdModal"
import EditProfileModal from "../../components/Model/EditProfileModal"
import { DateByFilter } from "../../components/DateByFilter/DateByFilter"
import moment from "moment"
import { TablePagination } from "@mui/material"
import { Button } from "@mui/material";
import { elements } from "chart.js"
import { BsFileEarmarkImage } from "react-icons/bs"
import RiseRequestStatusModal from "../../components/Model/RiseRequestStatusModal"
// import CgProfile from "react-icons/cg"
// select box code 

const TopSideButtons = ({ children, createRoleName, filterTransaction }) => {

    const dispatch = useDispatch()

    var token = sessionStorage.getItem("token")
    const decodedToken = jwtDecode(token);
    const { role } = decodedToken.user;

    // console.log(filterTransaction, "================= alam")

    // console.log(testName, "testName=========================================")
    const abc = (name) => {
        // let abcd = "hello";
        console.log(name)
    }
    // select box funtion
    const openAddNewLeadModal = () => {
        dispatch(openModal({
            title: "Add New", bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW, createRoleName: createRoleName
        }))
        // console.log(data, "obj -=======================")
    }

    return (

        <>
            <div className="select-with-ps">
                {
                    role === "superAdmin" && (
                        <>
                            {children}
                            <div className="inline-block float-right">
                                <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button>
                            </div>
                        </>
                    )
                }
                {
                    role === "distributor" && (
                        <>
                            {children}
                            <div className="inline-block float-right">
                                <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button>
                            </div>
                        </>
                    )
                }
                {
                    role === "subAdmin" && (
                        <>
                            {children}
                            <div className="inline-block float-right">
                                <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button>
                            </div>
                        </>
                    )
                }
            </div>
        </>

    )
}


function RiseRequest({ getFilterCluster, pagetableName, getPageLimit, riseRequestDelete, createRoleName, testName }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [clusterData, setClusterData] = React.useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0)
    const [Check, setCheck] = useState(false);
    const [pageLimit, setPageLimit] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [roleStatus, setRoleStatus] = React.useState('All');
    const [searchOperatorName, setSearchOperatorName] = useState('');

    // live search filter
    const filteredItems = clusterData.filter((user) =>
        user?.partnerId?.toLowerCase().includes(searchOperatorName?.toLowerCase())
    );

    // live search and highlight text 
    function getHighlightedText(text, highlight) {
        // Split text on highlight term, include term itself into parts, ignore case
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

        // console.log(parts, "parts= ====================")
        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <b key={index} style={{ color: '#2c427d' }}>{part}</b>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    }

    var token = sessionStorage.getItem("token")
    const decodedToken = jwtDecode(token);
    const { role } = decodedToken.user

    // date selection value
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    // select status example : pending / abroved / all
    const handleChange = (event) => {
        setRoleStatus(event.target.value);
    };

    // set page number
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // set page row number
    const handleChangeRowsPerPage = (event) => {
        // setRowsPerPage(+event.target.value);
        // setPage(1);
        // setRowsPerPage(+event.target.value);
        setRowsPerPage(event.target.value);
        // setPage(1);
    };

    // delete recorded
    const RiseRequestDelete = (id) => {
        const choice = window.confirm(`Are you sure you want to delete Request ?`)
        if (choice) {
            setisLoading(true)
            let config = {
                url: `${riseRequestDelete}/${id}`,
                method: 'delete',
            };
            APIRequest(
                config,
                res => {
                    console.log(res);
                    // Pandinghandler()
                    filterTransaction()
                    setisLoading(false)
                },
                err => {
                    console.log(err);
                    setisLoading(false)
                }
            );
        }
    }

    // get page per page record
    const getPageLimitFun = () => {
        let config = {
            url: getPageLimit,
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

    // filter date
    const filterTransaction = () => {
        setisLoading(true)
        let body;
        if (Check) {
            body = {
                page: page + 1,
                limit: rowsPerPage,
                status: roleStatus ? roleStatus : 'All',
                data: searchOperatorName,
                startDate: moment(selectionRange.startDate).format('YYYY-MM-DD'),
                endDate: moment(selectionRange.endDate).format('YYYY-MM-DD'),

            }
        } else {
            body = {
                page: page + 1,
                limit: rowsPerPage,
                status: roleStatus ? roleStatus : 'All',
                data: searchOperatorName,
                startDate: null,
                endDate: null,

            }
        }
        const config = {
            url: getFilterCluster,
            method: 'post',
            body: body
        };

        APIRequest(
            config,
            (res) => {
                console.log(res, "res =================== ddd");
                setClusterData(res?.data)
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
                status: roleStatus ? roleStatus : 'All',
                data: searchOperatorName,
                startDate: moment(selectionRange.startDate).format('YYYY-MM-DD'),
                endDate: moment(selectionRange.endDate).format('YYYY-MM-DD'),

            }
        } else {
            body = {
                page: page + 1,
                limit: rowsPerPage,
                status: roleStatus ? roleStatus : 'All',
                data: searchOperatorName,
                startDate: null,
                endDate: null,

            }
        }
        const config = {
            url: getFilterCluster,
            method: 'post',
            body: body
        };

        APIRequest(
            config,
            (res) => {
                console.log(res, "res =================== ddd");
                setClusterData(res?.data)
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
        setRowsPerPage(25)
        setPage(0)
        setRoleStatus('All')
        setSearchOperatorName('')
        setCheck(false)
    }

    useEffect(() => {
        getPageLimitFun()
        filterTransaction()
    }, [])

    useEffect(() => {
        filterTransaction();
    }, [selectionRange, page, rowsPerPage, roleStatus])


    return (
        <>

            <TitleCard title={pagetableName} topMargin="mt-2" TopSideButtons={
                <TopSideButtons
                    clusterData={clusterData}
                    createRoleName={createRoleName}
                    filterTransaction={filterTransaction}
                >
                    <div className="relative w-52 mt-0 rounded-md shadow-sm">
                        <input
                            onChange={(e) => setSearchOperatorName(e.target.value)}
                            type="text"
                            value={searchOperatorName}
                            name="price"
                            id="price"
                            className="block h-full w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Name / Partner id"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center" onClick={() => searchOperatorHandler()}>
                            <AiOutlineSearch className="search-icon" />
                        </div>
                    </div>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={roleStatus}
                                label="Status"
                                size="small"
                                onChange={handleChange}
                            >
                                <MenuItem value={"All"} >All</MenuItem>
                                <MenuItem value={"approved"} >Aproved</MenuItem>
                                <MenuItem value={"pending"} >Pending</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <DateByFilter selectionRange={selectionRange} setSelectionRange={setSelectionRange} setCheck={setCheck} />
                    <Button onClick={clearFun} style={{ backgroundColor: '#2c427d', color: '#fff' }}>Clear</Button>
                </TopSideButtons>
            }
            >


                {/* Leads List in table format loaded from slice after api call */}
                {/* { isLoading && <div className="error-page">
                    <img src="/assets/image/404Error.jpg" alt="404Error" />
                    <Button style={{ backgroundColor: '#2c427d', color: '#fff', textAlign: 'center' }}>Reload Page</Button>
                </div>} */}
                <div className="overflow-x-auto w-full">
                    {filteredItems.length > 0 ?
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>SR.NO</th>
                                    <th>Document Image</th>
                                    <td>Partner Id</td>
                                    <th>Transaction Id</th>
                                    <td className="text-left">Status</td>
                                    <td className="text-center">Amount</td>
                                    <td className="text-center">Date</td>
                                    <td className="text-center">Delete</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredItems.map((l, k) => {
                                        return (
                                            <tr key={k}>
                                                {/* <td className="text-left">{l.id}</td> */}
                                                <td className="text-left">{(parseInt(page) * parseInt(rowsPerPage) + k) + 1}</td>
                                                <td className="text-left">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                {
                                                                    l.image ? <img src={l.image} alt="Avatar" /> : <img src="/assets/image/profile.jpg" alt="Avatar" />
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-left">{getHighlightedText(l?.partnerId, searchOperatorName)}</td>
                                                <td className="text-left">{l?.transactionId}</td>

                                                <td className="text-center">
                                                    <div className="badge badge-primary">
                                                        {
                                                            roleStatus === "All" || roleStatus === "approved" ? l?.status : null
                                                        }
                                                        {
                                                            roleStatus === "pending" &&
                                                            <RiseRequestStatusModal id={l?.id} status={l?.status} filterTransaction={filterTransaction} />
                                                        }
                                                    </div>
                                                </td>

                                                <td className="text-center">{l?.amount}</td>
                                                <td className="text-center">{moment(l?.modifiedCreatedAt).format('DD/MM/YYYY')}</td>
                                                
                                                {/* if role is superAdmin be will show delete feild else hide  */}
                                                {
                                                    role === "superAdmin" &&
                                                    <td className="text-center">
                                                        <div className="mx-3 cursor-pointer" style={{display: 'flex', justifyContent: 'center'}}>
                                                            <AiTwotoneDelete fontSize={30} onClick={() => RiseRequestDelete(l?.id)} />
                                                        </div>
                                                    </td>
                                                }
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        :
                        <div className="error-page">
                            <img src="/assets/image/404Error.jpg" alt="404Error" />
                            <Button onClick={() => clearFun()} style={{ backgroundColor: '#2c427d', color: '#fff', textAlign: 'center' }}>Reload Page</Button>
                        </div>
                    }
                </div>
                {filteredItems.length > 0 && <TablePagination
                    rowsPerPageOptions={pageLimit.map((item) => item.limit)}
                    component="div"
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />}
            </TitleCard>
            {isLoading ? document.body.classList.add('loading-indicator') : document.body.classList.remove('loading-indicator')}

        </>
    )
}


export default RiseRequest