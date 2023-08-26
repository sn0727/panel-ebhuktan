/** Icons are imported separatly to reduce build time */
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import KeyIcon from '@heroicons/react/24/outline/KeyIcon'
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon';
import { MdPayment } from 'react-icons/md';
import { AiOutlineMobile } from 'react-icons/ai';
import { AiOutlineContacts } from 'react-icons/ai';
import { LiaGasPumpSolid } from 'react-icons/lia';
import { GiElectric } from 'react-icons/gi';
import { AiOutlineWallet } from 'react-icons/ai';
import { BsWater } from 'react-icons/bs';
import { TbRecharging } from 'react-icons/tb';
import { BsClipboardData } from 'react-icons/bs';
import { RiCommunityLine } from 'react-icons/ri';
import { AiFillCreditCard } from 'react-icons/ai';
import { RiHealthBookLine } from 'react-icons/ri';
import { SiFastapi } from 'react-icons/si';
import { MdMiscellaneousServices } from 'react-icons/md';
import { SiYourtraveldottv } from 'react-icons/si';
import { BiUserCircle } from 'react-icons/bi';
import { BiUserCheck } from 'react-icons/bi';
import { BiUserPin } from 'react-icons/bi';
import { BiUserPlus } from 'react-icons/bi';
import { BiUserVoice } from 'react-icons/bi';
// import { Jwt } from 'jsonwebtoken'
import jwtDecode from 'jwt-decode';

function tokenTa() {
  var token = localStorage.getItem("token")
  const decodedToken = jwtDecode(token);
  const { role } = decodedToken.user

  switch (role) {
    case "cluster":
      return role
      break;
    case "distributor":
      return role
      break;
    case "retailer":
      return role
      break;
    default:
      break;
  }

}
const RoleRetirn = tokenTa()

console.log(RoleRetirn)






const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [
  
  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses} />,
    name: 'Dashboard',
  },
  // {
  //   path: '/app/cluster', // url
  //   icon: <InboxArrowDownIcon className={iconClasses} />, // icon component
  //   name: 'Cluster', // name that appear in Sidebar
  // },
  // {
  //   path: '/app/transactions', // url
  //   icon: <CurrencyDollarIcon className={iconClasses} />, // icon component
  //   name: 'Transactions', // name that appear in Sidebar
  // },
  {
    path: "",
    icon: <BiUserCircle className={`${iconClasses} inline`} />,
    name: "UserRoll",
    submenu: [
      {
        path: '/app/cluster',
        icon: <BiUserCheck className={submenuIconClasses} />,
        name: 'Cluster',

      },
      {
        path: '/app/distributor',
        icon: <BiUserPin className={submenuIconClasses} />,
        name: 'Distributor',
      },
      {
        path: '/app/retailer',
        icon: <BiUserPlus className={submenuIconClasses} />,
        name: 'Retailer',
      },
      {
        path: '/app/client-user',
        icon: <BiUserVoice className={submenuIconClasses} />,
        name: 'User',
      }
    ]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <MdMiscellaneousServices className={`${iconClasses} inline`} />, // icon component
    name: 'Recharge & Bill Payment', // name that appear in Sidebar
    submenu: [
      {
        path: '/app/transactions',
        icon: <CurrencyDollarIcon className={iconClasses} />,
        name: 'All Transactions',
      },
      // {
      //   path: '/app/send-via-upi',
      //   icon: <MdPayment className={submenuIconClasses} />,
      //   name: 'Send Via UPI',
      // },
      // {
      //   path: '/app/to-contact', //url
      //   icon: <AiOutlineContacts className={submenuIconClasses} />, // icon component
      //   name: 'To Contacts', // name that appear in Sidebar
      // },
      {
        path: '/app/mobile-recharge',
        icon: <AiOutlineMobile className={submenuIconClasses} />,
        name: 'Mobile Recharge',
      },
      {
        path: '/app/gas-booking',
        icon: <LiaGasPumpSolid className={submenuIconClasses} />,
        name: 'Gas Booking',
      },
      {
        path: '/app/electricity-bill',
        icon: <GiElectric className={submenuIconClasses} />,
        name: 'Electricity',
      },
      {
        path: '/app/wallet',
        icon: <BsWater className={submenuIconClasses} />,
        name: 'Wallet',
      },
      {
        path: '/app/watter-bill',
        icon: <TbRecharging className={submenuIconClasses} />,
        name: 'Water Bill',
      },
      {
        path: '/app/dth-recharge',
        icon: <BsClipboardData className={submenuIconClasses} />,
        name: 'DTH Recharge',
      },
      {
        path: '/app/boardband-service',
        icon: <RiCommunityLine className={submenuIconClasses} />,
        name: 'Broadband Services',
      },
      {
        path: '/app/municipal-service',
        icon: <AiOutlineWallet className={submenuIconClasses} />,
        name: 'Municipal Services',
      },
      {
        path: '/app/credit-card',
        icon: <AiFillCreditCard className={submenuIconClasses} />,
        name: 'Credit Card',
      },
      // {
      //   path: '/app/insurance',
      //   icon: <RiHealthBookLine className={submenuIconClasses} />,
      //   name: 'Insurance',
      // },
      {
        path: '/app/fastag',
        icon: <SiFastapi className={submenuIconClasses} />,
        name: 'FASTag',
      }

    ]
  },
  // all services hide in the section
  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <TbRecharging className={`${iconClasses} inline`} />, // icon component
  //   name: 'Banking Services & Insurance', // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: '/',
  //       icon: <MdPayment className={submenuIconClasses} />,
  //       name: 'Wallet',
  //     },
  //     {
  //       path: '/', //url
  //       icon: <AiOutlineContacts className={submenuIconClasses} />, // icon component
  //       name: 'AEPS', // name that appear in Sidebar
  //     },
  //     {
  //       path: '/',
  //       icon: <AiOutlineMobile className={submenuIconClasses} />,
  //       name: 'Money Transfer',
  //     },
  //     {
  //       path: '/',
  //       icon: <LiaGasPumpSolid className={submenuIconClasses} />,
  //       name: 'Cash Deposit',
  //     },
  //     {
  //       path: '/',
  //       icon: <GiElectric className={submenuIconClasses} />,
  //       name: 'Withdrawal',
  //     },
  //     {
  //       path: '/',
  //       icon: <BsWater className={submenuIconClasses} />,
  //       name: 'Personal Loan',
  //     },
  //     {
  //       path: '/',
  //       icon: <TbRecharging className={submenuIconClasses} />,
  //       name: 'Insurance',
  //     },
  //     {
  //       path: '/',
  //       icon: <BsClipboardData className={submenuIconClasses} />,
  //       name: 'Group Team Insurance',
  //     },
  //     {
  //       path: '/',
  //       icon: <RiCommunityLine className={submenuIconClasses} />,
  //       name: 'Life Insurance',
  //     },
  //     {
  //       path: '/',
  //       icon: <AiOutlineWallet className={submenuIconClasses} />,
  //       name: 'Life Insurance',
  //     },
  //     {
  //       path: '/',
  //       icon: <AiFillCreditCard className={submenuIconClasses} />,
  //       name: 'Commercial Insurance',
  //     },
  //     {
  //       path: '/',
  //       icon: <RiHealthBookLine className={submenuIconClasses} />,
  //       name: 'Bike Insurance',
  //     },
  //     {
  //       path: '/',
  //       icon: <SiFastapi className={submenuIconClasses} />,
  //       name: 'FASTag',
  //     }

  //   ]
  // },
  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <SiYourtraveldottv className={`${iconClasses} inline`} />, // icon component
  //   name: 'Tour & Travel', // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: '/',
  //       icon: <MdPayment className={submenuIconClasses} />,
  //       name: 'Hotel',
  //     },
  //     {
  //       path: '/', //url
  //       icon: <AiOutlineContacts className={submenuIconClasses} />, // icon component
  //       name: 'Flights', // name that appear in Sidebar
  //     },
  //     {
  //       path: '/',
  //       icon: <AiOutlineMobile className={submenuIconClasses} />,
  //       name: 'Bus',
  //     },
  //     {
  //       path: '/',
  //       icon: <LiaGasPumpSolid className={submenuIconClasses} />,
  //       name: 'Train',
  //     },
  //     {
  //       path: '/',
  //       icon: <GiElectric className={submenuIconClasses} />,
  //       name: 'Tour & Travel',
  //     },
  //     {
  //       path: '/',
  //       icon: <BsWater className={submenuIconClasses} />,
  //       name: 'Offers & Package',
  //     }
  //   ]
  // },
  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <TbRecharging className={`${iconClasses} inline`} />, // icon component
  //   name: 'Financial Services', // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: '/',
  //       icon: <MdPayment className={submenuIconClasses} />,
  //       name: 'Company Formation',
  //     },
  //     {
  //       path: '/to-contact', //url
  //       icon: <AiOutlineContacts className={submenuIconClasses} />, // icon component
  //       name: 'GST', // name that appear in Sidebar
  //     },
  //     {
  //       path: '/',
  //       icon: <AiOutlineMobile className={submenuIconClasses} />,
  //       name: 'Pan Card',
  //     },
  //     {
  //       path: '/',
  //       icon: <LiaGasPumpSolid className={submenuIconClasses} />,
  //       name: 'ITR',
  //     },
  //     {
  //       path: '',
  //       icon: <GiElectric className={submenuIconClasses} />,
  //       name: 'Design & Development ',
  //     },
  //     {
  //       path: '/',
  //       icon: <BsWater className={submenuIconClasses} />,
  //       name: 'Accounting Services',
  //     },
  //     {
  //       path: '/',
  //       icon: <TbRecharging className={submenuIconClasses} />,
  //       name: 'Gold Investment',
  //     },
  //     {
  //       path: '/',
  //       icon: <BsClipboardData className={submenuIconClasses} />,
  //       name: 'Digital Marketing',
  //     },
  //     {
  //       path: '/',
  //       icon: <RiCommunityLine className={submenuIconClasses} />,
  //       name: 'Mutual Fund',
  //     },
  //     {
  //       path: '/',
  //       icon: <AiOutlineWallet className={submenuIconClasses} />,
  //       name: 'Bond Investment',
  //     },
  //     {
  //       path: '/',
  //       icon: <AiFillCreditCard className={submenuIconClasses} />,
  //       name: 'Education Fee',
  //     },
  //     {
  //       path: '/',
  //       icon: <RiHealthBookLine className={submenuIconClasses} />,
  //       name: 'Digital Signature',
  //     }
  //   ]
  // },
  // {
  //   path: '/app/charts', // url
  //   icon: <ChartBarIcon className={iconClasses} />, // icon component
  //   name: 'Analytics', // name that appear in Sidebar
  // },
  // {
  //   path: '/app/integration', // url
  //   icon: <BoltIcon className={iconClasses} />, // icon component
  //   name: 'Integration', // name that appear in Sidebar
  // },
  // {
  //   path: '/app/calendar', // url
  //   icon: <CalendarDaysIcon className={iconClasses} />, // icon component
  //   name: 'Calendar', // name that appear in Sidebar
  // },

  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, // icon component
  //   name: 'Pages', // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: '/login',
  //       icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
  //       name: 'Login',
  //     },
  //     {
  //       path: '/register', //url
  //       icon: <UserIcon className={submenuIconClasses} />, // icon component
  //       name: 'Register', // name that appear in Sidebar
  //     },
  //     {
  //       path: '/forgot-password',
  //       icon: <KeyIcon className={submenuIconClasses} />,
  //       name: 'Forgot Password',
  //     },
  //     {
  //       path: '/app/blank',
  //       icon: <DocumentIcon className={submenuIconClasses} />,
  //       name: 'Blank Page',
  //     },
  //     {
  //       path: '/app/404',
  //       icon: <ExclamationTriangleIcon className={submenuIconClasses} />,
  //       name: '404',
  //     },
  //   ]
  // },
  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <Cog6ToothIcon className={`${iconClasses} inline`} />, // icon component
  //   name: 'Settings', // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: '/app/settings-profile', //url
  //       icon: <UserIcon className={submenuIconClasses} />, // icon component
  //       name: 'Profile', // name that appear in Sidebar
  //     },
  //     {
  //       path: '/app/settings-billing',
  //       icon: <WalletIcon className={submenuIconClasses} />,
  //       name: 'Billing',
  //     },
  //     {
  //       path: '/app/settings-team', // url
  //       icon: <UsersIcon className={submenuIconClasses} />, // icon component
  //       name: 'Team Members', // name that appear in Sidebar
  //     },
  //   ]
  // },
  // {
  //   path: '', //no url needed as this has submenu
  //   icon: <DocumentTextIcon className={`${iconClasses} inline`} />, // icon component
  //   name: 'Documentation', // name that appear in Sidebar
  //   submenu: [
  //     {
  //       path: '/app/getting-started', // url
  //       icon: <DocumentTextIcon className={submenuIconClasses} />, // icon component
  //       name: 'Getting Started', // name that appear in Sidebar
  //     },
  //     {
  //       path: '/app/features',
  //       icon: <TableCellsIcon className={submenuIconClasses} />,
  //       name: 'Features',
  //     },
  //     {
  //       path: '/app/components',
  //       icon: <CodeBracketSquareIcon className={submenuIconClasses} />,
  //       name: 'Components',
  //     }
  //   ]
  // },

]

export default routes


