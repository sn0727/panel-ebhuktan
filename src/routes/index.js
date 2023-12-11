// All components mapping with path for internal routes

import { lazy } from 'react'
import FastTagOperator from '../pages/protected/operator/FastTagOperator'
import GasOperator from '../pages/protected/operator/GasOperator'
import LPGGasOperator from '../pages/protected/operator/LPGGasOperator'
import Commission from '../pages/protected/Commission'
import MunicipalityOperator from '../pages/protected/operator/MunicipalityOperator'
import DTHRechargeOperator from '../pages/protected/operator/DTHRechargeOperator'
import BroadbandBillPaymentOperator from '../pages/protected/operator/BroadbandBillPaymentOperator'
import WaterBillPaymentOperator from '../pages/protected/operator/WaterBillPaymentOperator'
import CustomizeCommission from '../pages/protected/CustomizeCommission'
import PostpaidMobileRechargeOperator from '../pages/protected/operator/PostpaidMobileRechargeOperator'
import LandlineBillPaymentOperator from '../pages/protected/operator/LandlineBillPaymentOperator'
import CableRechargeOperator from '../pages/protected/operator/CableRechargeOperator'
import LoanEmiRechargeOperator from '../pages/protected/operator/LoanEmiRechargeOperator'
import InsuranceEmiRechargeOperator from '../pages/protected/operator/InsuranceEmiRechargeOperator'
import { ChangePassword } from '../pages/protected/ChangePassword'
const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Welcome = lazy(() => import('../pages/protected/Welcome'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Charts = lazy(() => import('../pages/protected/Charts'))
const Cluster = lazy(() => import('../pages/protected/Cluster'))
const Integration = lazy(() => import('../pages/protected/Integration'))
const Calendar = lazy(() => import('../pages/protected/Calendar'))
const Team = lazy(() => import('../pages/protected/Team'))
const Transactions = lazy(() => import('../pages/protected/Transactions'))
const Bills = lazy(() => import('../pages/protected/Bills'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
const GettingStarted = lazy(() => import('../pages/GettingStarted'))
const DocFeatures = lazy(() => import('../pages/DocFeatures'))
const DocComponents = lazy(() => import('../pages/DocComponents'))
// import new page
const UpiTransaction = lazy(() => import('../pages/protected/UpiTransaction'))
const ToContact = lazy(() => import('../pages/protected/ToContact'))
const MobileRecharge = lazy(() => import('../pages/protected/MobileRecharge'))
const GasBooking = lazy(() => import('../pages/protected/GasBooking'))
const Electricity = lazy(() => import('../pages/protected/Electricity'))
const Wallet = lazy(() => import('../pages/protected/Wallet'))
const WatterBill = lazy(() => import('../pages/protected/WatterBill'))
const DthRecharge = lazy(() => import('../pages/protected/DthRecharge'))
const BoardBandService = lazy(() => import('../pages/protected/BoardBandService'))
const MunicipalService = lazy(() => import('../pages/protected/MunicipalService'))
const CreditCard = lazy(() => import('../pages/protected/CreditCard'))
const CommissionTransaction = lazy(() => import('../pages/protected/CommissionTransaction'))
const FASTag = lazy(() => import('../pages/protected/Fastag'))
const Distributor = lazy(() => import('../pages/protected/Distributor'))
const Retailer = lazy(() => import('../pages/protected/Retailer'))
const Franchise = lazy(() => import('../pages/protected/Franchise'))
const ClientUser = lazy(() => import('../pages/protected/ClientUser'))
const OperatorElectricity = lazy(() => import('../pages/protected/operator/Electricity'))
const MobileRechargeOperators = lazy(()=> import('../pages/protected/operator/MobileRechargeOperator'))
const SubAdmin = lazy(()=> import('../pages/protected/SubAdmin'))
const ReseRequest = lazy(()=> import('../pages/protected/RiseRequest'))
const QuickDhanTransaction = lazy(()=> import('../pages/protected/QuickDhan'))



const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/subAdmin',
    component: SubAdmin
  },
  {
    path: '/distributor',
    component: Distributor
  },
  {
    path: '/retailer',
    component: Retailer
  },
  {
    path: '/franchise',
    component: Franchise
  },
  {
    path: '/client-user',
    component: ClientUser
  },
  {
    path: "/send-via-upi",
    component: UpiTransaction
  },
  {
    path: "/to-contact",
    component: ToContact
  },
  {
    path: "/mobile-recharge",
    component: MobileRecharge
  },
  {
    path: "/gas-booking",
    component: GasBooking
  },
  {
    path: "/electricity-bill",
    component: Electricity
  },
  {
    path: "/wallet",
    component: Wallet
  },
  {
    path: "/quick-dhan-transaction",
    component: QuickDhanTransaction
  },
  {
    path: "/riseRequest",
    component: ReseRequest
  },
  {
    path: "/watter-bill",
    component: WatterBill
  },
  {
    path: "/dth-recharge",
    component: DthRecharge
  },
  {
    path: "/boardband-service",
    component: BoardBandService
  },
  {
    path: "/municipal-service",
    component: MunicipalService
  },
  {
    path: "/credit-card",
    component: CreditCard
  },
  {
    path: "/commission-transaction",
    component: CommissionTransaction
  },
  {
    path: "/customize-commission",
    component: CustomizeCommission
  },
  {
    path: "/fastag",
    component: FASTag
  },

  // Operator route
  {
    path: "/operator/electricity",
    component: OperatorElectricity
  },
  {
    path: "/operator/mobile-recharge-operator",
    component: MobileRechargeOperators
  },
  {
    path: "/operator/postpaid-mobile-recharge-operator",
    component: PostpaidMobileRechargeOperator
  },
  {
    path: "/operator/fast-tag-operator",
    component: FastTagOperator
  },
  {
    path: "/operator/gas-operator",
    component: GasOperator
  },
  {
    path: "/operator/lpg-gas-operator",
    component: LPGGasOperator
  },
  {
    path: "/operator/municipality-operator",
    component: MunicipalityOperator
  },
  {
    path: "/operator/dth-Recharge-operator",
    component: DTHRechargeOperator
  },
  {
    path: "/operator/cable-Recharge-operator",
    component: CableRechargeOperator
  },
  {
    path: "/operator/broadband-bill-Payment",
    component: BroadbandBillPaymentOperator
  },
  {
    path: "/operator/landline-bill-Payment",
    component: LandlineBillPaymentOperator
  },
  {
    path: "/operator/watter-bill-Payment",
    component: WaterBillPaymentOperator
  },
  {
    path: "/operator/loan-emi-Payment",
    component: LoanEmiRechargeOperator
  },
  {
    path: "/operator/insurance-emi-Payment",
    component: InsuranceEmiRechargeOperator
  },
  {
    path: "/Commission",
    component: Commission
  },



  
  {
    path: '/welcome', // the url
    component: Welcome, // view rendered
  },
  {
    path: '/cluster',
    component: Cluster,
  },
  {
    path: '/settings-team',
    component: Team,
  },
  {
    path: '/calendar',
    component: Calendar,
  },
  {
    path: '/transactions',
    component: Transactions,
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
  },
  {
    path: '/change-password',
    component: ChangePassword,
  },
  {
    path: '/settings-billing',
    component: Bills,
  },
  {
    path: '/getting-started',
    component: GettingStarted,
  },
  {
    path: '/features',
    component: DocFeatures,
  },
  {
    path: '/components',
    component: DocComponents,
  },
  {
    path: '/integration',
    component: Integration,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
