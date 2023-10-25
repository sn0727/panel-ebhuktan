import React from "react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
// import { getLeadsContent } from "./leadSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import { APIRequest, ApiUrl } from "../../utils/commanApiUrl"
import Pagination from "../../components/pagination/Pagination"
import { AiOutlinePlusCircle, AiTwotoneDelete } from "react-icons/ai";

// select box code 
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import jwtDecode from 'jwt-decode';
import AlertDialog from "../../components/Alert"
import { toast } from "react-toastify"
import BasicModal from "../../components/Model/AddMoneyModal"
import AddMoneyModal from "../../components/Model/AddMoneyModal"
import EditAdminIdModal from "../../components/Model/EditAdminIdModal"

import { AiOutlineSearch } from "react-icons/ai"
import { DateByFilter } from "../../components/DateByFilter/DateByFilter"
import moment from "moment"
import { TablePagination } from "@mui/material"
import { Button } from "@mui/material";
// select box code 

const TopSideButtons = ({ children }) => {

    const dispatch = useDispatch()

    var token = localStorage.getItem("token")
    const decodedToken = jwtDecode(token);
    const { role } = decodedToken.user

    const openAddNewLeadModal = () => {
        dispatch(openModal({ title: "Add New", bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW, role: "user" }))
    }

    return (

        <>
            <div className="select-with-ps">
                {/* {children} */}
                {/* <div className="inline-block float-right">
                    <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button>
                </div> */}
            </div>

            <div className="select-with-ps">
                {
                    role === "superAdmin" && (
                        <>
                            {children}
                            {/* <div className="inline-block float-right">
                                <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button>
                            </div> */}
                            {/* <Box sx={{ minWidth: 120 }}>
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
                                        <MenuItem value={"aproved"} onClick={() => setCategory('Aproved')}>Aproved</MenuItem>
                                        <MenuItem value={"Pending"} onClick={() => setCategory('Pending')}>Pending</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box> */}
                        </>
                    )
                }
                {
                    role === "retailer" && (
                        <>
                            {children}
                        </>
                        // <div className="inline-block float-right">
                        //     <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button>
                        // </div>
                        // null
                    )
                }

                {
                    role === "cluster" && (
                        <>
                            {children}
                        </>
                        // <div className="inline-block float-right">
                        //     <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button>
                        // </div>
                        // null
                    )
                }
                {
                    role === "distributor" && (
                        <>
                            {children}
                        </>
                    )
                }
                {
                    role === "franchise" && (
                        <>
                            {children}
                        </>
                    )
                }
            </div>
        </>

    )
}

function ClientUserContent() {

    const [clusterData, setClusterData] = React.useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0)
    const [Check, setCheck] = useState(false);
    const [pageLimit, setPageLimit] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [roleStatus, setRoleStatus] = React.useState('All');
    const [searchOperatorName, setSearchOperatorName] = useState('');

    var token = localStorage.getItem("token")
    const decodedToken = jwtDecode(token);
    const { role } = decodedToken.user;

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

    // pending data get
    const pendingData = clusterData.map((items) => {
        return items;
    });

    // delete record
    const Delete = (id) => {
        const choice = window.confirm(`Are you sure you want to delete user ?`)
        if (choice) {
            setisLoading(true)
            let config = {
                url: `${ApiUrl.superadminDeleteUser}/${id}`,
                method: 'delete',
            };
            APIRequest(
                config,
                res => {
                    console.log(res);
                    filterTransaction()
                    setisLoading(false)
                    toast.success(res.message)
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
            url: ApiUrl.getFilterUsers,
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
            url: ApiUrl.getFilterUsers,
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
    }, [])

    useEffect(() => {
        filterTransaction();
    }, [selectionRange, page, rowsPerPage, roleStatus])


    return (
        <>
            <TitleCard title="User" topMargin="mt-2" TopSideButtons={
                <TopSideButtons
                    clusterData={clusterData}
                >
                    <div className="relative w-52 mt-0 rounded-md shadow-sm">
                        <input
                            onChange={(e) => setSearchOperatorName(e.target.value)}
                            type="text"
                            value={searchOperatorName}
                            name="price"
                            id="price"
                            className="block h-full w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Name / Partner Id"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center" onClick={() => searchOperatorHandler()}>
                            <AiOutlineSearch className="search-icon" />
                        </div>
                    </div>
                    {/* <Box sx={{ minWidth: 120 }}>
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
                    </Box> */}
                    <DateByFilter selectionRange={selectionRange} setSelectionRange={setSelectionRange} setCheck={setCheck} />
                    <Button onClick={clearFun} style={{ backgroundColor: '#2c427d', color: '#fff' }}>Clear</Button>
                </TopSideButtons>
            }>

                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">
                    {clusterData.length > 0 ?
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>SR.NO</th>
                                    <th>Name</th>
                                    <th>Email Id</th>
                                    <th>Contact No.</th>
                                    <th>Address</th>
                                    <td>AadharNo</td>
                                    <td>PanNo</td>
                                    <td>Partner Id</td>
                                    {/* <td>Status</td> */}
                                    {pendingData[0]?.status === "pending" ? null : <td>Amount</td>}
                                    {/* {pendingData[0]?.status === "pending" ? null : <td>Earning</td>} */}
                                    {/* {pendingData[0]?.status === "pending" ? null : <td>Commission</td>} */}
                                    {role === "superAdmin" && <td>Delete</td>}
                                    {role === "superAdmin" && pendingData[0]?.status === "pending" ? null : <td>Add Money</td>}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    clusterData.map((l, k) => {
                                        return (
                                            <tr key={k}>
                                                <td>{(parseInt(page) * parseInt(rowsPerPage) + k) + 1}</td>
                                                {/* <td>{l.id}</td> */}
                                                <td>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={l.image ? l.image : "https://e-bhuktan.s3.eu-north-1.amazonaws.com/image/1692695219537_image.png"} alt="Avatar" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{l.name ? l.name : 'no name'}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{l.email ? l.email : 'no email'}</td>
                                                <td>{l.contact}</td>
                                                <td>
                                                    <div>
                                                        <address>{l.district ? l.district : 'Data no found'}, {l.state ? l?.state : 'Data no found'}, <br></br> {l.postalCode} </address>
                                                    </div>
                                                </td>
                                                <td>{l.aadharNo ? l.aadharNo : 'Data no found'}</td>
                                                <td>{l.panNo ? l?.panNo : 'Data no found'}</td>
                                                <td>{l?.partnerId}</td>
                                                {/* <td>
                                                    {pendingData[0]?.status === "pending" ?
                                                        <div className="badge badge-primary">
                                                            <EditAdminIdModal id={l.id} adminId={l?.adminId} status={l?.status} useDetails={l} Pandinghandler={Pandinghandler} />
                                                        </div> : <div className="badge badge-primary not-allowed-cr">approved</div>}

                                                </td> */}
                                                {pendingData[0]?.status === "pending" ? null : <td> &#8377; {parseFloat(l?.amount).toFixed(2)}</td>}
                                                {/* {pendingData[0]?.status === "pending" ? null : <td> &#8377; {parseFloat(l?.earning).toFixed(2)}</td>} */}
                                                {/* {pendingData[0]?.status === "pending" ? null : <td className="text-center"> {l?.commission ? parseFloat(l?.commission).toFixed(2) : 'No'}</td>} */}
                                                {role === "superAdmin" && <td>
                                                    <div className="mx-3 cursor-pointer" >
                                                        <AiTwotoneDelete fontSize={30} onClick={() => Delete(l.id)} />
                                                    </div>
                                                </td>}
                                                {role === "superAdmin" &&
                                                    pendingData[0]?.status === "pending" ? null :
                                                    <td>
                                                        <div className="mx-3 cursor-pointer" >
                                                            <AddMoneyModal id={l.id} />
                                                        </div>
                                                    </td>}
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

                {/* <Pagination /> */}
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

export default ClientUserContent
