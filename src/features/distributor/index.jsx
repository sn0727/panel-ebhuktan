import React from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { openModal } from "../common/modalSlice"
// import { getLeadsContent } from "./leadSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../utils/globalConstantUtil'
import { APIRequest, ApiUrl } from "../../utils/commanApiUrl"

// select box code 
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// select box code 


const TopSideButtons = ({ Aprovehandler, Pandinghandler }) => {

    const dispatch = useDispatch()

    // select box funtion
    const [roleStatus, setRoleStatus] = React.useState('aprove');

    const handleChange = (event) => {
        setRoleStatus(event.target.value);
    };
    // select box funtion


    useEffect(() => {
        roleStatus ? Aprovehandler() : Pandinghandler()
    }, [])
    const openAddNewLeadModal = () => {
        dispatch(openModal({ title: "Add New Lead", bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW }))
    }

    return (

        <>
            <div className="select-with-ps">
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
                            <MenuItem value={"aprove"} onClick={Aprovehandler}>Aprove</MenuItem>
                            <MenuItem value={"pandding"} onClick={Pandinghandler}>Pandding</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
        </>

    )
}

function DistributorContent() {

    const [clusterData, setClusterData] = React.useState([]);

    // i am calling aprove funtion on the click
    const Aprovehandler = () => {
        const getCusterData = async () => {
            try {
                const SendRequest = async () => {
                    let config = {
                        url: `${ApiUrl.getDistributorAll}/${1}`,
                        method: 'get',
                    };
                    APIRequest(
                        config,
                        res => {
                            console.log(res);
                            setClusterData(res.data)
                        },
                        err => {
                            console.log(err);
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
     

                const SendRequest = async () => {
                    let config = {
                        url: `${ApiUrl.getPendingDistributor}/${1}`,
                        method: 'get',
                    };
                    APIRequest(
                        config,
                        res => {
                            console.log(res);
                            setClusterData(res.data)
                        },
                        err => {
                            console.log(err);
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

    // statushandler funcation 
    const statusHandler = async (statusId, status) => {
        try {
            const SendRequest = async () => {
                let config = {
                    url: ApiUrl.updateClusterStatus,
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
                        Pandinghandler()
                    },
                    err => {
                        console.log(err);
                    }
                );
            }
            SendRequest();
        } catch (error) {

        }
    }

    return (
        <>
            <TitleCard title="Current Leads" topMargin="mt-2" TopSideButtons={<TopSideButtons clusterData={clusterData} Aprovehandler={Aprovehandler} Pandinghandler={Pandinghandler} />}>

                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email Id</th>
                                <th>Contact No.</th>
                                <th>Address</th>
                                <th>DOB</th>
                                <td>AddharNo</td>
                                <td>PanNo</td>
                                <td>Status</td>
                                <td>Amount</td>
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
                                            <td>{l.dob}</td>
                                            <td>{l.aadharNo}</td>
                                            <td>{l.panNo}</td>
                                            <td>
                                                <div className="badge badge-primary" onClick={() => statusHandler(l.id, "approved")}>{l.status}</div>
                                            </td>
                                            <td>{l.amount}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}


export default DistributorContent
