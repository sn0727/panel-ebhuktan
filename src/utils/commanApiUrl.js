

// export const domainUriPrefix = 'https://lybertinapp.page.link';

import axios from "axios";

export const BASEURL = 'https://api.ebhuktan.com';
const apiBaseUrl = `${BASEURL}/api/`;
export const SaveBillOption = ['Home', 'Mom', 'Office', 'Other']


const APIUser = `${apiBaseUrl}user/`
const APISuperadmin = `${apiBaseUrl}superAdmin/`

export const ApiUrl = {
  signup: `${APIUser}signup`,
  createUser: `${APIUser}createUser`,
  accountVerification: `${APIUser}accountVerification`,
  // login: `${APIUser}login`,
  login: `${APISuperadmin}login`,
  update: `${APIUser}update`,
  addAmount: `${APIUser}addAmount`,
  walletTransfer: `${APIUser}walletTransfer`,


  forgotPassword: `${APISuperadmin}forgotPassword`,
  resetPassword: `${APISuperadmin}resetPassword`,
  changePassword: `${APIUser}changePassword`,
  getByToken: `${APIUser}getByToken`,
  superadminGetUsers: `${APISuperadmin}getUsers`,
  superadminGetAllUsers: `${APISuperadmin}getAll`,
  superadminGetCount: `${APISuperadmin}getCount`,
  superadminDeleteUser: `${APISuperadmin}deleteUser`,
  superadminGetNestedCommission: `${APISuperadmin}getNestedCommission`,


  // updateCommission
  updateMobileRechargeCommission : `${apiBaseUrl}recharge/updateCommission`,
  electricityUpdateCommission : `${apiBaseUrl}electricity/bill-payment/updateCommission`,
  fastTagUpdateCommission : `${apiBaseUrl}fastTag/updateCommission`,
  lpgGasUpdateCommission : `${apiBaseUrl}lpg-gas/updateCommission`,
  municipalityUpdateCommission : `${apiBaseUrl}municipality/updateCommission`,
  dthRechargeUpdateCommission : `${apiBaseUrl}dth-recharge/updateCommission`,
  broadbandBillPaymentUpdateCommission : `${apiBaseUrl}broadband/bill-payment/updateCommission`,
  waterBillPaymentUpdateCommission : `${apiBaseUrl}water/bill-payment/updateCommission`,


  // add Icon operator image
  MobileRechargeAddIcon : `${apiBaseUrl}recharge/addIcon`,
  electricityOperatorAddIcon : `${apiBaseUrl}electricity/bill-payment/addIcon`,
  fastTagOperatorAddIcon : `${apiBaseUrl}fastTag/addIcon`,
  lpgGasOperatorAddIcon : `${apiBaseUrl}lpg-gas/addIcon`,
  municipalityOperatorAddIcon : `${apiBaseUrl}municipality/addIcon`,



  // transaction api
  transaction_commission_getAll: `${apiBaseUrl}transaction/commission/getAll`,
  transaction_getType: `${apiBaseUrl}transaction/getType`,
  transactionAll: `${apiBaseUrl}transaction/getAllTransaction`,
  // transactionAll: `${apiBaseUrl}transaction/getAll`,
  transaction_getElectricity: `${apiBaseUrl}transaction/getElectricity`,
  transaction_getRecharge: `${apiBaseUrl}transaction/getRecharge`,
  transaction_getWaterBill: `${apiBaseUrl}transaction/getWaterBill`,
  transaction_getBroadBand: `${apiBaseUrl}transaction/getBroadBand`,
  transaction_getLPGGas: `${apiBaseUrl}transaction/getLPGGas`,
  transaction_getfastTag: `${apiBaseUrl}transaction/getfastTag`,
  transaction_getDTHRecharge: `${apiBaseUrl}transaction/getDTHRecharge`,
  transaction_getMunicipality: `${apiBaseUrl}transaction/getMunicipality`,
  transaction_getCardPayment: `${apiBaseUrl}transaction/getCardPayment`,
  transaction_getWallet: `${apiBaseUrl}transaction/wallet/get/transaction`,

  // user forder api 
  user_getById: `${APIUser}getById`,

  // this is cluster api
  getClusterAll: `${APISuperadmin}getCluster`,
  getPendingCluster: `${APISuperadmin}getPendingCluster`,
  updateStatus: `${APISuperadmin}updateStatus`,
  // this is cluster api

  // this is Distributor api
  getDistributorAll: `${APISuperadmin}getDistributor`,
  getPendingDistributor: `${APISuperadmin}getPendingDistributor`,
  // this is Distributor api

  // this is Retailer api
  getRetailerAll: `${APISuperadmin}getRetailer`,
  getPendingRetailer: `${APISuperadmin}getPendingRetailer`,
  // this is Retailer api

  // this is Retailer api
  getFranchiseAll: `${APISuperadmin}getFranchise`,
  getPendingFranchise: `${APISuperadmin}getPendingFranchise`,
  // this is Retailer api

  // this is user api
  getUsersAll: `${APISuperadmin}getUsers`,
  getPendingUser: `${APISuperadmin}getPendingUser`,
  // this is user api

  rechargeGetOperatorList: `${apiBaseUrl}recharge/getOperatorList`,

  fastTagGetOperatorList: `${apiBaseUrl}fastTag/getOperatorList`,
  fastTagFetchDetails: `${apiBaseUrl}fastTag/fetchDetails`,

  electricityGetOperatorList: `${apiBaseUrl}electricity/bill-payment/getOperaterList`,
  electricityGetState: `${apiBaseUrl}electricity/bill-payment/getState`,
  electricityFetchBill: `${apiBaseUrl}electricity/bill-payment/fetchBill`,
  

  waterGetOperaterList: `${apiBaseUrl}water/bill-payment/getOperaterList`,

  lpgGetOperatorList: `${apiBaseUrl}lpg-gas/getOperatorList`,
  lpgGetBookingList: `${apiBaseUrl}lpg-gas/getBookingList`,
  lpgGasGetOperatorList: `${apiBaseUrl}lpg-gas/getOperatorList`,
  lpgFetchDetails: `${apiBaseUrl}lpg-gas/fetchDetails`,

  municipalityGetOperatorList: `${apiBaseUrl}municipality/getOperatorList`,
  municipalityFetchDetails: `${apiBaseUrl}municipality/fetchDetails`,

  cardPaymentGenerateOTP: `${apiBaseUrl}card-payment/generateOTP`,

  DthGetOperatorList: `${apiBaseUrl}dth-recharge/getOperatorList`,

  broadbandGetOperatorList: `${apiBaseUrl}broadband/bill-payment/getOperaterList`,
  broadbandFetchBill: `${apiBaseUrl}broadband/bill-payment/fetchBill`,

};




export const APIRequest = async (config = {}, onSuccess, onError, noAuth = null) => {

  const token = localStorage.getItem("token");

  try {
    let data = {};
    if (token && noAuth == null) {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token: token,
        },
      };
    } else {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
    }
    console.log(data);
    axios(data)
      .then(res => {
        if (res.status == 200 || res.status == 201) {
          onSuccess(res.data);
        }
      })
      .catch(err => {
        console.log(err);
        onError(err?.response.data);
      });
  } catch (error) {
    console.log("error", error);
  }
};

export const APIRequestWithFile = async (config = {}, onSuccess, onError) => {
  const token = localStorage.getItem("token");

  try {
    let data;
    if (token) {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
          token: token

        },
      };
    } else {
      data = {
        method: config.method,
        url: config.url,
        data: config.body,
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
        },
      };
    }

    console.log('config', data);
    axios(data)
      .then(res => {
        if (res.status == 200 || res.status == 201) {
          console.log(res.data);
          onSuccess(res.data);
        }
      })
      .catch(err => {
        onError(err?.response);
      });
  } catch (error) {
    console.log(error);
  }
};