import moment from "moment"
import { useEffect, useState } from "react"
import { ApiUrl, APIRequest } from "../../utils/commanApiUrl"
// import { useDispatch, useSelecmobiler } from "react-redux"
// import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard";
import Pagination from "../../components/pagination/Pagination";
import EditOperatorModal from "../../components/Model/EditOperatorModal";
import EditOperatorImageModal from "../../components/Model/EditOperatorImageModal";




const submenuIconClasses = `h-5 w-5`

function OperatorListTable({ pageTitlle, getOperatorList, getCommission, getAddIcon }) {
  const [isLoading, setisLoading] = useState(true);
  const [transaction, setTransaction] = useState([])
  const [totalUser, setTotalUser] = useState("")
  const [currentPage, setCurrentPage] = useState(1);

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
        console.log(res);
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

  // useEffect(() => {
  //   SendRequest()
  // }, [currentPage])
  useEffect(() => {
    SendRequest()
  }, [])

  return (
    <>
      <TitleCard title={pageTitlle} topMargin="mt-2">
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full operator_table">
          {transaction.length > 0 ?
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Commission type</th>
                  <th>Commission</th>
                  <th>Status</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {
                  transaction.map((l, k) => {
                    return (
                      <tr key={k}>
                        <td>{l.id}</td>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div className="avatar">
                              <div className="mask mask-circle w-12 h-12">
                                <img src={l.image} alt="Avatar" />
                                <EditOperatorImageModal id={l.id} getAddIcon={getAddIcon} />
                              </div>
                            </div>
                          </div>
                        </td>
                        {/* <td>{moment(l.date).format("D MMM")}</td> */}
                        <td>
                          <div className="description-data">{l.name}</div>
                        </td>
                        <td>{l.category}</td>
                        <td className="text-center">{l.isPercentage === "true" ? 'Percentage' : 'Fixed'}</td>
                        <td className="text-center">{l.commission}</td>
                        <td>{l.isEnable}</td>
                        <td>
                          <div className="m-4">
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

