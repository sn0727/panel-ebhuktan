import React from "react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
// import { getLeadsContent } from "./leadSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import { APIRequest, ApiUrl } from "../../utils/commanApiUrl"
import Pagination from "../../components/pagination/Pagination"
import jwtDecode from 'jwt-decode';

// select box code 
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AiTwotoneDelete } from "react-icons/ai"
import { toast } from "react-toastify"
import AddMoneyModal from "../../components/Model/AddMoneyModal"
import { FaArrowCircleRight } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
// select box code 


const TopSideButtons = ({ Aprovehandler, Pandinghandler, createRoleName, setCategory }) => {

    const dispatch = useDispatch()

    var token = localStorage.getItem("token")
    const decodedToken = jwtDecode(token);
    const { role } = decodedToken.user

    // alert(role)

    // select box funtion
    const [roleStatus, setRoleStatus] = React.useState('aproved');

    const handleChange = (event) => {
        setRoleStatus(event.target.value);
    };
    // select box funtion


    useEffect(() => {
        roleStatus ? Aprovehandler() : Pandinghandler()
    }, [])
    const openAddNewLeadModal = () => {
        dispatch(openModal({ title: "Add New Lead", bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW, createRoleName: createRoleName }))
    }

    return (

        <>
            <div className="select-with-ps">

                {
                    role === "cluster" && (
                        <div className="inline-block float-right">
                            <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button>
                        </div>
                    )
                }
                {
                    role === "superAdmin" && (
                        <>
                            <div className="inline-block float-right">
                                <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => openAddNewLeadModal()}>Add New</button>
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
                                        <MenuItem value={"aproved"} onClick={() => setCategory('Aproved')}>Aproved</MenuItem>
                                        <MenuItem value={"Pending"} onClick={() => setCategory('Pending')}>Pending</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </>

                    )
                }

            </div>
        </>

    )
}

function DistributorContent() {
    const navigate = useNavigate();
    const [clusterData, setClusterData] = React.useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setisLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0)
    const [Category, setCategory] = useState('Aproved');
    const [Check, setCheck] = useState(false);

    var token = localStorage.getItem("token")
    const decodedToken = jwtDecode(token);
    const { role } = decodedToken.user

    // i am calling aprove funtion on the click
    const Aprovehandler = () => {
        const getCusterData = async () => {
            setisLoading(true)
            try {
                const SendRequest = async () => {
                    let config = {
                        url: `${ApiUrl.getDistributorAll}/${currentPage}`,
                        method: 'get',
                    };
                    APIRequest(
                        config,
                        res => {
                            console.log(res);
                            setClusterData(res.data)
                            setCheck(false)
                            setisLoading(false)
                        },
                        err => {
                            console.log(err);
                            setisLoading(false)
                        }
                    );
                }
                SendRequest();
            } catch (error) {
                console.log(error.response.data)
            }
        }
        getCusterData()
    }
    // set condition accordding role
    const Pandinghandler = () => {
        const getCusterDatapandding = async () => {
            // let token = localStorage.getItem("token")
            try {
                setisLoading(true)
                const SendRequest = async () => {
                    let config = {
                        url: `${ApiUrl.getPendingDistributor}/${currentPage}`,
                        method: 'get',
                    };
                    APIRequest(
                        config,
                        res => {
                            console.log(res);
                            setClusterData(res.data)
                            setCheck(false)
                            setisLoading(false)
                        },
                        err => {
                            console.log(err);
                            setClusterData([])
                            setisLoading(false)
                        }
                    );
                }
                SendRequest();
            } catch (error) {
                console.log(error.response.data)
            }
        }
        getCusterDatapandding()
    }
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
                    Pandinghandler()
                    Aprovehandler()
                    setisLoading(false)
                },
                err => {
                    console.log(err);
                    setisLoading(false)
                }
            );
        }
    }
    // statushandler funcation 
    const statusHandler = async (statusId, status) => {
        const choice = window.confirm(`Are you sure you want to ${status === "approved" ? "aprove" : "Reject"} everything?`)
        if (choice) {
            try {
                setisLoading(true)
                const SendRequest = async () => {
                    let config = {
                        url: ApiUrl.updateStatus,
                        method: 'post',
                        body: {
                            userId: statusId,
                            status: status
                        }
                    };
                    APIRequest(
                        config,
                        res => {
                            console.log(res);
                            toast.success(res.message)
                            Pandinghandler()
                            setisLoading(false)
                        },
                        err => {
                            console.log(err);
                            setisLoading(false)
                        }
                    );
                }
                SendRequest();
            } catch (error) {

            }
        }
    }

    useEffect(() => {
        Aprovehandler()
    }, [currentPage])
    useEffect(() => {
        if (Category === 'Aproved') {
            Aprovehandler()
        } else {
            Pandinghandler()
        }
    }, [currentPage])


    useEffect(() => {
        if (currentPage !== '1') {
            setCurrentPage(1)
        }
        setCheck(true)
        if (Category === 'Aproved') {
            Aprovehandler()
        } else {
            Pandinghandler()
        }
    }, [Category]);

    return (
        <>
            <TitleCard title="Current Distributor" topMargin="mt-2" TopSideButtons={<TopSideButtons setCategory={setCategory} clusterData={clusterData} Aprovehandler={Aprovehandler} createRoleName={'distributor'} Pandinghandler={Pandinghandler} />}>

                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">
                    {clusterData.length > 0 ?
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email Id</th>
                                    <th>Contact No.</th>
                                    <th>Address</th>
                                    <td>AddharNo</td>
                                    <td>PanNo</td>
                                    <td>Status</td>
                                    <td>Amount</td>
                                    <td>Earning</td>
                                    <td>Commission</td>
                                    {role === "superAdmin" && <td>Delete</td>}
                                    {role === "superAdmin" && <td>Add Money</td>}
                                    <td>View Details</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    clusterData.map((l, k) => {
                                        return (
                                            <tr key={k}>
                                                <td>{l.id}</td>
                                                <td>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">

                                                                <img src={l.image ? l.image : "https://e-bhuktan.s3.eu-north-1.amazonaws.com/image/1692695219537_image.png"} alt="Avatar" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{l.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{l.email}</td>
                                                <td>{l.contact}</td>
                                                <td>
                                                    <div>
                                                        <address> Noida sector, {l.district}, {l.state}, <br></br> {l.postalCode} </address>
                                                    </div>
                                                </td>
                                                <td>{l.aadharNo}</td>
                                                <td>{l.panNo}</td>
                                                <td>
                                                    <div className="badge badge-primary" onClick={() => l.status === "approved" ? '' : statusHandler(l.id, "approved")}>{l.status === "approved" ? "approved" : "approve"}</div>
                                                    {l.status !== "approved" && <div className="badge badge-red ml-3" onClick={() => statusHandler(l.id, "reject")}>{l.status === "reject" ? "approved" : "Reject"}</div>}
                                                </td>
                                                <td>{parseFloat(l.amount).toFixed(2)}</td>
                                                <td>{parseFloat(l?.earning).toFixed(2)}</td>
                                                <td>{parseFloat(l?.commission).toFixed(2)}</td>
                                                {role === "superAdmin" && <td>
                                                    <div className="mx-3 cursor-pointer" >
                                                        <AiTwotoneDelete fontSize={30} onClick={() => Delete(l.id)} />
                                                    </div>
                                                </td>}
                                                {role === "superAdmin" && <td>
                                                    <div className="mx-3 cursor-pointer" >
                                                        <AddMoneyModal id={l.id} />
                                                    </div>
                                                </td>}
                                                <td>
                                                    <div className="mx-3 cursor-pointer" >
                                                        <FaArrowCircleRight fontSize={28} id={l.id} onClick={() => navigate('/app/commission', { state: { id: l.id } })} />
                                                    </div>
                                                </td>
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
                <nav aria-label="Page navigation example text-right" className="navigation example">
                    {Check ? null : <Pagination
                        apiRoute={`${ApiUrl.getUsersAll}/1`}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        setTotalCount={setTotalCount}
                        totalCount={totalCount}
                    />}
                </nav>
            </TitleCard>
            {isLoading ? document.body.classList.add('loading-indicator') : document.body.classList.remove('loading-indicator')}
        </>
    )
}


export default DistributorContent
