

// export const domainUriPrefix = 'https://lybertinapp.page.link';

export const BASEURL = 'https://api.ebhuktan.com';
const apiBaseUrl = `${BASEURL}/api/`;
export const SaveBillOption = ['Home', 'Mom', 'Office', 'Other']


const APIUser = `${apiBaseUrl}user/`
const APICluster = `${apiBaseUrl}cluster/`
const APISuperadmin = `${apiBaseUrl}superAdmin/`

export const ApiUrl = {
  signup: `${APIUser}signup`,
  createUser: `${APIUser}createUser`,
  accountVerification: `${APIUser}accountVerification`,
  login: `${APIUser}login`,
  update: `${APIUser}update`,
  forgotPassword: `${APISuperadmin}forgotPassword`,
  resetPassword: `${APISuperadmin}resetPassword`,
  changePassword: `${APIUser}changePassword`,
  getById: `${APIUser}getById`,
  superadminGetUsers: `${APISuperadmin}/getUsers`,
  superadminGetAllUsers: `${APISuperadmin}/getAll`,

  // transaction api
  transactionAll: `${apiBaseUrl}transaction/getAll`,
  transaction_getElectricity: `${apiBaseUrl}transaction/getElectricity`,
  transaction_getRecharge: `${apiBaseUrl}transaction/getRecharge`,
  transaction_getWaterBill: `${apiBaseUrl}transaction/getWaterBill`,
  transaction_getBroadBand: `${apiBaseUrl}transaction/getBroadBand`,
  transaction_getLPGGas: `${apiBaseUrl}transaction/getLPGGas`,
  transaction_getfastTag: `${apiBaseUrl}transaction/getfastTag`,
  transaction_getDTHRecharge: `${apiBaseUrl}transaction/getDTHRecharge`,
  transaction_getMunicipality: `${apiBaseUrl}transaction/getMunicipality`,
  transaction_getCardPayment: `${apiBaseUrl}transaction/getCardPayment`,

  // user forder api 
  user_getById: `${APIUser}getById`,

  // this is cluster api
  getClusterAll: `${APISuperadmin}getCluster`,


  rechargeGetOperatorList: `${apiBaseUrl}recharge/getOperatorList`,
  clusterPostList: `${apiBaseUrl}cluster/create`,

  fastTagGetOperatorList: `${apiBaseUrl}fastTag/getOperatorList`,
  fastTagFetchDetails: `${apiBaseUrl}fastTag/fetchDetails`,

  electricityGetOperatorList: `${apiBaseUrl}electricity/bill-payment/getOperaterList`,
  electricityGetState: `${apiBaseUrl}electricity/bill-payment/getState`,
  electricityFetchBill: `${apiBaseUrl}electricity/bill-payment/fetchBill`,

  waterGetOperaterList: `${apiBaseUrl}water/bill-payment/getOperaterList`,

  lpgGetOperatorList: `${apiBaseUrl}lpg-gas/getOperatorList`,
  lpgGetBookingList: `${apiBaseUrl}lpg-gas/getBookingList`,
  lpgFetchDetails: `${apiBaseUrl}lpg-gas/fetchDetails`,

  municipalityGetOperatorList: `${apiBaseUrl}municipality/getOperatorList`,
  municipalityFetchDetails: `${apiBaseUrl}municipality/fetchDetails`,

  cardPaymentGenerateOTP: `${apiBaseUrl}card-payment/generateOTP`,

  DthGetOperatorList: `${apiBaseUrl}dth-recharge/getOperatorList`,

  broadbandGetOperatorList: `${apiBaseUrl}broadband/bill-payment/getOperaterList`,
  broadbandFetchBill: `${apiBaseUrl}broadband/bill-payment/fetchBill`,

};