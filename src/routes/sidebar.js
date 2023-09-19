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

var token = localStorage.getItem("token")
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
      icon: <BiUserPin className={submenuIconClasses} />,
      name: 'Distributor',
    },
    {
      path: '/app/franchise',
      icon: <BiUserPlus className={submenuIconClasses} />,
      name: 'Franchise',
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
    },

  );
} else if (role === "distributor") {
  userSubMenu.push(
    {
      path: '/app/retailer',
      icon: <BiUserPlus className={submenuIconClasses} />,
      name: 'Retailer',
    },
    {
      path: '/app/franchise',
      icon: <BiUserPlus className={submenuIconClasses} />,
      name: 'Franchise',
    },
    {
      path: '/app/client-user',
      icon: <BiUserVoice className={submenuIconClasses} />,
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
      path: '/app/franchise',
      icon: <BiUserPlus className={submenuIconClasses} />,
      name: 'Franchise',
    },
    {
      path: '/app/client-user',
      icon: <BiUserVoice className={submenuIconClasses} />,
      name: 'User',
    },

  );
  userSubMenu1.push(
    {
      path: '/app/operator/mobile-recharge-operator',
      icon: <BiUserCheck className={submenuIconClasses} />,
      name: 'Mobile Recharge',

    },
    {
      path: '/app/operator/electricity',
      icon: <BiUserPin className={submenuIconClasses} />,
      name: 'Electricity Bill Payment',
    },
    {
      path: '/app/operator/fast-tag-operator',
      icon: <BiUserPlus className={submenuIconClasses} />,
      name: 'Fast Tag',
    },
    {
      path: '/app/operator/lpg-gag-operator',
      icon: <BiUserPlus className={submenuIconClasses} />,
      name: 'Gas Bill Payment',
    },
    {
      path: '/app/operator/municipality-operator',
      icon: <BiUserVoice className={submenuIconClasses} />,
      name: 'Municipality',
    },
    {
      path: '/app/operator/dth-Recharge-operator',
      icon: <BiUserVoice className={submenuIconClasses} />,
      name: 'DTH Recharge',
    },
    {
      path: '/app/operator/broadband-bill-Payment',
      icon: <BiUserVoice className={submenuIconClasses} />,
      name: 'Broadband Bill Payment',
    },
    {
      path: '/app/operator/watter-bill-Payment',
      icon: <BiUserVoice className={submenuIconClasses} />,
      name: 'Water Bill Payment',
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
    icon: <RiHealthBookLine className={submenuIconClasses} />,
    name: 'Commission Transaction',
  },
  {
    path: '/app/transactions',
    icon: <CurrencyDollarIcon className={iconClasses} />,
    name: 'All Transactions',
  },
  {
    path: "",
    icon: <BiUserCircle className={`${iconClasses} inline`} />,
    name: "UserRoll",
    submenu: userSubMenu
  },
  {
    path: "",
    icon: <BiUserCircle className={`${iconClasses} inline`} />,
    name: "Operator",
    submenu: userSubMenu1
  },
  {
    path: '/app/wallet',
    icon: <BsWater className={submenuIconClasses} />,
    name: 'Wallet',
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
    icon: <RiHealthBookLine className={submenuIconClasses} />,
    name: 'Commission Transaction',
  },
  {
    path: '/app/transactions',
    icon: <CurrencyDollarIcon className={iconClasses} />,
    name: 'All Transactions',
  },
  {
    path: "",
    icon: <BiUserCircle className={`${iconClasses} inline`} />,
    name: "UserRoll",
    submenu: userSubMenu
  },
 
  {
    path: '/app/wallet',
    icon: <BsWater className={submenuIconClasses} />,
    name: 'Wallet',
  },
]

export default routes


