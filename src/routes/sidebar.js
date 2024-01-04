/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import { GiTakeMyMoney } from 'react-icons/gi';
import { BiUserCheck } from 'react-icons/bi';
import { BiUserVoice } from 'react-icons/bi';
import { AiFillBank } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";
import { LiaUserAstronautSolid } from "react-icons/lia";
import { BiSolidWallet } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { MdPivotTableChart } from "react-icons/md";
import { IoBusiness } from "react-icons/io5";
import { SiMoneygram } from "react-icons/si";
import jwtDecode from 'jwt-decode';

var token = sessionStorage.getItem("token")
const decodedToken = jwtDecode(token);
const { role } = decodedToken.user;
console.log('role', role)

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

let userRoleMenu = [];
let operatorMenu = [];
let FinancialServicesMenu = [];
let LoanServicesMenu = [];
let InsuranceServicesMenu = [];

if (role === "cluster") {
  userRoleMenu.push(
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
  userRoleMenu.push(
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
} else if (role === "retailer" || role === "franchise") {
  userRoleMenu.push(
    {
      path: '/app/client-user',
      icon: <BiUserVoice className={submenuIconClasses} />,
      name: 'User',
    },
  );
  FinancialServicesMenu.push(
    {
      path: '/app/FinanceServices/company-formation',
      icon: <MdPivotTableChart className={submenuIconClasses} />,
      name: 'Company Formation',
    },
    {
      path: '/app/FinanceServices/gst',
      icon: <MdPivotTableChart className={submenuIconClasses} />,
      name: 'GST',
    },
    {
      path: '/app/FinanceServices/pan-card',
      icon: <MdPivotTableChart className={submenuIconClasses} />,
      name: 'Pan Card',
    },
    {
      path: '/app/FinanceServices/itr',
      icon: <MdPivotTableChart className={submenuIconClasses} />,
      name: 'ITR',
    },
    {
      path: '/app/FinanceServices/design-development',
      icon: <MdPivotTableChart className={submenuIconClasses} />,
      name: 'Design & Development',
    },
    {
      path: '/app/FinanceServices/account-service',
      icon: <MdPivotTableChart className={submenuIconClasses} />,
      name: 'Accounting Services',
    },
    {
      path: '/app/FinanceServices/digital-marketing',
      icon: <MdPivotTableChart className={submenuIconClasses} />,
      name: 'Digital Marketing',
    },
    {
      path: '/app/FinanceServices/digital-signature',
      icon: <MdPivotTableChart className={submenuIconClasses} />,
      name: 'Digital Signature',
    }
  );
  LoanServicesMenu.push(
    {
      path: '/app/LoanSearvices/business-loan',
      icon: <IoBusiness className={submenuIconClasses} />,
      name: 'Business Loan',
    },
    {
      path: '/app/LoanSearvices/housing-loan',
      icon: <IoBusiness className={submenuIconClasses} />,
      name: 'Housing Loan',
    },
    {
      path: '/app/LoanSearvices/personal-loan',
      icon: <IoBusiness className={submenuIconClasses} />,
      name: 'Personal Loan',
    },
    {
      path: '/app/LoanSearvices/loan-against-property',
      icon: <IoBusiness className={submenuIconClasses} />,
      name: 'Loan Against Property',
    },
    {
      path: '/app/LoanSearvices/msme-loan',
      icon: <IoBusiness className={submenuIconClasses} />,
      name: 'MSME Loan',
    }
  );
  InsuranceServicesMenu.push(
    {
      path: '/app/InsuranceSearvices/health-insurance',
      icon: <SiMoneygram className={submenuIconClasses} />,
      name: 'Health Insurance',
    },
    {
      path: '/app/InsuranceSearvices/travel-insurance',
      icon: <SiMoneygram className={submenuIconClasses} />,
      name: 'Travel Insurance',
    },
    {
      path: '/app/InsuranceSearvices/group-insurance',
      icon: <SiMoneygram className={submenuIconClasses} />,
      name: 'Group Insurance',
    },
    {
      path: '/app/InsuranceSearvices/life-insurance',
      icon: <SiMoneygram className={submenuIconClasses} />,
      name: 'Life Insurance',
    },
    {
      path: '/app/InsuranceSearvices/vehicle-insurance',
      icon: <SiMoneygram className={submenuIconClasses} />,
      name: 'Vehicle Insurance',
    }
  );
} else if (role === "superAdmin") {
  userRoleMenu.push(
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
  operatorMenu.push(
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
  FinancialServicesMenu.push(
    {
      path: '/app/FinanceServices/company-formation',
      icon: <MdPivotTableChart className={submenuIconClasses} />,
      name: 'Company Formation',
    },
    {
      path: '/app/FinanceServices/gst',
      icon: <MdPivotTableChart className={submenuIconClasses} />,
      name: 'GST',
    },
    {
      path: '/app/FinanceServices/pan-card',
      icon: <MdPivotTableChart className={submenuIconClasses} />,
      name: 'Pan Card',
    },
    {
      path: '/app/FinanceServices/itr',
      icon: <MdPivotTableChart className={submenuIconClasses} />,
      name: 'ITR',
    },
    {
      path: '/app/FinanceServices/design-development',
      icon: <MdPivotTableChart className={submenuIconClasses} />,
      name: 'Design & Development',
    },
    {
      path: '/app/FinanceServices/account-service',
      icon: <MdPivotTableChart className={submenuIconClasses} />,
      name: 'Accounting Services',
    },
    {
      path: '/app/FinanceServices/digital-marketing',
      icon: <MdPivotTableChart className={submenuIconClasses} />,
      name: 'Digital Marketing',
    },
    {
      path: '/app/FinanceServices/digital-signature',
      icon: <MdPivotTableChart className={submenuIconClasses} />,
      name: 'Digital Signature',
    }
  );
  LoanServicesMenu.push(
    {
      path: '/app/LoanSearvices/business-loan',
      icon: <IoBusiness className={submenuIconClasses} />,
      name: 'Business Loan',
    },
    {
      path: '/app/LoanSearvices/housing-loan',
      icon: <IoBusiness className={submenuIconClasses} />,
      name: 'Housing Loan',
    },
    {
      path: '/app/LoanSearvices/personal-loan',
      icon: <IoBusiness className={submenuIconClasses} />,
      name: 'Personal Loan',
    },
    {
      path: '/app/LoanSearvices/loan-against-property',
      icon: <IoBusiness className={submenuIconClasses} />,
      name: 'Loan Against Property',
    },
    {
      path: '/app/LoanSearvices/msme-loan',
      icon: <IoBusiness className={submenuIconClasses} />,
      name: 'MSME Loan',
    }
  );
  InsuranceServicesMenu.push(
    {
      path: '/app/InsuranceSearvices/health-insurance',
      icon: <SiMoneygram className={submenuIconClasses} />,
      name: 'Health Insurance',
    },
    {
      path: '/app/InsuranceSearvices/travel-insurance',
      icon: <SiMoneygram className={submenuIconClasses} />,
      name: 'Travel Insurance',
    },
    {
      path: '/app/InsuranceSearvices/group-insurance',
      icon: <SiMoneygram className={submenuIconClasses} />,
      name: 'Group Insurance',
    },
    {
      path: '/app/InsuranceSearvices/life-insurance',
      icon: <SiMoneygram className={submenuIconClasses} />,
      name: 'Life Insurance',
    },
    {
      path: '/app/InsuranceSearvices/vehicle-insurance',
      icon: <SiMoneygram className={submenuIconClasses} />,
      name: 'Vehicle Insurance',
    }
  );
} else if (role === "subAdmin") {
  userRoleMenu.push(
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
role === 'superAdmin' ?
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
      submenu: userRoleMenu
    },
    {
      path: "",
      icon: <LiaUserAstronautSolid className={`${iconClasses} inline`} />,
      name: "Operator",
      submenu: operatorMenu
    },
    {
      path: "",
      icon: <IoBusiness className={`${iconClasses} inline`} />,
      name: "Loan Services",
      submenu: LoanServicesMenu
    },
    {
      path: "",
      icon: <GrMoney className={`${iconClasses} inline`} />,
      name: "Financial Services",
      submenu: FinancialServicesMenu
    },
    {
      path: "",
      icon: <SiMoneygram className={`${iconClasses} inline`} />,
      name: "Insurance Services",
      submenu: InsuranceServicesMenu
    },
    {
      path: '/app/wallet',
      icon: <BiSolidWallet className={submenuIconClasses} />,
      name: 'Wallet',
    },
    {
      path: '/app/quick-dhan-transaction',
      icon: <GiTakeMyMoney className={submenuIconClasses} />,
      name: 'Quick Dhan Transaction',
    },
    {
      path: '/app/riseRequest',
      icon: <GiMoneyStack className={submenuIconClasses} />,
      name: 'Money Request',
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
      submenu: userRoleMenu
    },
    {
      path: '/app/wallet',
      icon: <GiMoneyStack className={submenuIconClasses} />,
      name: 'Wallet',
    }
  ]

if (role === 'franchise' || role === 'retailer') {
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
      submenu: userRoleMenu
    },
    {
      path: "",
      icon: <IoBusiness className={`${iconClasses} inline`} />,
      name: "Loan Services",
      submenu: LoanServicesMenu
    },
    {
      path: "",
      icon: <GrMoney className={`${iconClasses} inline`} />,
      name: "Financial Services",
      submenu: FinancialServicesMenu
    },
    {
      path: "",
      icon: <SiMoneygram className={`${iconClasses} inline`} />,
      name: "Insurance Services",
      submenu: InsuranceServicesMenu
    },
    {
      path: '/app/wallet',
      icon: <GiMoneyStack className={submenuIconClasses} />,
      name: 'Wallet',
    }
  ]
}

role === 'subAdmin' && (
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
      submenu: userRoleMenu
    }

  ]
)

export default routes


