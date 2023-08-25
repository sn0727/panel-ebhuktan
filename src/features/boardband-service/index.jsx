import moment from "moment"
import { useEffect, useState } from "react"
import TitleCard from "../../components/Cards/TitleCard"
import { ApiUrl, APIRequest } from "../../utils/commanApiUrl"
import axios from "axios";
import Pagination from "../../components/pagination/Pagination";


function BoardBandServiceContent() {

    const [transactions, setTransaction] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setisLoading] = useState(true);
    const [TotalUser, setTotalUser] = useState('');

    const SendRequest = async () => {
        setisLoading(true)
        let config = {
            url: `${ApiUrl.transaction_getBroadBand}/${currentPage}`,
            method: 'get',
        };
        APIRequest(
            config,
            res => {
                console.log(res);
                setTotalUser(res?.count)
                setTransaction(res.data)
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

            <TitleCard title="Recent Transactions" topMargin="mt-2" >

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


                                transactions.map((l, k) => {
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

                <Pagination apiRoute={ApiUrl.transaction_getBroadBand} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </TitleCard>
        </>
    )
}


export default BoardBandServiceContent
