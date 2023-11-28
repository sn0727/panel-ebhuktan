

// export const domainUriPrefix = 'https://lybertinapp.page.link';

import axios from "axios";

export const BASEURL = 'https://api.ebhuktan.com';
const apiBaseUrl = `${BASEURL}/api/`;
export const SaveBillOption = ['Home', 'Mom', 'Office', 'Other']


const APIUser = `${apiBaseUrl}user/`
const APISuperadmin = `${apiBaseUrl}superAdmin/`

export const ApiUrl = {
  // sub admin
  getSubAdmin: `${APISuperadmin}getSubAdmin`,

  signup: `${APIUser}signup`,
  createUser: `${APIUser}createUser`,
  accountVerification: `${APIUser}accountVerification`,
  // login: `${APIUser}login`,
  login: `${APISuperadmin}login`,
  update: `${APIUser}update`,
  addAmount: `${APIUser}addAmount`,
  walletTransfer: `${APIUser}walletTransfer`,
  aadhaarWithOTP: `${APIUser}verification/aadhaarWithOTP`,
  verifyAadhaarOTP: `${APIUser}verification/verifyAadhaarOTP`,

  // verify api mobile no and aadhaar no.
  sendOTPMobileNo: `${APIUser}sendOTP`,
  contactVerification: `${APIUser}contactVerification`,
  aadhaarWithOTP: `${APIUser}verification/aadhaarWithOTP`,
  verifyAadhaarOTP: `${APIUser}verification/verifyAadhaarOTP`,
  
  // Money Request api route end point
  riseRequestGetAll: `${APIUser}payment/request/getAll`,
  riseRequestDelete: `${APIUser}payment/request/delete`,
  riseRequestUpdateStatus: `${APIUser}payment/request/updateStatus`,
  


  forgotPassword: `${APISuperadmin}forgotPassword`,
  resetPassword: `${APISuperadmin}resetPassword`,
  changePassword: `${APIUser}changePassword`,
  changePasswordSuperAdmin: `${APISuperadmin}changePassword`,
  getByToken: `${APIUser}getByToken`,
  checkBalance: `${apiBaseUrl}superAdmin/checkBalance`,
  superadminGetUsers: `${APISuperadmin}getUsers`,
  superadminGetAllUsers: `${APISuperadmin}getAll`,
  superadminGetCount: `${APISuperadmin}getCount`,
  superadminDeleteUser: `${APISuperadmin}deleteUser`,
  superadminGetNestedCommission: `${APISuperadmin}getNestedCommission`,

  // profile update api
  editUserProfile: `${APISuperadmin}editUser`,
  editProfile: `${APIUser}updateProfile`,
  editProfileRes: `${APIUser}userCreate`,

    // checking email api
    checkEmail: `${APIUser}checkEmail`,

  // filter api data url
  getFilterTransaction: `${apiBaseUrl}transaction/getTransaction`,
  getFilterCommissionTranc: `${apiBaseUrl}transaction/getCommissionTransaction`,
  getPageLimit: `${apiBaseUrl}transaction/getPageLimit`,
  
  // role table filter api
  getFilterCluster: `${APISuperadmin}getFilterCluster`,
  getFilterDistributor: `${APISuperadmin}getFilterDistributor`,
  getFilterRetailer: `${APISuperadmin}getFilterRetailer`,
  getFilterFranchise: `${APISuperadmin}getFilterFranchise`,
  getFilterUsers: `${APISuperadmin}getFilterUsers`,
  
  // operator filter api
  electricitybillPaymentSearchOp: `${apiBaseUrl}electricity/bill-payment`,
  broadbandbillPaymentSearchOp: `${apiBaseUrl}broadband/bill-payment`,
  fastTagSearchOp: `${apiBaseUrl}fastTag`,
  gasSearchOp: `${apiBaseUrl}lpg-gas`,
  bookinGasSearchOp: `${apiBaseUrl}lpg-gas/booking`,
  municipalitySearchOp: `${apiBaseUrl}municipality`,
  dthRechargeSearchOp: `${apiBaseUrl}dth-recharge`,
  dthRechargeCableSearchOp: `${apiBaseUrl}dth-recharge/cable`,
  landlineSearchOp: `${apiBaseUrl}broadband/bill-payment/landline`,
  waterSearchOp: `${apiBaseUrl}water/bill-payment`,
  loanEmiSearchOp: `${apiBaseUrl}loan/EMI/payment`,
  insuranceSearchOp: `${apiBaseUrl}insurance/EMI/payment`,
  prepaidRechargeSearchOp: `${apiBaseUrl}recharge`,
  postpaidRechargeSearchOp: `${apiBaseUrl}recharge/postpaid`,



  // updateCommission
  updateMobileRechargeCommission: `${apiBaseUrl}recharge/updateCommission`,
  updatePostpaidMobileRechargeCommission: `${apiBaseUrl}recharge/postpaid/updateCommission`,
  electricityUpdateCommission: `${apiBaseUrl}electricity/bill-payment/updateCommission`,
  fastTagUpdateCommission: `${apiBaseUrl}fastTag/updateCommission`,
  lpgGasUpdateCommission: `${apiBaseUrl}lpg-gas/updateCommission`,
  municipalityUpdateCommission: `${apiBaseUrl}municipality/updateCommission`,
  dthRechargeUpdateCommission: `${apiBaseUrl}dth-recharge/updateCommission`,
  broadbandBillPaymentUpdateCommission: `${apiBaseUrl}broadband/bill-payment/updateCommission`,
  waterBillPaymentUpdateCommission: `${apiBaseUrl}water/bill-payment/updateCommission`,

  // total Commission transaction
  TotalCommissionTransaction: `${apiBaseUrl}transaction/totalCommission`,
  superAdminGetConfigList: `${apiBaseUrl}superAdmin/getConfig`,
  superAdminUpdateConfig: `${apiBaseUrl}superAdmin/updateConfig`,


  // add Icon operator image
  MobileRechargeAddIcon: `${apiBaseUrl}recharge/addIcon`,
  PostpaidMobileRechargeAddIcon: `${apiBaseUrl}recharge/postpaid/addIcon`,
  electricityOperatorAddIcon: `${apiBaseUrl}electricity/bill-payment/addIcon`,
  fastTagOperatorAddIcon: `${apiBaseUrl}fastTag/addIcon`,
  lpgGasOperatorAddIcon: `${apiBaseUrl}lpg-gas/addIcon`,
  municipalityOperatorAddIcon: `${apiBaseUrl}municipality/addIcon`,



  // transaction api
  // transaction_commission_getAll: `${apiBaseUrl}transaction/commission/getAll`,
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
  getWalletTransaction: `${apiBaseUrl}transaction/getWalletTransaction`,

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
  rechargePostpaidGetOperatorList: `${apiBaseUrl}recharge/postpaid/getOperatorList`,

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

  CableGetOperatorList: `${apiBaseUrl}dth-recharge/cable/getOperatorList`,
  CableUpdateCommission: `${apiBaseUrl}dth-recharge/cable/updateCommission`,
  CableAddIcon: `${apiBaseUrl}dth-recharge/cable/getOperatorList`,

  broadbandGetOperatorList: `${apiBaseUrl}broadband/bill-payment/getOperaterList`,
  broadbandFetchBill: `${apiBaseUrl}broadband/bill-payment/fetchBill`,

  LandlineGetOperatorList: `${apiBaseUrl}broadband/bill-payment/landline/getOperatorList`,
  LandlineUpdateCommission: `${apiBaseUrl}broadband/bill-payment/landline/updateCommission`,
  LandlineAddIcon: `${apiBaseUrl}broadband/bill-payment/landline/addIcon`,

  LoanGetOperatorList: `${apiBaseUrl}loan/EMI/payment/getOperatorList`,
  LoanUpdateCommission: `${apiBaseUrl}loan/EMI/payment/updateCommission`,
  LoanAddIcon: `${apiBaseUrl}loan/EMI/payment/addIcon`,

  InsuranceGetOperatorList: `${apiBaseUrl}insurance/EMI/payment/getOperatorList`,
  InsuranceUpdateCommission: `${apiBaseUrl}insurance/EMI/payment/updateCommission`,
  InsuranceAddIcon: `${apiBaseUrl}insurance/EMI/payment/addIcon`,

};




export const APIRequest = async (config = {}, onSuccess, onError, noAuth = null) => {

  const token = sessionStorage.getItem("token");

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
        console.log(res)
        if (res.status == 200 || res.status == 201 || res.status == 203) {
          onSuccess(res?.data);
        }
      })
      .catch(err => {
        console.log(err, "================dfd")
        onError(err?.response?.data);
      });
  } catch (error) {
    console.log("error", error);
  }
};

export const APIRequestWithFile = async (config = {}, onSuccess, onError) => {
  const token = sessionStorage.getItem("token");

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