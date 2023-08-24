import moment from "moment"
import { useEffect, useState } from "react"
import { ApiUrl } from "../../utils/commanApiUrl"
// import { useDispatch, useSelecmobiler } from "react-redux"
// import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"

function DistributorContent(){

    const [transactions, setTransaction] = useState([])

    const fetchTransaction = async() => {
        fetch(ApiUrl.transaction_getElectricity/1)
        . then((res)=> {
            return res.json()
        }).then(({data, error, message})=> {
            setTransaction(data)
        })
    }
    

    useEffect(()=> {
        fetchTransaction()
    }, [])

    return(
        <>
            <TitleCard title="Recent Transactions" topMargin="mt-2">
            
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

                            
                            transactions.map((l, k) => {
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
            </TitleCard>
        </>
    )
}


export default DistributorContent
