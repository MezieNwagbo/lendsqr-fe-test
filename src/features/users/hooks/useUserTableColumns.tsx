import type { UserType } from "../types/userTypes";
import type { TableColumn } from "react-data-table-component";

import { formatDate } from "../../../utils/formatter";

import viewIcon from "../../../assets/images/users/view_icon.svg";
import activateIcon from "../../../assets/images/users/activate_icon.svg";
import blacklistIcon from "../../../assets/images/users/blacklist_icon.svg";

import KebabMenu from "../../../components/kebabMenu/KebabMenu";

import { useUserNavigation } from "./useUserNavigation";

const useUserTableColumns = () => {
  const { goToUserDetails } = useUserNavigation();

  // Table column definitions
  const columns: TableColumn<UserType>[] = [
    {
      name: "ORGANIZATION",
      selector: (row) => row.organisation,
      sortable: true,
    },
    { name: "USERNAME", selector: (row) => row.username, sortable: true },
    {
      name: "EMAIL",
      selector: (row) => row.email,
      sortable: true,
      grow: 2,
    },
    { name: "PHONE NUMBER", selector: (row) => row.phoneNumber },
    {
      name: "DATE JOINED",
      selector: (row) => formatDate(row.dateJoined),
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
