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
import { FaArrowCircleRight, FaDownload } from "react-icons/fa";
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
// import CgProfile from "react-icons/cg"
// select box code 

const TopSideButtons = ({ children, createRoleName, filterTransaction }) => {

    const dispatch = useDispatch()

    var token = sessionStorage.getItem("token")
    const decodedToken = jwtDecode(token);
    const { role } = decodedToken.user;

    console.log(role, "================= alam")

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
                    role === "subAdmin" && (
                        <>
                            {children}
                            <div className="inline-block float-right">
                                <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button>
                            </div>
                        </>
                    )
                }
                {
                    role === "cluster" && (
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

            </div>
        </>

    )
}


function UserRoleTable({ getFilterCluster, pagetableName, getPageLimit, superadminDeleteUser, createRoleName, testName }) {
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
    const [downloadPdfFile, setDownloadFile] = useState('');

    // live search filter
    const filteredItems = clusterData.filter((user) =>
        user.name.toLowerCase().includes(searchOperatorName.toLowerCase()) ||
        user.partnerId.toLowerCase().includes(searchOperatorName.toLowerCase())
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

    // send user role anthoer compents
    // console.log(createRoleName, "======================== u")
    // createRoleName(createRoleName)

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

    // delete recorded
    const Delete = (id) => {
        const choice = window.confirm(`Are you sure you want to delete user ?`)
        if (choice) {
            setisLoading(true)
            let config = {
                url: `${superadminDeleteUser}/${id}`,
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

    // dwonload pdf file funcation
    const downloadFile = (partnerId) => {
        setisLoading(true)
        let config = {
            url: `${ApiUrl?.getCertificate}/${partnerId}`,
            method: 'get'
        }
        APIRequest(
            config,
            res => {
                window.open(res?.data, '_blank');
                setisLoading(false)
            },
            err => {
                if (err?.error) {
                    toast.success(err?.message)
                }
                setisLoading(false)
            }
        )
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
                                    <th>Name</th>
                                    <td>Partner Id</td>
                                    <th>Email Id</th>
                                    <th>Contact No.</th>
                                    <th>Address</th>
                                    <td>Aadhaar No</td>
                                    <td>Pan No</td>

                                    {/* if role is cluster, retailer, franchise, subAdmin be will show status field else hide */}
                                    {role === "cluster" || role === "distributor" || role === "retailer" || role === "franchise" || role === "subAdmin" ? <td className="text-center">Status</td> : null}
                                    {role === "superAdmin" && <td className="text-center">Status</td>}

                                    {/* if roleStatus is All, approved be will show amount field else hide */}
                                    {
                                        roleStatus === "All" || roleStatus === "approved" ? <td className="text-center">Amount</td> : null
                                    }

                                    {/* if roleStatus is All, approved be will show Earning field else hide */}
                                    {/* {
                                        roleStatus === "All" || roleStatus === "approved" ? <td className="text-center">Earning</td> : null
                                    } */}

                                    {/* if roleStatus is All, approved be will show Commission field else hide */}
                                    {
                                        roleStatus === "All" || roleStatus === "approved" ? <td className="text-center">Commission</td> : null
                                    }

                                    {/* if role is superAdmin be will show Delete field else hide */}
                                    {role === "superAdmin" && <td className="text-center">Delete</td>}

                                    {/* if role is superAdmin be will show Add Money field else hide */}
                                    {role === "superAdmin" ? roleStatus === "All" || roleStatus === "approved" ? <td className="text-center">Add Money</td> : null : null}

                                    {/* if role is superAdmin be will show Edit Profile field else hide */}
                                    {
                                        role === "superAdmin" ? roleStatus === "All" || roleStatus === "approved" ? <td className="text-center">Edit Profile</td> : null : null
                                    }
                                    {/* {
                                        roleStatus === "All" || roleStatus === "approved" ? <td className="text-center">View Details</td> : null
                                    } */}
                                    {
                                        (role === "superAdmin") ? (roleStatus === "All" || roleStatus === "approved") ? <td className="text-center">Download</td> : null : null
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredItems?.map((l, k) => {
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
                                                        <div>
                                                            <div className="font-bold">{getHighlightedText(l?.name, searchOperatorName)}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-left">{getHighlightedText(l?.partnerId, searchOperatorName)}</td>
                                                <td className="text-left">{l.email}</td>
                                                <td className="text-left">{l.contact}</td>
                                                <td className="text-left">
                                                    {/* <address>{`${l.address} ${l.district} ${<br></br>} ${l.state} ${l.postalCode}`} </address> */}
                                                    <address style={{maxWidth: '250px', overflowX: 'auto'}}>{`${l.address} ${l.district}`} <br /> {`${l.state} ${l.postalCode}`} </address>
                                                </td>
                                                <td className="text-left">{l.aadharNo}</td>
                                                <td className="text-left">{l.panNo ? l.panNo : 'not available'}</td>

                                                {/* if role is cluster, retailer, franchise, subAdmin be will show status field else hide */}
                                                {role === "cluster" || role === "distributor" || role === "retailer" || role === "franchise" || role === "subAdmin" ? <td className="text-center"><div className="badge badge-primary">{l?.status}</div></td> : null}
                                                {role === "superAdmin" && <td className="text-center">
                                                    <div className="badge badge-primary">
                                                        {
                                                            roleStatus === "All" || roleStatus === "approved" ? l?.status : null
                                                        }
                                                        {
                                                            roleStatus === "pending" &&
                                                            <EditAdminIdModal id={l.id} adminId={l?.adminId} status={l?.status} filterTransaction={filterTransaction} />
                                                        }
                                                    </div>
                                                </td>}

                                                {/* if roleStatus is All, approved be will show amount field else hide */}
                                                {
                                                    roleStatus === "All" && l?.status === 'pending' || roleStatus === "All" && l?.status === 'rejected' ? <td className="text-center">&#10067;</td> : null
                                                }
                                                {
                                                    roleStatus === "All" && l?.status === 'approved' || roleStatus === "approved" && l?.status === 'approved' ? <td className="text-center"> &#8377; {parseFloat(l?.amount).toFixed(2)}</td> : null
                                                }

                                                {/* if roleStatus is All, approved be will show earning field else hide */}
                                                {/* {
                                                    roleStatus === "All" && l?.status === 'pending' || roleStatus === "All" && l?.status === 'rejected' ? <td className="text-center">&#10067;</td> : null
                                                }
                                                {
                                                    roleStatus === "All" && l?.status === 'approved' || roleStatus === "approved" && l?.status === "approved" ? <td className="text-center"> &#8377; {parseFloat(l?.earning).toFixed(2)}</td> : null
                                                } */}

                                                {/* if roleStatus is All, approved be will show commission field else hide */}
                                                {
                                                    roleStatus === "All" && l?.status === 'pending' || roleStatus === "All" && l?.status === 'rejected' ? <td className="text-center">&#10067;</td> : null
                                                }
                                                {
                                                    roleStatus === "All" && l?.status === 'approved' || roleStatus === "approved" && l?.status === "approved" ? <td className="text-center"> &#8377; {parseFloat(l?.commission).toFixed(2)}</td> : null
                                                }

                                                {/* if role is superAdmin be will show delete feild else hide  */}
                                                {
                                                    role === "superAdmin" &&
                                                    <td className="text-center">
                                                        <div className="mx-3 cursor-pointer" >
                                                            <AiTwotoneDelete fontSize={30} onClick={() => Delete(l.id)} />
                                                        </div>
                                                    </td>
                                                }

                                                {/* if role is superAdmin be will show AddMoneyModal feild else hide  */}
                                                {role === "superAdmin" ? roleStatus === "All" && l?.status === 'pending' || roleStatus === "All" && l?.status === 'rejected' ? <td className="text-center">&#10067;</td> : null : null}
                                                {
                                                    role === "superAdmin" ? roleStatus === "All" && l?.status === 'approved' || roleStatus === "approved" && l?.status === "approved" ?
                                                        <td className="text-center">
                                                            <div className="mx-3 text-center cursor-pointer" >
                                                                <AddMoneyModal id={l.id} />
                                                            </div>
                                                        </td>
                                                        : null : null
                                                }
                                                {/* if role is superAdmin be will show EditProfileModal else hide  */}
                                                {role === "superAdmin" ? roleStatus === "All" && l?.status === 'pending' || roleStatus === "All" && l?.status === 'rejected' ? <td className="text-center">&#10067;</td> : null : null}
                                                {
                                                    role === "superAdmin" ? roleStatus === "All" && l?.status === 'approved' || roleStatus === "approved" && l?.status === "approved" ?
                                                        <td>
                                                            <div className="mx-3 text-center cursor-pointer" >
                                                                <EditProfileModal id={l.id} profileData={l} filterTransaction={filterTransaction} />
                                                            </div>
                                                        </td>
                                                        : null : null
                                                }

                                                {/* if role is superAdmin be will show EditProfileModal else hide  */}
                                                {/* {roleStatus === "All" && l?.status === 'pending' || roleStatus === "All" && l?.status === 'rejected' ? <td className="text-center">&#10067;</td> : null}
                                                {
                                                    roleStatus === "All" && l?.status === 'approved' || roleStatus === "approved" && l?.status === "approved" ?
                                                        <td className="text-center">
                                                            <div className="mx-3 text-center cursor-pointer">
                                                                <FaArrowCircleRight className="m-auto" fontSize={28} id={l.id} onClick={() => navigate('/app/commission', { state: { id: l.id } })} />
                                                            </div>
                                                        </td>
                                                        : null
                                                } */}
                                                {role === "superAdmin" ? roleStatus === "All" && l?.status === 'pending' || roleStatus === "All" && l?.status === 'rejected' ? <td className="text-center">&#10067;</td> : null : null}
                                                {
                                                    (role === "superAdmin") ?
                                                        (roleStatus === "All" && l?.status === 'approved') || (roleStatus === "approved" && l?.status === "approved") ?
                                                            (<td className="text-center">
                                                                <FaDownload onClick={() => downloadFile(l?.partnerId)} style={{ margin: 'auto', cursor: 'pointer' }} />
                                                            </td>) : null : null
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


export default UserRoleTable