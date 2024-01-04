// All components mapping with path for internal routes

import { lazy } from 'react'
import { ChangePassword } from '../pages/protected/ChangePassword'
import VehicleInsurance from '../pages/protected/InsuranceService/VehicleInsurance';

const HealthInsurance = lazy(() => import('../pages/protected/InsuranceService/HealthInsurance'));
const TravelInsurance = lazy(() => import('../pages/protected/InsuranceService/TravelInsurance'));
const GroupInsurance = lazy(() => import('../pages/protected/InsuranceService/GroupInsurance'));
const LifeInsurance = lazy(() => import('../pages/protected/InsuranceService/LifeInsurance'));

const DigitalMarketing = lazy(() => import('../pages/protected/FinanceServices/DigitalMarketing'));
const DigitalSignature = lazy(() => import('../pages/protected/FinanceServices/DigitalSignature'));

const BusinessLoan = lazy(() => import('../pages/protected/LoanSearvices/BusinessLoan'));
const HousingLoan = lazy(() => import('../pages/protected/LoanSearvices/HousingLoan'));
const LoanAgainstProperty = lazy(() => import('../pages/protected/LoanSearvices/LoanAgainstProperty'));
const MSMELoan = lazy(() => import('../pages/protected/LoanSearvices/MSMELoan'));
const PersonalLoan = lazy(() => import('../pages/protected/LoanSearvices/PersonalLoan'));


const FastTagOperator = lazy(() => import('../pages/protected/operator/FastTagOperator'));
const GasOperator = lazy(() => import('../pages/protected/operator/GasOperator'));
const LPGGasOperator = lazy(() => import('../pages/protected/operator/LPGGasOperator'));
const Commission = lazy(() => import('../pages/protected/Commission'));
const MunicipalityOperator = lazy(() => import('../pages/protected/operator/MunicipalityOperator'));
const DTHRechargeOperator = lazy(() => import('../pages/protected/operator/DTHRechargeOperator'));
const BroadbandBillPaymentOperator = lazy(() => import('../pages/protected/operator/BroadbandBillPaymentOperator'));
const WaterBillPaymentOperator = lazy(() => import('../pages/protected/operator/WaterBillPaymentOperator'));
const CustomizeCommission = lazy(() => import('../pages/protected/CustomizeCommission'));
const PostpaidMobileRechargeOperator = lazy(() => import('../pages/protected/operator/PostpaidMobileRechargeOperator'));
const LandlineBillPaymentOperator = lazy(() => import('../pages/protected/operator/LandlineBillPaymentOperator'));
const CableRechargeOperator = lazy(() => import('../pages/protected/operator/CableRechargeOperator'));
const LoanEmiRechargeOperator = lazy(() => import('../pages/protected/operator/LoanEmiRechargeOperator'));
const InsuranceEmiRechargeOperator = lazy(() => import('../pages/protected/operator/InsuranceEmiRechargeOperator'));
const CompanyFormation = lazy(() => import('../pages/protected/FinanceServices/CompanyFormation'));
const Gst = lazy(() => import('../pages/protected/FinanceServices/Gst'));
const PanCard = lazy(() => import('../pages/protected/FinanceServices/PanCard'));
const Itr = lazy(() => import('../pages/protected/FinanceServices/Itr'));
const DesignDevelopment = lazy(() => import('../pages/protected/FinanceServices/DesignDevelopment'))
const AccountService = lazy(() => import('../pages/protected/FinanceServices/AccountService'))
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
const MobileRechargeOperators = lazy(() => import('../pages/protected/operator/MobileRechargeOperator'))
const SubAdmin = lazy(() => import('../pages/protected/SubAdmin'))
const ReseRequest = lazy(() => import('../pages/protected/RiseRequest'))
const QuickDhanTransaction = lazy(() => import('../pages/protected/QuickDhan'))



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


  // Finance Services route
  {
    path: "/FinanceServices/company-formation",
    component: CompanyFormation
  },
  {
    path: "/FinanceServices/gst",
    component: Gst
  },
  {
    path: "/FinanceServices/pan-card",
    component: PanCard
  },
  {
    path: "/FinanceServices/itr",
    component: Itr
  },
  {
    path: "/FinanceServices/design-development",
    component: DesignDevelopment
  },
  {
    path: "/FinanceServices/account-service",
    component: AccountService
  },
  {
    path: "/FinanceServices/digital-marketing",
    component: DigitalMarketing
  },
  {
    path: "/FinanceServices/digital-signature",
    component: DigitalSignature
  },

  // Insurance Service components
  {
    path: "/InsuranceSearvices/health-insurance",
    component: HealthInsurance
  },
  {
    path: "/InsuranceSearvices/travel-insurance",
    component: TravelInsurance
  },
  {
    path: "/InsuranceSearvices/group-insurance",
    component: GroupInsurance
  },
  {
    path: "/InsuranceSearvices/life-insurance",
    component: LifeInsurance
  },
  {
    path: "/InsuranceSearvices/vehicle-insurance",
    component: VehicleInsurance
  },

  // Loan services path route
  {
    path: "/LoanSearvices/business-loan",
    component: BusinessLoan
  },
  {
    path: "/LoanSearvices/housing-loan",
    component: HousingLoan
  },
  {
    path: "/LoanSearvices/loan-against-property",
    component: LoanAgainstProperty
  },
  {
    path: "/LoanSearvices/msme-loan",
    component: MSMELoan
  },
  {
    path: "/LoanSearvices/personal-loan",
    component: PersonalLoan
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
