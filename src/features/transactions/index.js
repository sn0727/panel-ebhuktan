import moment from "moment"
import { useEffect, useState } from "react"
import { APIRequest, ApiUrl } from '../../utils/commanApiUrl';
import TitleCard from "../../components/Cards/TitleCard";
import Pagination from "../../components/pagination/Pagination";
import DynamicTitle from "../../components/dynamic_title";
import SelectBox from "../../components/Input/SelectBox";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ReactPaginate from 'react-paginate';
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
import Loader from "../../components/Loader";

// select box reqired 
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// select box reqired 

function Transactions() {
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setisLoading] = useState(true);
    const [category, setCategory] = useState('');
    const [categoryType, setCategoryType] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [Check, setCheck] = useState(false);


    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    // get data from the api
    const SendRequest = async () => {
        setisLoading(true)
        let config = {
            url: `${ApiUrl.transactionAll}`,
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
                setCheck(false)
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
    }, [currentPage])
    useEffect(() => {
        if (currentPage !== '1') {
            setCurrentPage(1)
        }
        setCheck(true)
        SendRequest()
    }, [category])

    useEffect(() => {
        SendRequestGetType()
    }, []);


    return (
        <>


            <DynamicTitle pageTitle={"Transaction"} />

            {/* total amout section */}
            <div className="total-amount">
                <div>total : {`${parseFloat(totalAmount).toFixed(2)}`}</div>
                <div>count : {`${parseFloat(totalCount)}`}</div>
            </div>


            <TitleCard title="All Recent Transactions" topMargin="mt-2">
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
                                <th>Consume Id</th>
                                <th>Amount</th>
                                <th>Type</th>
                                <th>Image</th>
                                <th>Invoice No</th>
                                <th>Admin Pin Code</th>
                                <th className="text-center">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(({ id, consumerId, amount, type, image, invoiceNo, adminPinCode, createdAt }, k) => {
                                    return (
                                        <tr key={k}>
                                            <td className="text-center">{id}</td>
                                            <td className="text-center">{consumerId}</td>
                                            <td className="text-center">{amount}</td>
                                            <td className="text-center">{type}</td>
                                            <td className="text-center">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">

                                                        <img src={image ? image : "https://e-bhuktan.s3.eu-north-1.amazonaws.com/image/1692695219537_image.png"} alt="Avatar" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center">{invoiceNo}</td>
                                            <td className="text-center">{adminPinCode}</td>
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
                        {Check ? null : <Pagination
                            apiRoute={ApiUrl.transactionAll}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            setTotalCount={setTotalCount}
                            category={category}
                            totalCount={totalCount}
                        />}
                    </nav>
                </nav>
            </TitleCard>
            {isLoading? document.body.classList.add('loading-indicator') : document.body.classList.remove('loading-indicator')}
        </>
    )
}


export default Transactions