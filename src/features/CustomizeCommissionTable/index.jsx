import moment from "moment"
import { useEffect, useState } from "react"
import { ApiUrl, APIRequest } from "../../utils/commanApiUrl"
import { useDispatch, useSelecmobiler } from "react-redux"
// import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard";
import Pagination from "../../components/pagination/Pagination";
import CustomizeCommissionModal from "../../components/Model/CustomizeCommissionModal";




const submenuIconClasses = `h-5 w-5`

function CustomizeCommissionTable({ pageTitlle, GetConfigList }) {
  const [isLoading, setisLoading] = useState(true);
  const [customizeCommission, setCustomizeCommission] = useState({})
  const [totalUser, setTotalUser] = useState("")
  const [currentPage, setCurrentPage] = useState(1);

  const { cluster, distributor, franchise, gst, retailer } = customizeCommission;

  // console.log(customizeCommission, "getCommission api url")

  const SendRequest = async () => {
    setisLoading(true)
    let config = {
      url: GetConfigList,
      method: 'get',
    };
    APIRequest(
      config,
      res => {
        console.log(res);
        setTotalUser(res?.count)
        setCustomizeCommission(res.data)
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
  }, [])

  return (
    <>
      <TitleCard title={pageTitlle} topMargin="mt-2">
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th className="text-right">Commission</th>
                <td className="text-right">Action</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <ul className="commission-customize">
                    <li>cluster</li>
                    <li>retailer</li>
                    <li>distributor</li>
                    <li>gst</li>
                    <li>franchise</li>
                  </ul>
                </td>
                <td>
                  <ul className="commission-customize">
                    <li className="text-right">{cluster}</li>
                    <li className="text-right">{retailer}</li>
                    <li className="text-right">{distributor}</li>
                    <li className="text-right">{gst}</li>
                    <li className="text-right">{franchise}</li>
                  </ul>
                </td>
                <td>
                  <ul className="commission-customize">
                    <li className="text-right"><CustomizeCommissionModal cluster={cluster} type='cluster' /></li>
                    <li className="text-right"><CustomizeCommissionModal retailer={retailer} type="retailer" /></li>
                    <li className="text-right"><CustomizeCommissionModal distributor={distributor} type="distributor" /></li>
                    <li className="text-right"><CustomizeCommissionModal gst={gst} type='gst' /></li>
                    <li className="text-right"><CustomizeCommissionModal franchise={franchise} type="franchise" /></li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Pagination apiRoute={ApiUrl.transaction_getElectricity} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </TitleCard>
      {isLoading ? document.body.classList.add('loading-indicator') : document.body.classList.remove('loading-indicator')}
    </>
  )
}


export default CustomizeCommissionTable

