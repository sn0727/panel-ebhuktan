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
import { FaMobileAlt } from "react-icons/fa";
import { AiFillBank } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import { LiaUserAstronautSolid } from "react-icons/lia";
import { BiSolidWallet } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";

// import { Jwt } from 'jsonwebtoken'
import jwtDecode from 'jwt-decode';

var token = sessionStorage.getItem("token")
const decodedToken = jwtDecode(token);
const { role } = decodedToken.user

// alert(role)

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

let userSubMenu = [];
let userSubMenu1 = [];
if (role === "cluster") {
  userSubMenu.push(
    {
      path: '/app/distributor',
      icon: <BiUserCheck className={submenuIconClasses} />,
      name: 'District Partner',
    },
    {
      path: '/app/franchise',
      icon: <BiUserCheck className={submenuIconClasses} />,
      name: 'Franchise',
    },
    {
      path: '/app/retailer',
      icon: <BiUserCheck className={submenuIconClasses} />,
      name: 'Retailer',
    },
    {
      path: '/app/client-user',
      icon: <BiUserCheck className={submenuIconClasses} />,
      name: 'Users',
    },

  );
} else if (role === "distributor") {
  userSubMenu.push(
    {
      path: '/app/retailer',
      icon: <BiUserCheck className={submenuIconClasses} />,
      name: 'Retailer',
    },
    {
      path: '/app/franchise',
      icon: <BiUserCheck className={submenuIconClasses} />,
      name: 'Franchise',
    },
    {
      path: '/app/client-user',
      icon: <BiUserCheck className={submenuIconClasses} />,
      name: 'User',
    },

  );
} else if (role === "franchise") {
  userSubMenu.push(
    {
      path: '/app/client-user',
      icon: <BiUserVoice className={submenuIconClasses} />,
      name: 'User',
    },
  );
} else if (role === "retailer") {
  userSubMenu.push(
    {
      path: '/app/client-user',
      icon: <BiUserVoice className={submenuIconClasses} />,
      name: 'User',
    },
  );
} else if (role === "superAdmin") {
  userSubMenu.push(
    {
      path: '/app/subAdmin',
      icon: <BiUserCheck className={submenuIconClasses} />,
      name: 'Sub Admin',

    },
    {
      path: '/app/cluster',
      icon: <BiUserCheck className={submenuIconClasses} />,
      name: 'Cluster',

    },
    {
      path: '/app/distributor',
      icon: <BiUserCheck className={submenuIconClasses} />,
      name: 'District Partner',
    },
    {
      path: '/app/retailer',
      icon: <BiUserCheck className={submenuIconClasses} />,
      name: 'Retailer',
    },
    {
      path: '/app/franchise',
      icon: <BiUserCheck className={submenuIconClasses} />,
      name: 'Franchise',
    },
    {
      path: '/app/client-user',
      icon: <BiUserCheck className={submenuIconClasses} />,
      name: 'User',
    },

  );
  userSubMenu1.push(
    {
      path: '/app/operator/mobile-recharge-operator',
      icon: <BiUserVoice className={submenuIconClasses} />,
      name: 'Prepaid Mobile Operator',

    },
    {
      path: '/app/operator/postpaid-mobile-recharge-operator',
      icon: <BiUserVoice className={submenuIconClasses} />,
      name: 'Postpaid Mobile Operator',

    },
    {
      path: '/app/operator/electricity',
      icon: <BiUserVoice className={submenuIconClasses} />,
      name: 'Electricity Operator',
    },
    {
      path: '/app/operator/fast-tag-operator',
      icon: <BiUserVoice className={submenuIconClasses} />,
      name: 'Fast Tag Operator',
    },
    {
      path: '/app/operator/gas-operator',
      icon: <BiUserVoice className={submenuIconClasses} />,
      name: 'Gas Operator',
    },
    {
      path: '/app/operator/lpg-gas-operator',
      icon: <BiUserVoice className={submenuIconClasses} />,
      name: 'LPG Gas Operator',
    },
    {
      path: '/app/operator/municipality-operator',
      icon: <BiUserVoice className={submenuIconClasses} />,
      name: 'Municipality Operator',
    },
    {
      path: '/app/operator/dth-Recharge-operator',
      icon: <BiUserVoice className={submenuIconClasses} />,
      name: 'DTH Recharge Operator',
    },
    {
      path: '/app/operator/cable-Recharge-operator',
      icon: <BiUserVoice className={submenuIconClasses} />,
      name: 'Cable Tv Recharge Operator',
    },
    {
      path: '/app/operator/broadband-bill-Payment',
      icon: <BiUserVoice className={submenuIconClasses} />,
      name: 'Broadband Operator',
    },
    {
      path: '/app/operator/landline-bill-Payment',
      icon: <BiUserVoice className={submenuIconClasses} />,
      name: 'Landline Operator',
    },
    {
      path: '/app/operator/watter-bill-Payment',
      icon: <BiUserVoice className={submenuIconClasses} />,
      name: 'Water Operator',
    },
    {
      path: '/app/operator/loan-emi-Payment',
      icon: <BiUserVoice className={submenuIconClasses} />,
      name: 'Loan EMI Operator',
    },
    {
      path: '/app/operator/insurance-emi-Payment',
      icon: <BiUserVoice className={submenuIconClasses} />,
      name: 'Insurance EMI Operator',
    },
  );
}else if (role === "subAdmin") {
  userSubMenu.push(
    {
      path: '/app/cluster',
      icon: <BiUserCheck className={submenuIconClasses} />,
      name: 'Cluster',

    },
    {
      path: '/app/distributor',
      icon: <BiUserCheck className={submenuIconClasses} />,
      name: 'District Partner',
    },
    {
      path: '/app/retailer',
      icon: <BiUserCheck className={submenuIconClasses} />,
      name: 'Retailer',
    },
    {
      path: '/app/franchise',
      icon: <BiUserCheck className={submenuIconClasses} />,
      name: 'Franchise',
    },
    {
      path: '/app/client-user',
      icon: <BiUserCheck className={submenuIconClasses} />,
      name: 'User',
    },

  );
}

let routes = []
role==='superAdmin'?
routes = [
  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses} />,
    name: 'Dashboard',
  },
  {
    path: '/app/commission-transaction',
    icon: <AiFillBank className={submenuIconClasses} />,
    name: 'Commission Transaction',
  },
  {
    path: '/app/customize-commission',
    icon: <BiEdit className={submenuIconClasses} />,
    name: 'Customize Commission',
  },
  {
    path: '/app/transactions',
    icon: <AiFillBank className={iconClasses} />,
    name: 'All Transactions',
  },
  {
    path: "",
    icon: <HiUsers className={`${iconClasses} inline`} />,
    name: "User Roles",
    submenu: userSubMenu
  },
  {
    path: "",
    icon: <LiaUserAstronautSolid className={`${iconClasses} inline`} />,
    name: "Operator",
    submenu: userSubMenu1
  },
  {
    path: '/app/wallet',
    icon: <BiSolidWallet className={submenuIconClasses} />,
    name: 'Wallet',
  },
  {
    path: '/app/riseRequest',
    icon: <GiMoneyStack className={submenuIconClasses} />,
    name: 'Rise Request',
  },
]
:
routes = [
  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses} />,
    name: 'Dashboard',
  },
  {
    path: '/app/commission-transaction',
    icon: <AiFillBank className={submenuIconClasses} />,
    name: 'Commission Transaction',
  },
  {
    path: '/app/transactions',
    icon: <AiFillBank className={iconClasses} />,
    name: 'All Transactions',
  },
  {
    path: "",
    icon: <HiUsers className={`${iconClasses} inline`} />,
    name: "UserRoll",
    submenu: userSubMenu
  },
 
  {
    path: '/app/wallet',
    icon: <GiMoneyStack className={submenuIconClasses} />,
    name: 'Wallet',
  },
]

role==='subAdmin' && (
  routes = [
    {
      path: '/app/dashboard',
      icon: <Squares2X2Icon className={iconClasses} />,
      name: 'Dashboard',
    },
    // {
    //   path: '/app/transactions',
    //   icon: <CurrencyDollarIcon className={iconClasses} />,
    //   name: 'All Transactions',
    // },
    {
      path: "",
      icon: <HiUsers className={`${iconClasses} inline`} />,
      name: "UserRoll",
      submenu: userSubMenu
    }
    
  ]
)

export default routes


