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
import jwtDecode from "jwt-decode";
import { AiOutlineSearch, AiTwotoneDelete } from "react-icons/ai"
import { Box, Button, TablePagination } from "@mui/material";
import { DateByFilter } from "../../components/DateByFilter/DateByFilter";


function WalletTransactions() {
    // const [users, setUsers] = useState([])
    const [walletTableData, setWalletTableData] = useState([])
    const [isLoading, setisLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0)
    const [Check, setCheck] = useState(false);
    const [pageLimit, setPageLimit] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [roleStatus, setRoleStatus] = useState('All');
    const [searchOperatorName, setSearchOperatorName] = useState('');

    // this is a code token
    const token = sessionStorage.getItem("token")
    const decodeToken = jwtDecode(token);
    const userId = decodeToken?.user?.partnerId;

    // date selection value
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    // live search filter
    const filteredItems = walletTableData?.filter((user) =>
        user?.senderName.toLowerCase().includes(searchOperatorName?.toLowerCase()) ||
        user?.receiverName.toLowerCase().includes(searchOperatorName?.toLowerCase()) ||
        user?.receiverId.toLowerCase().includes(searchOperatorName?.toLowerCase()) 
    );

    // live search and highlight text 
    function getHighlightedText(text, highlight) {
        // Split text on highlight term, include term itself into parts, ignore case
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

        // console.log(parts, "parts= ====================")
        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <b key={index} style={{ color: '#2c427d' }}>{part}</b>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    }

    // set page number
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // set page row number
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
    };

    // select status example : pending / abroved / all
    const handleChangeSelect = (event) => {
        setRoleStatus(event.target.value);
    };

    // get page per page record
    const getPageLimitFun = () => {
        let config = {
            url: ApiUrl?.getPageLimit,
            method: 'get'
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

    // filter date
    const filterTransaction = () => {
        setisLoading(true)
        let body;
        if (Check) {
            body = {
                page: page + 1,
                limit: rowsPerPage,
                type: roleStatus ? roleStatus : 'All',
                data: searchOperatorName,
                startDate: moment(selectionRange.startDate).format('YYYY-MM-DD'),
                endDate: moment(selectionRange.endDate).format('YYYY-MM-DD'),
            }
        } else {
            body = {
                page: page + 1,
                limit: rowsPerPage,
                type: roleStatus ? roleStatus : 'Sent',
                data: searchOperatorName,
                startDate: null,
                endDate: null,

            }
        }
        const config = {
            url: ApiUrl?.getWalletTransaction,
            method: 'post',
            body: body
        };

        APIRequest(
            config,
            (res) => {
                console.log(res, "res =================== ddd data");
                setWalletTableData(res?.data)
                setTotalCount(res?.count)
                setisLoading(false)
            },
            (err) => {
                console.log(err, "================== erro mil hai error");
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
        setRowsPerPage(25)
        setPage(0)
        setRoleStatus('All')
        setSearchOperatorName('')
        setCheck(false)
    }

    useEffect(() => {
        getPageLimitFun()
        filterTransaction()
    }, [])

    useEffect(() => {
        filterTransaction();
    }, [selectionRange, page, rowsPerPage, roleStatus])

    return (
        <>


            <DynamicTitle pageTitle={"Wallet Transaction"} />

            {/* total amout section */}
            <div className="total-amount">
                {/* <div>total : {`${parseFloat(totalAmount).toFixed(2)}`}</div> */}
                <div>count : {`${parseFloat(totalCount)}`}</div>
            </div>

            <TitleCard title="Recent Transactions" topMargin="mt-2"
                TopSideButtons={
                    <div className="select-with-ps">
                        <div className="relative w-52 mt-0 rounded-md shadow-sm">
                            <input
                                onChange={(e) => setSearchOperatorName(e.target.value)}
                                type="text"
                                value={searchOperatorName}
                                name="price"
                                id="price"
                                className="block h-full w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Search..."
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                                <AiOutlineSearch className="search-icon" />
                            </div>
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
                                    onChange={handleChangeSelect}
                                >
                                    <MenuItem value={"All"} >All</MenuItem>
                                    <MenuItem value={"Sent"} >Sent</MenuItem>
                                    <MenuItem value={"Received"} >Received</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <DateByFilter selectionRange={selectionRange} setSelectionRange={setSelectionRange} setCheck={setCheck} />
                        <Button onClick={clearFun} style={{ backgroundColor: '#2c427d', color: '#fff' }}>Clear</Button>
                    </div>
                }
            >
                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    {filteredItems?.length > 0 ?
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Sender Name</th>
                                    <th>Receiver Name</th>
                                    <th>Receiver Id</th>
                                    <th>Receiver No</th>
                                    <th>Status</th>
                                    <th>Amount</th>
                                    <th className="text-right">Date and time</th>
                                    <th>Sender Id</th>
                                    <th>Sender No</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredItems?.map((item, k) => {
                                        return (
                                            <tr key={k}>
                                                <td className="text-center">{(parseInt(page) * parseInt(rowsPerPage) + k) + 1}</td>
                                                <td className="text-center">{getHighlightedText(item?.senderName, searchOperatorName)}</td>
                                                <td className="text-center">{getHighlightedText(item?.receiverName, searchOperatorName)}</td>
                                                <td className="text-center">{getHighlightedText(item?.receiverId, searchOperatorName)}</td>
                                                <td className="text-center">{item.receiverNo}</td>
                                                <td className="text-center">{userId === item?.senderId ? "Sent" : "Received"}</td>
                                                <td className="text-right">&#8377; {item.amount}</td>
                                                <td className="text-right">{moment(item.modifiedCreatedAt).utc().format("MM/DD/YYYY, hh:mm A")}</td>
                                                <td className="text-center">{item.senderNo}</td>
                                                <td className="text-center">{item.senderId}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        :
                        <div className="error-page">
                            <img src="/assets/image/404Error.jpg" alt="404Error" />
                        </div>
                    }
                </div>

                {/* <nav aria-label="Page navigation example text-right" className="navigation example">
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
                </nav> */}

                {filteredItems?.length > 0 && <TablePagination
                    rowsPerPageOptions={pageLimit.map((item) => item.limit)}
                    component="div"
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />}
            </TitleCard>
            {isLoading ? document.body.classList.add('loading-indicator') : document.body.classList.remove('loading-indicator')}
        </>
    )
}


export default WalletTransactions