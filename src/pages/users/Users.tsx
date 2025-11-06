import "./Users.scss";

import UserSummary from "../../features/users/components/userSummary/UserSummary";
import UserTable from "../../features/users/components/userTable/UserTable";
import { useUsers } from "../../features/users/hooks/useUsers";

import React from "react";

const Users: React.FC = () => {
  const { users, summary, loading, error } = useUsers();

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users: {error.message}</p>;

  return (
    <div className="users-page">
      {summary && <UserSummary summary={summary} />}
      {users && <UserTable users={users} />}
    </div>
  );
};

export default Users;
