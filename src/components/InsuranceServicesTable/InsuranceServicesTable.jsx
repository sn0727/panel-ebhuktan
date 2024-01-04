import React from "react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../../features/common/modalSlice"
import { MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import { APIRequest, ApiUrl } from "../../utils/commanApiUrl"
import jwtDecode from 'jwt-decode';
// select box code 
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AiOutlineSearch } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { DateByFilter } from "../../components/DateByFilter/DateByFilter"
import moment from "moment"
import { TablePagination } from "@mui/material"
import { Button } from "@mui/material";
import ChangeStatusFinnanceServicesTable from "../Model/ChangeStatusFinnanceServicesTable"

const TopSideButtons = ({ children, createRoleName }) => {

    const dispatch = useDispatch()
    var token = sessionStorage.getItem("token")
    const decodedToken = jwtDecode(token);
    const { role } = decodedToken.user;

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
                    (role === "superAdmin" || role === "franchise" || role === "retailer") && (
                        <>
                            {children}
                            {/* <div className="inline-block float-right">
                                <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button>
                            </div> */}
                        </>
                    )
                }
            </div>
        </>

    )
}


function InsuranceServicesTable({
    getFilterInsuranceServices,
    pagetableName,
    getPageLimit,
    createRoleName,
    requestPageName
}) {
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

    var token = sessionStorage.getItem("token")
    const decodedToken = jwtDecode(token);
    const { role } = decodedToken.user

    // filter api router 
    let statusApiRoutes;
    if (requestPageName === "HealthInsurance") {
        statusApiRoutes = ApiUrl?.healthInsuranceChangeStatus
    } else if (requestPageName === "TravelInsurance") {
        statusApiRoutes = ApiUrl?.travelInsuranceChangeStatus
    } else if (requestPageName === "GroupInsurance") {
        statusApiRoutes = ApiUrl?.groupInsuranceChangeStatus
    } else if (requestPageName === "LifeInsurance") {
        statusApiRoutes = ApiUrl?.lifeInsuranceChangeStatus
    } else if (requestPageName === "vehicleInsurance") {
        statusApiRoutes = ApiUrl?.vehicleInsuranceChangeStatus
    }


    // live search filter
    const filteredItems = clusterData?.filter((user) =>
        user?.FullName?.toLowerCase().includes(searchOperatorName?.toLowerCase()) ||
        user?.PartnerId?.toLowerCase()?.includes(searchOperatorName?.toLowerCase())
    );

    // live search and highlight text 
    function getHighlightedText(text, highlight) {
        // Split text on highlight term, include term itself into parts, ignore case
        const parts = text?.split(new RegExp(`(${highlight})`, 'gi'));

        // console.log(parts, "parts= ====================")
        return (
            <span>
                {parts?.map((part, index) =>
                    part?.toLowerCase() === highlight?.toLowerCase() ? (
                        <b key={index} style={{ color: '#2c427d' }}>{part}</b>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    }

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
        setRowsPerPage(event.target.value);
    };

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
                Page: page + 1,
                Limit: rowsPerPage,
                Status: roleStatus ? roleStatus : 'All',
                Data: searchOperatorName,
                StartDate: moment(selectionRange.startDate).format('YYYY-MM-DD'),
                EndDate: moment(selectionRange.endDate).format('YYYY-MM-DD'),
            }
        } else {
            body = {
                Page: page + 1,
                Limit: rowsPerPage,
                Status: roleStatus ? roleStatus : 'All',
                Data: searchOperatorName,
                StartDate: null,
                EndDate: null,
            }
        }
        const config = {
            url: getFilterInsuranceServices,
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
                        <div className="absolute inset-y-0 right-0 flex items-center">
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
                                    <td className="text-left">Status</td>
                                    <td className="text-left">DOB</td>
                                    <td className="text-left">Home No</td>
                                    <td className="text-left">Street No</td>
                                    <td className="text-left">Locality</td>
                                    <td className="text-left">City</td>
                                    <td className="text-left">State</td>
                                    <td className="text-left">Country</td>
                                    <td className="text-left">Pin Code</td>
                                    <td className="text-left">Pan No</td>
                                    <td className="text-left">Aadhaar No</td>
                                    <td className="text-left">Remark</td>
                                    <td className="text-right">Date | Time</td>
                                    {
                                        (requestPageName === "TravelInsurance" || requestPageName === "GroupInsurance") && (
                                            <>
                                                <td className="text-left">Number Of People</td>
                                            </>
                                        )
                                    }
                                    {
                                        (requestPageName === "TravelInsurance") && (
                                            <>
                                                <td className="text-left">Start Date</td>
                                                <td className="text-left">End Date</td>
                                                <td className="text-left">Traveling From</td>
                                                <td className="text-left">Traveling To</td>
                                            </>
                                        )
                                    }
                                    {
                                        (requestPageName === "vehicleInsurance") && (
                                            <>
                                                <td className="text-left">Vehicle No</td>
                                                <td className="text-left">Chassis No</td>
                                                <td className="text-left">Last Date</td>
                                                <td className="text-left">Vehicle Type</td>
                                            </>
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredItems?.map((l, k) => {
                                        return (
                                            <tr key={k}>
                                                <>
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
                                                                <div className="font-bold">{getHighlightedText(l?.FullName, searchOperatorName)}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-left">{getHighlightedText(l?.PartnerId, searchOperatorName)}</td>
                                                    <td className="text-left">{l.Email}</td>
                                                    <td className="text-left">{l.Contact}</td>
                                                    {/* <td className="text-left">{l.Status}</td> */}
                                                    {role === "superAdmin" && <td className="text-center">
                                                        <div className="badge badge-primary">
                                                            {
                                                                roleStatus === "All" || roleStatus === "approved" ? l?.Status : null
                                                            }
                                                            {
                                                                roleStatus === "pending" &&
                                                                <ChangeStatusFinnanceServicesTable
                                                                    id={l.id} adminId={l?.adminId}
                                                                    status={l?.Status}
                                                                    filterTransaction={filterTransaction}
                                                                    changeStatusApi={statusApiRoutes}
                                                                />
                                                            }
                                                        </div>
                                                    </td>}
                                                    <td>{l?.DOB}</td>
                                                    <td>{l?.HomeNo}</td>
                                                    <td>{l?.StreetNo}</td>
                                                    <td>{l?.Locality}</td>
                                                    <td>{l?.City}</td>
                                                    <td>{l?.State}</td>
                                                    <td>{l?.Country}</td>
                                                    <td>{l?.PinCode}</td>
                                                    <td>{l?.PanNo}</td>
                                                    <td>{l?.AadhaarNo}</td>
                                                    <td>{l?.Remark ? l?.Remark : 'no data'}</td>
                                                    <td className="text-right">{moment(l.CreatedAt).format('dd/mm/yyyy, HH:MM:SS, A') ? moment(l.CreatedAt).format('DD/MMM/yyyy, HH:MM A') : 'not available'}</td>
                                                    {
                                                        (requestPageName === "TravelInsurance" || requestPageName === "GroupInsurance") && (
                                                            <>
                                                                <td className="text-center">{l?.NumberOfPeople}</td>
                                                            </>
                                                        )
                                                    }
                                                    {
                                                        (requestPageName === "TravelInsurance") && (
                                                            <>
                                                                <td className="text-left">{l?.StartDate}</td>
                                                                <td className="text-left">{l?.EndDate}</td>
                                                                <td className="text-left">{l?.StartFrom}</td>
                                                                <td className="text-left">{l?.EndTo}</td>
                                                            </>
                                                        )
                                                    }
                                                    {
                                                        (requestPageName === "vehicleInsurance") && (
                                                            <>
                                                                <td className="text-left">{l?.VehicleNo}</td>
                                                                <td className="text-left">{l?.ChassisNo}</td>
                                                                <td className="text-left">{l?.LastDate}</td>
                                                                <td className="text-left">{l?.VehicleType}</td>
                                                            </>
                                                        )
                                                    }
                                                </>
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


export default InsuranceServicesTable