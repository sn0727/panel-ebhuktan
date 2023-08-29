import moment from "moment"
import { useEffect, useState } from "react"
// import { useDispatch, useSelecmobiler } from "react-redux"
// import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import Pagination from "../../components/pagination/Pagination";
import { APIRequest, ApiUrl } from '../../utils/commanApiUrl';
import { RECENT_TRANSACTIONS } from "../../utils/dummyData"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../../components/Input/SearchBar"

function CommissionTransactionContent() {

    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setisLoading] = useState(true);

    // get data from the api
    const SendRequest = async () => {
        setisLoading(true)
        let config = {
            url: `${ApiUrl.transaction_commission_getAll}/${currentPage}`,
            method: 'post',
            body : {
                
            }
        };
        APIRequest(
            config,
            res => {
                console.log(res);
                // setCount(res.count)
                setUsers(res.data)
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
            {/* Team Member list in table format loaded constant */}
            <TitleCard title="All Commission Transactions" topMargin="mt-2">
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

                <nav aria-label="Page navigation example text-right" className="navigation example">
                    <nav aria-label="Page navigation example text-right" className="navigation example">
                        <Pagination apiRoute={ApiUrl.transactionAll} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </nav>
                </nav>
            </TitleCard>
        </>
    )
}


export default CommissionTransactionContent
