import moment from "moment"
import { useEffect, useState } from "react"
import { ApiUrl, APIRequest } from "../../utils/commanApiUrl"
// import { useDispatch, useSelecmobiler } from "react-redux"
// import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard";
import Pagination from "../../components/pagination/Pagination";
import EditOperatorModal from "../../components/Model/EditOperatorModal";
import EditOperatorImageModal from "../../components/Model/EditOperatorImageModal";
import { Button } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";

const submenuIconClasses = `h-5 w-5`

function OperatorListTable({
  pageTitlle,
  getOperatorList,
  getCommission,
  getAddIcon,
  filterOperatorList
}) {
  const [isLoading, setisLoading] = useState(true);
  const [transaction, setTransaction] = useState([])
  const [totalUser, setTotalUser] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [searchOperatorName, setSearchOperatorName] = useState('');


  // live search filter
  const filteredItems = transaction.filter((user) =>
    user.name.toLowerCase().includes(searchOperatorName.toLowerCase())
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

  // console.log(getCommission, "getCommission")
  const SendRequest = async () => {
    setisLoading(true)
    let config = {
      url: getOperatorList,
      method: 'get',
    };
    APIRequest(
      config,
      res => {
        console.log(res, "respo =========================");
        setTotalUser(res?.count)
        setTransaction(res?.data)
        setisLoading(false)
      },
      err => {
        console.log(err);
        setisLoading(false)
      }
    );
  }

  const searchOperatorHandler = () => {
    setisLoading(true)
    const config = {
      url: `${filterOperatorList}/search?name=${searchOperatorName}`,
      method: 'post',
    };

    APIRequest(
      config,
      (res) => {
        console.log(res, "res =================== ddd");
        setTransaction(res?.data)
        setisLoading(false)
      },
      (err) => {
        console.log(err, "================== erro");
        setisLoading(false)
      }
    );
  }


  // CLEAR filter funcation
  const clearFun = () => {
    setSearchOperatorName('')
    SendRequest()
  }

  // useEffect(() => {
  //   SendRequest()
  // }, [currentPage])
  useEffect(() => {
    SendRequest()
  }, [])

  return (
    <>
      <TitleCard title={pageTitlle} topMargin="mt-2">
        <div className="date-by-filter mb-2">
          <div className="relative w-52 mt-0 rounded-md shadow-sm">
            <input
              onChange={(e) => setSearchOperatorName(e.target.value)}
              type="text"
              value={searchOperatorName}
              name="price"
              id="price"
              className="block w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Operator Name"
            />
            <div className="absolute inset-y-0 right-0 flex items-center" onClick={() => searchOperatorHandler()}>
              <AiOutlineSearch className="search-icon" />
            </div>
          </div>
          <Button onClick={clearFun} style={{ backgroundColor: '#2c427d', color: '#fff' }}>Clear</Button>
        </div>
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full operator_table">
          {filteredItems.length > 0 ?
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-left">SR.NO</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th className="text-center">Category</th>
                  <th className="text-center">Commission type</th>
                  <th className="text-center">Commission</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Update</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredItems.map((l, k) => {
                    return (
                      <tr key={k}>
                        {/* <td>{l.id}</td> */}
                        <td>{k + 1}</td>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div className="avatar">
                              <div className="mask mask-circle w-12 h-12">
                                {
                                  l?.image ? <img src={l?.image} alt="Avatar" /> : <img src="/assets/image/profile.jpg" alt="Avatar" />
                                }

                                <EditOperatorImageModal id={l.id} getAddIcon={getAddIcon} />
                              </div>
                            </div>
                          </div>
                        </td>
                        {/* <td>{moment(l.date).format("D MMM")}</td> */}
                        <td>
                          <div className="description-data">{getHighlightedText(l?.name, searchOperatorName)}</div>
                        </td>
                        <td className="text-center">{l?.category}</td>
                        <td className="text-center">{l?.isPercentage === "true" ? 'Percentage' : 'Fixed'}</td>
                        <td className="text-center">{l?.commission}</td>
                        <td className="text-center">{l.isEnable}</td>
                        <td className="text-center">
                          <div className="m-4" style={{ display: 'flex', justifyContent: 'center' }}>
                            <EditOperatorModal id={l.id} isPercentage={l.isPercentage} isEnable1={l.isEnable} getCommissionApi={getCommission} />
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table> :
            <div className="w-100">
              <h3 className="text-center w-100 p-5 text-xl">Data Not found!</h3>
            </div>
          }
        </div>
        <Pagination apiRoute={ApiUrl.transaction_getElectricity} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </TitleCard>
      {isLoading ? document.body.classList.add('loading-indicator') : document.body.classList.remove('loading-indicator')}
    </>
  )
}


export default OperatorListTable

