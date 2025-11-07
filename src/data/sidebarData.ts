import usersIcon from "../assets/images/sidebarMenu/users_icon.svg";
import guarantorsIcon from "../assets/images/sidebarMenu/guarantors_icon.svg";
import loansIcon from "../assets/images/sidebarMenu/loans_icon.svg";
import decisionIcon from "../assets/images/sidebarMenu/decision_models_icon.svg";
import savingsIcon from "../assets/images/sidebarMenu/savings_icon.svg";
import loanRequestsIcon from "../assets/images/sidebarMenu/loan_requests_icon.svg";
import whitelistIcon from "../assets/images/sidebarMenu/whitelist_icon.svg";
import karmaIcon from "../assets/images/sidebarMenu/karma_icon.svg";

import organizationIcon from "../assets/images/sidebarMenu/organization_icon.svg";
import loanProductsIcon from "../assets/images/sidebarMenu/loan_requests_icon.svg";
import savingsProductsIcon from "../assets/images/sidebarMenu/savings_products_icon.svg";
import feesIcon from "../assets/images/sidebarMenu/fees_and_charges_icon.svg";
import transactionsIcon from "../assets/images/sidebarMenu/transactions_icon.svg";
import servicesIcon from "../assets/images/sidebarMenu/services_icon.svg";
import serviceAccountIcon from "../assets/images/sidebarMenu/service_account_icon.svg";
import settlementsIcon from "../assets/images/sidebarMenu/settlements_icon.svg";
import reportsIcon from "../assets/images/sidebarMenu/reports_icon.svg";

import preferencesIcon from "../assets/images/sidebarMenu/preferences_icon.svg";
import feesAndPricesIcon from "../assets/images/sidebarMenu/fees_and_princing_icon.svg";
import auditIcon from "../assets/images/sidebarMenu/audit_logs_icon.svg";
import systemMessageIcon from "../assets/images/sidebarMenu/system_message_icon.svg";

export type SidebarItem = {
  title: string;
  icon?: string;
  route?: string;
  children?: SidebarItem[];
};

export const sidebarData: SidebarItem[] = [
  {
    title: "Customers",
    children: [
      { title: "Users", icon: usersIcon, route: "/users" },
      { title: "Guarantors", icon: guarantorsIcon, route: "/guarantors" },
      { title: "Loans", icon: loansIcon, route: "/loans" },
      {
        title: "Decision Models",
        icon: decisionIcon,
        route: "/decision-models",
      },
      { title: "Savings", icon: savingsIcon, route: "/savings" },
      {
        title: "Loan Requests",
        icon: loanRequestsIcon,
        route: "/loan-requests",
      },
      { title: "Whitelist", icon: whitelistIcon, route: "/whitelist" },
      { title: "Karma", icon: karmaIcon, route: "/karma" },
    ],
  },
  {
    title: "Businesses",
    children: [
      { title: "Organization", icon: organizationIcon, route: "/organization" },
      {
        title: "Loan Products",
        icon: loanProductsIcon,
        route: "/loan-products",
      },
      {
        title: "Savings Products",
        icon: savingsProductsIcon,
        route: "/savings-products",
      },
      { title: "Fees and Charges", icon: feesIcon, route: "/fees-charges" },
      { title: "Services", icon: servicesIcon, route: "/services" },
      { title: "Transactions", icon: transactionsIcon, route: "/transactions" },
      {
        title: "Service Account",
        icon: serviceAccountIcon,
        route: "service-account",
      },

      { title: "Settlements", icon: settlementsIcon, route: "/settlements" },
      { title: "Reports", icon: reportsIcon, route: "/reports" },
    ],
  },
  {
    title: "Settings",
    children: [
      { title: "Preferences", icon: preferencesIcon, route: "/preferences" },
      { title: "Audit Logs", icon: auditIcon, route: "/audit-logs" },
      {
        title: "Fees and Pricing",
        icon: feesAndPricesIcon,
        route: "/fees-prices",
      },
      {
        title: "System Messages",
        icon: systemMessageIcon,
        route: "system-messages",
      },
    ],
  },
];
