import type { UserType } from "../types/userTypes";
import type { TableColumn } from "react-data-table-component";

import { formatDate } from "../../../utils/formatter";

import { Tooltip } from "@mui/material";
import viewIcon from "../../../assets/images/users/view_icon.svg";
import activateIcon from "../../../assets/images/users/activate_icon.svg";
import blacklistIcon from "../../../assets/images/users/blacklist_icon.svg";

import KebabMenu from "../../../components/kebabMenu/KebabMenu";

import { useUserNavigation } from "./useUserNavigation/useUserNavigation";

type TooltipProps = {
  title: string;
  children: any;
};

const TooltipWrapper = ({ children, title }: TooltipProps) => (
  <Tooltip title={title} placement="top">
    {children}
  </Tooltip>
);

const useUserTableColumns = () => {
  const { goToUserDetails } = useUserNavigation();

  // Table column definitions
  const columns: TableColumn<UserType>[] = [
    {
      name: "ORGANIZATION",
      selector: (row) => row.organisation,
      format: (row) => (
        <TooltipWrapper title={row.organisation}>
          <p>{row.organisation}</p>
        </TooltipWrapper>
      ),
      sortable: true,
    },
    {
      name: "USERNAME",
      selector: (row) => row.username,
      format: (row) => (
        <TooltipWrapper title={row.username}>
          <p>{row.username}</p>
        </TooltipWrapper>
      ),
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
      format: (row) => (
        <TooltipWrapper title={row.email}>
          <p>{row.email}</p>
        </TooltipWrapper>
      ),

      sortable: true,
      grow: 2,
    },
    {
      name: "PHONE NUMBER",
      selector: (row) => row.phoneNumber,
      format: (row) => (
        <TooltipWrapper title={row.phoneNumber}>
          <p>{row.phoneNumber}</p>
        </TooltipWrapper>
      ),
    },
    {
      name: "DATE JOINED",
      selector: (row) => formatDate(row.dateJoined),
      format: (row) => (
        <TooltipWrapper title={formatDate(row.dateJoined)}>
          <p>{formatDate(row.dateJoined)}</p>
        </TooltipWrapper>
      ),
      sortable: true,
    },
    {
      name: "STATUS",
      cell: (row) => (
        <span className={`status-badge status-${row.status.toLowerCase()}`}>
          {row.status}
        </span>
      ),
    },
    {
      name: "",
      cell: (row) => (
        <KebabMenu
          options={[
            {
              label: "View Details",
              icon: viewIcon,
              onClick: (user) => goToUserDetails(user),
            },
            { label: "Blacklist User", icon: blacklistIcon },
            { label: "Activate User", icon: activateIcon },
          ]}
          row={row}
        />
      ),
      width: "70px",
      button: true,
    },
  ];

  return { columns };
};

export default useUserTableColumns;
