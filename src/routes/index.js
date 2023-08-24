// All components mapping with path for internal routes

import { lazy } from 'react'

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
const ToContact = lazy(()=> import('../pages/protected/ToContact'))
const MobileRecharge = lazy(()=> import('../pages/protected/MobileRecharge'))
const GasBooking = lazy(()=> import('../pages/protected/GasBooking'))
const Electricity = lazy(()=> import('../pages/protected/Electricity'))
const Wallet = lazy(()=> import('../pages/protected/Wallet'))
const WatterBill = lazy(()=> import('../pages/protected/WatterBill'))
const DthRecharge = lazy(()=> import('../pages/protected/DthRecharge'))
const BoardBandService = lazy(()=> import('../pages/protected/BoardBandService'))
const MunicipalService = lazy(()=> import('../pages/protected/MunicipalService'))
const CreditCard = lazy(()=> import('../pages/protected/CreditCard'))
const Insurance = lazy(()=> import('../pages/protected/Insurance'))
const FASTag = lazy(()=> import('../pages/protected/Fastag'))
const Distributor = lazy(()=> import('../pages/protected/Distributor'))
const Retailer = lazy(()=> import('../pages/protected/Retailer'))
const ClientUser = lazy(()=> import('../pages/protected/ClientUser'))



const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path : '/distributor',
    component: Distributor
  },
  {
    path : '/retailer',
    component: Retailer
  },
  {
    path : '/client-user',
    component: ClientUser
  },
  {
    path : "/send-via-upi",
    component: UpiTransaction
  },
  {
    path : "/to-contact",
    component: ToContact
  },
  {
    path : "/mobile-recharge",
    component: MobileRecharge
  },
  {
    path : "/gas-booking",
    component: GasBooking
  },
  {
    path : "/electricity-bill",
    component: Electricity
  },
  {
    path : "/wallet",
    component: Wallet
  },
  {
    path : "/watter-bill",
    component: WatterBill
  },
  {
    path : "/dth-recharge",
    component : DthRecharge
  },
  {
    path : "/boardband-service",
    component : BoardBandService
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
    path: "/insurance",
    component: Insurance
  },
  {
    path : "/fastag",
    component : FASTag
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
