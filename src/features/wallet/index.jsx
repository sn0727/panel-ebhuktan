import moment from "moment"
import { useEffect, useState } from "react"
// import { useDispatch, useSelecmobiler } from "react-redux"
// import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import DashboardStats from './../../features/dashboard/components/DashboardStats'
import UserGroupIcon  from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon  from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon  from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon  from '@heroicons/react/24/outline/CreditCardIcon'
import { ApiUrl } from '../../utils/commanApiUrl';
import axios from "axios";
import Pagination from "../../components/pagination/Pagination";

function WalletContent() {
 
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [allUsers, setAlluser] = useState([])
    // const [valueK, setValueK] = useState("")
    const { amount } = allUsers;
    
    function kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
    }
    
    let k_value = kFormatter(amount)

    const statsData = [
        {title : "Amount", value : `${k_value}`, icon : <UserGroupIcon className='w-8 h-8'/>, description : "↗︎ 2300 (22%)"},
        {title : "Total Sales", value : "$34,545", icon : <CreditCardIcon className='w-8 h-8'/>, description : "Current month"},
        {title : "Pending Leads", value : "450", icon : <CircleStackIcon className='w-8 h-8'/>, description : "50 in hot leads"},
        {title : "Active Users", value : "5.6k", icon : <UsersIcon className='w-8 h-8'/>, description : "↙ 300 (18%)"},
    ]

    

    
    // get data from the api
    const fetchUserData = async() => {

        try {
            const response = await axios.get(`${ApiUrl.transaction_getMunicipality}/${currentPage}`);
            const result = await response.data;
            const {data} = result
            setUsers(data)
        } catch ({ error, message }) {
            alert(message)
        }
      }
    // user call api
    useEffect(()=> {
        const GetAllUser = async()=> {
            try {
                const user_response = await axios.get(`${ApiUrl.user_getById}/${93}`);
                const user_result = await user_response.data;
                const { user }  = user_result;
                setAlluser(user)
            } catch ({message}) {
                alert(message)
            }
            
        }
        GetAllUser()
    }, [])
      
    //   transaction call api
      useEffect(() => {
        fetchUserData()
      },[currentPage])


    return (
        <>

            {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    statsData.map((d, k) => {
                        return (
                            <DashboardStats key={k} {...d} colorIndex={k}/>
                        )
                    })
                }
            </div>

            <TitleCard title="Recent Transactions" topMargin="mt-2" >

                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Consumer Id</th>
                        <th>Image</th>
                        <th>Date</th>
                        <th>Invoice No.</th>
                        <th>Type</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((l, k) => {
                                return(
                                    <tr key={k}>
                                        <td>{l.consumerId}</td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-circle w-12 h-12">
                                                        <img src={l.image} alt="Avatar" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{moment(l.date).format("D MMM")}</td>
                                        <td>{l.invoiceNo}</td>
                                        <td>{l.type}</td>
                                        <td>{l.amount}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <Pagination apiRoute={ApiUrl.transaction_getMunicipality} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </TitleCard>
        </>
    )
}


export default WalletContent
