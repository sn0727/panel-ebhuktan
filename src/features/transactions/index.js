import moment from "moment"
import { useEffect, useState } from "react"
import { APIRequest, ApiUrl } from '../../utils/commanApiUrl';
import TitleCard from "../../components/Cards/TitleCard";
import DynamicTitle from "../../components/dynamic_title";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DateByFilter } from "../../components/DateByFilter/DateByFilter";
import TablePagination from '@mui/material/TablePagination';
import { Button } from "@mui/material";

function Transactions() {
    const [users, setUsers] = useState([])
    const [isLoading, setisLoading] = useState(true);
    const [category, setCategory] = useState('');
    const [categoryType, setCategoryType] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [Check, setCheck] = useState(false);
    const [pageLimit, setPageLimit] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);


    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    // set category in the select box
    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    // get page per page record
    const getPageLimitFun = () => {
        let config = {
            url : ApiUrl.getPageLimit,
            method : 'get'
        }
        APIRequest(
            config,
            res => {
                setPageLimit(res?.limit)
            },
            err => {
                console.log(err)
            }
        )
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(1);
    };

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
                setCategoryType(res?.data)
                setisLoading(false)
            },
            err => {
                console.log(err);
                setisLoading(false)
            }
        );
    }

    // filter data 
    const filterTransaction = () => {
        setisLoading(true)
        let body;
        if (Check) {
            body = {
                page: page + 1,
                limit: rowsPerPage,
                type: category ? category : 'All',
                startDate: moment(selectionRange.startDate).format('YYYY-MM-DD'),
                endDate: moment(selectionRange.endDate).format('YYYY-MM-DD'),

            }
        } else {
            body = {
                page: page + 1,
                limit: rowsPerPage,
                type: category ? category : 'All',
                startDate: null,
                endDate: null,

            }
        }
        const config = {
            url: ApiUrl.getFilterTransaction,
            method: 'post',
            body: body
        };

        APIRequest(
            config,
            (res) => {
                console.log(res, "res =================== ddd");
                setUsers(res?.data)
                setTotalAmount(res?.total)
                setTotalCount(res?.count)
                setisLoading(false)
            },
            (err) => {
                console.log(err, "================== erro");
                setisLoading(false)
            }
        );

    };

    // CLEAR filter funcation
    const clearFun = () => {
        setSelectionRange({
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        })
        // setCategoryType([])
        setCategory('')
        setCheck(false)
    }

    useEffect(() => {
        SendRequestGetType()
        getPageLimitFun()
    }, [])

    useEffect(() => {
        filterTransaction();
    }, [selectionRange, category, rowsPerPage, page])


    return (
        <>


            <DynamicTitle pageTitle={"Transaction"} />
            {/* total amout section */}
            <div className="total-amount">
                <div>total : {`${parseFloat(totalAmount).toFixed(2)}`}</div>
                <div>count : {`${parseFloat(totalCount)}`}</div>
            </div>


            <TitleCard title="Recent Transactions" topMargin="mt-2">
                <div className="date-by-filter">
                    <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
                        <InputLabel id="demo-select-small-label">Choice Category</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={category}
                            label="Choice Category"
                            onChange={handleChange}
                        >
                            {
                                categoryType.map(({ type }) => (
                                    <MenuItem value={type}>{type}</MenuItem>
                                ))
                            }

                        </Select>
                    </FormControl>

                    <DateByFilter selectionRange={selectionRange} setSelectionRange={setSelectionRange} setCheck={setCheck} />
                    <Button onClick={clearFun} style={{ backgroundColor: '#2c427d', color: '#fff'}}>Clear</Button>
                </div>
                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    {users.length > 0 ?
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Id</th>
                                    <th>User Id</th>
                                    <th>Amount</th>
                                    <th className="text-center">Type</th>
                                    <th>Image</th>
                                    <th>Invoice No</th>
                                    <th>Pin Code</th>
                                    <th className="text-center">Date and time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map(({ id, consumerId, amount, type, image, invoiceNo, adminPinCode, modifiedCreatedAt }, k) => {
                                        return (
                                            <tr key={k}>
                                                <td className="text-center">{(parseInt(page) * parseInt(rowsPerPage) + k) + 1}</td>
                                                <td className="text-center">{id}</td>
                                                <td className="text-center">{consumerId}</td>
                                                <td className="text-center">{parseFloat(amount).toFixed(2)}</td>
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
                                                <td className="text-center">{moment(modifiedCreatedAt).utc().format("MM/DD/YYYY, hh:mm a")}</td>
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
                <TablePagination
                    rowsPerPageOptions={pageLimit.map((item) => item.limit)}
                    component="div"
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TitleCard>
            {isLoading ? document.body.classList.add('loading-indicator') : document.body.classList.remove('loading-indicator')}
        </>
    )
}


export default Transactions