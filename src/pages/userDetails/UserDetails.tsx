import React, { useEffect, useState } from "react";
import "./UserDetails.scss";
// import { formatDate } from "../../../../utils/formatter";
import type { UserType } from "../../features/users/types/userTypes";

import QuickActions from "../../features/users/components/UserDetails/quickActions/QuickActions";
import SummaryInfoTab from "../../features/users/components/UserDetails/summaryInfoTab/SummaryInfoTab";
import GeneralDetails from "../../features/users/components/UserDetails/generalDetails/GeneralDetails";

const UserDetails: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("selectedUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  if (!user) return <p>Loading user details...</p>;

  return (
    <div className="user-details">
      <QuickActions />
      <SummaryInfoTab user={user} />

      <GeneralDetails user={user} />
    </div>
  );
};

export default UserDetails;
