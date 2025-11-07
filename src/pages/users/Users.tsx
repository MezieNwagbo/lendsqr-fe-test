import "./Users.scss";

import React from "react";
import UserSummary from "../../features/users/components/userSummary/UserSummary";
import UserTable from "../../features/users/components/userTable/UserTable";
import { useUsers } from "../../features/users/hooks/useUsers";

import UserSkeleton from "../../features/users/components/userSkeleton/UserSkeleton";

const Users: React.FC = () => {
  const { users, summary, loading, error } = useUsers();

  if (loading) return <UserSkeleton />;
  if (error) return <p>Error fetching users: {error.message}</p>;

  return (
    <div className="users-page fade-in">
      {summary && <UserSummary summary={summary} />}
      {users && <UserTable users={users} />}
    </div>
  );
};

export default Users;
