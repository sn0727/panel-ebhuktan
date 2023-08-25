import moment from "moment"
import { useEffect, useState } from "react"
// import { useDispatch, useSelecmobiler } from "react-redux"
// import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import DashboardStats from './../../features/dashboard/components/DashboardStats'
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon'
import { ApiUrl, APIRequest } from '../../utils/commanApiUrl';
import Pagination from "../../components/pagination/Pagination";

function WalletContent() {
    const [isLoading, setisLoading] = useState(true);
    const [user, setuser] = useState('');
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [allUsers, setAlluser] = useState([])
    const [statsData, setstatsData] = useState([]);
    // const [valueK, setValueK] = useState("")
    const { amount } = allUsers;

    function kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
    }

    let k_value = kFormatter(amount)

    // const statsData = [
    //     { title: "Amount", value: `${k_value}`, icon: <UserGroupIcon className='w-8 h-8' />, description: "↗︎ 2300 (22%)" },
    //     // { title: "Total Sales", value: "$34,545", icon: <CreditCardIcon className='w-8 h-8' />, description: "Current month" },
    //     // { title: "Pending Leads", value: "450", icon: <CircleStackIcon className='w-8 h-8' />, description: "50 in hot leads" },
    //     // { title: "Active Users", value: "5.6k", icon: <UsersIcon className='w-8 h-8' />, description: "↙ 300 (18%)" },
    // ]



    const SendRequest = async () => {
        setisLoading(true)
        let config = {
            url: `${ApiUrl.getByToken}`,
            method: 'get',
        };
        APIRequest(
            config,
            res => {
                console.log(res);
                setuser(res?.user)
                setstatsData([
                    { title: "Amount", value: kFormatter(res?.user?.amount), icon: <UserGroupIcon className='w-8 h-8' />, description: "↗︎ 2300 (22%)" },
                    { title: "Wallet", value: "Add amount", icon: <CreditCardIcon className='w-8 h-8' />, description: "Add money in wallet" },
                ])
                setisLoading(false)
            },
            err => {
                console.log(err);
                setisLoading(false)
            }
        );
    }
    useEffect(() => {
        SendRequest()
    }, [currentPage])

    return (
        <>

            {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    statsData.map((d, k) => {
                        return (
                            <div onClick={()=> {
                                d.value === 'Add amount' && alert('skjbbkr')
                            }}>
                                <DashboardStats key={k} {...d} colorIndex={k} />
                            </div>
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
                                    return (
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
                <Pagination apiRoute={ApiUrl.transaction_getMunicipality} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </TitleCard>
        </>
    )
}


export default WalletContent
