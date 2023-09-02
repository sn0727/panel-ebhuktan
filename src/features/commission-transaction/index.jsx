import moment from "moment"
import { useEffect, useState } from "react"
// import { useDispatch, useSelecmobiler } from "react-redux"
// import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import Pagination from "../../components/pagination/Pagination";
import { APIRequest, ApiUrl } from '../../utils/commanApiUrl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function CommissionTransactionContent() {

    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setisLoading] = useState(true);
    const [category, setCategory] = useState('');
    const [categoryType, setCategoryType] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0)
    const [totalCount, setTotalCount] = useState(0)

    console.log(totalCount, "total count")

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    // get data from the api
    const SendRequest = async () => {
        setisLoading(true)
        let config = {
            url: `${ApiUrl.transaction_commission_getAll}`,
            method: 'post',
            body: {
                page: currentPage,
                type: category
            }
        };
        APIRequest(
            config,
            res => {
                console.log(res, "this is cate api");
                setTotalCount(res.count)
                setTotalAmount(res.total)
                setUsers(res.data)
                setisLoading(false)
            },
            err => {
                console.log(err);
                setisLoading(false)
            }
        );
    }
    // get type from the api
    const SendRequestGetType = async () => {
        setisLoading(true)
        let config = {
            url: `${ApiUrl.transaction_getType}`,
            method: 'get',
        };
        APIRequest(
            config,
            res => {
                console.log(res);
                setCategoryType(res.data)
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
        SendRequestGetType()
    }, [currentPage, category, totalCount])

    return (
        <>
            {/* total amout section */}
            <div className="total-amount">
                <div>total : {`${parseFloat(totalAmount).toFixed(2)}`}</div>
                <div>count : {`${parseFloat(totalCount)}`}</div>
            </div>

            {/* Team Member list in table format loaded constant */}
            <TitleCard title="All Commission Transactions" topMargin="mt-2">
                <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                    <InputLabel id="demo-select-small-label">Choice Category</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={category}
                        label="Choice Category"
                        onChange={handleChange}
                    >
                        {/* <MenuItem value="None">
                            <em>None</em>
                        </MenuItem> */}

                        {
                            categoryType.map(({ type }) => (
                                <MenuItem value={type}>{type}</MenuItem>
                            ))
                        }

                    </Select>
                </FormControl>
                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Transaction Id</th>
                                <th>Amount</th>
                                <th>Operator Id</th>
                                <th>ConsumeId</th>
                                <th>Admin Pin Code</th>
                                <th>Cluster Amount</th>
                                <th>Retailer Amount</th>
                                <th>Distributor Amount</th>
                                <th>Admin Amount</th>
                                <th className="text-center">Type</th>
                                <th className="text-center">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(({ id, transactionId, amount, operatorId, consumerId, adminPinCode, clusterAmount, retailerAmount, distributorAmount, adminAmount, type, createdAt }, k) => {
                                    return (
                                        <tr key={k}>
                                            <td className="text-center">{id}</td>
                                            <td className="text-center">{transactionId}</td>
                                            <td className="text-center">{amount}</td>
                                            <td className="text-center">{operatorId}</td>
                                            <td className="text-center">{consumerId}</td>
                                            <td className="text-center">{adminPinCode}</td>
                                            <td className="text-center">{clusterAmount}</td>
                                            <td className="text-center">{retailerAmount}</td>
                                            <td className="text-center">{distributorAmount}</td>
                                            <td className="text-center">{adminAmount}</td>
                                            <td className="text-center">{type}</td>
                                            {/* <td className="text-center">{moment().format(createdAt)}</td> */}
                                            <td className="text-center">{moment(createdAt).utc().format("MM/DD/YYYY hh:mm a")}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <nav aria-label="Page navigation example text-right" className="navigation example">
                    <nav aria-label="Page navigation example text-right" className="navigation example">
                        <Pagination
                            apiRoute={ApiUrl.transaction_commission_getAll}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalCount={totalCount}
                            setTotalCount={setTotalCount}
                            category={category}
                        />
                    </nav>
                </nav>
            </TitleCard>
        </>
    )
}


export default CommissionTransactionContent
