import React from "react"
import { useEffect, useState } from "react"
import TitleCard from "../../components/Cards/TitleCard"
import { APIRequest, ApiUrl } from "../../utils/commanApiUrl"
import Pagination from "../../components/pagination/Pagination"
import jwtDecode from 'jwt-decode';
import AddMoneyModal from "../../components/Model/AddMoneyModal"
import { AiTwotoneDelete } from "react-icons/ai"
import { FaArrowCircleRight } from "react-icons/fa";
import { toast } from "react-toastify"
import { useLocation } from "react-router-dom"
import DynamicTitle from "../../components/dynamic_title"
import { setPageTitle } from "../../features/common/headerSlice"
import { useDispatch } from "react-redux"
// select box code 


function Commission() {
    const location = useLocation();
    const { id } = location.state
    const dispatch = useDispatch()
    const [UserList, setUserList] = React.useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setisLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0)
    const [Category, setCategory] = useState('Aproved');
    const [Check, setCheck] = useState(false);
    var token = sessionStorage.getItem("token")
    const decodedToken = jwtDecode(token);
    const { role } = decodedToken.user

    // i am calling aprove funtion on the click

    const getUserData = (userId) => {
        setisLoading(true)
        try {
            let config = {
                url: `${ApiUrl.superadminGetNestedCommission}`,
                method: 'post',
                body: {
                    page: currentPage,
                    id: userId ? userId : id
                }
            };
            APIRequest(
                config,
                res => {
                    console.log(res);
                    setUserList(res?.data)
                    setisLoading(false)
                },
                err => {
                    console.log(err);
                    setisLoading(false)
                }
            );

        } catch (error) {
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        dispatch(setPageTitle({ title: "Commission" }))
        getUserData()
    }, [])


    return (
        <>
            <DynamicTitle pageTitle={"Cluster"} />

            <TitleCard title="Your commission" topMargin="mt-2">
                {/* Leads List in table format loaded from slice after api call */}
                <div className="overflow-x-auto w-full">
                    {UserList.length > 0 ?
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
                                    <td>Amount</td>
                                    <td>Earning</td>
                                    <td>Commission</td>
                                    <td>View Details</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    UserList.map((l, k) => {
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
                                                <td>{parseFloat(l?.amount).toFixed(2)}</td>
                                                <td>{parseFloat(l?.earning).toFixed(2)}</td>
                                                <td>{parseFloat(l?.commission).toFixed(2)}</td>
                                                <td>
                                                    <div className="mx-3 cursor-pointer" >
                                                        <FaArrowCircleRight fontSize={28} id={l.id} onClick={() => getUserData(l.id)} />
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
                <nav aria-label="Page navigation example text-right" className="navigation example">
                    {Check ? null : <Pagination
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


export default Commission