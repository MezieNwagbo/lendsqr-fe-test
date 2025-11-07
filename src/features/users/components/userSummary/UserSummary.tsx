import React from "react";
import "./UserSummary.scss";

import totalUsersIcon from "../../../../assets/images/users/total_users_icon.svg";
import activeUsersIcon from "../../../../assets/images/users/active_users_icon.svg";
import usersWithLoanIcon from "../../../../assets/images/users/users_with_loans_icon.svg";
import usersWithSavingsIcon from "../../../../assets/images/users/users_with_savings_icon.svg";

type SummaryCardProps = {
  title: string;
  value: string | number;
  icon?: string;
  color?: string;
};

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon }) => {
  return (
    <div className="summary-card">
      {icon && <img src={icon} alt="icon" className="summary-card__icon" />}
      <p className="summary-card__title">{title}</p>
      <h3 className="summary-card__value">{value}</h3>
    </div>
  );
};

type UserSummaryProps = {
  summary: {
    totalUsers: number;
    activeUsers: number;
    usersWithLoans: number;
    usersWithSavings: number;
  };
};

const UserSummary: React.FC<UserSummaryProps> = ({ summary }) => {
  return (
    <div className="user-summary">
      <SummaryCard
        title="Users"
        value={summary.totalUsers}
        color="#DF18FF"
        icon={totalUsersIcon}
      />
      <SummaryCard
        title="Active Users"
        value={summary.activeUsers}
        color="#5718FF"
        icon={activeUsersIcon}
      />
      <SummaryCard
        title="Users with Loans"
        value={summary.usersWithLoans}
        color="#F55F44"
        icon={usersWithLoanIcon}
      />
      <SummaryCard
        title="Users with Savings"
        value={summary.usersWithSavings}
        color="#FF3366"
        icon={usersWithSavingsIcon}
      />
    </div>
  );
};

export default UserSummary;
