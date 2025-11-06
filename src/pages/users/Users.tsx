import "./Users.scss";

import UserSummary from "../../features/users/components/userSummary/UserSummary";

import { useUsers } from "../../features/users/hooks/useUsers";

import React from "react";

const Users: React.FC = () => {
  const { data, summary, loading, error } = useUsers();

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users: {error.message}</p>;

  return (
    <div className="users-page">
      {summary && <UserSummary summary={summary} />}
      {/* User table or list goes here */}
    </div>
  );
};

export default Users;
