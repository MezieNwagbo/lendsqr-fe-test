import "./SummaryInfoTab.scss";

import type { UserType } from "../../../types/userTypes";

import Avatar from "../../../../../components/avatar/Avatar";

import userAvatar from "../../../../../assets/images/users/user_avatar.svg";

import { tabData } from "../../../data/userDetailsData";

import toast from "react-hot-toast";

import Ratings from "../../../../../components/ratings/Ratings";

type Props = {
  user: UserType;
};

const handleTabClick = (tab: string) => {
  tab !== "General details" && toast.error("Not available", { duration: 2000 });
};
const SummaryInfoTab = ({ user }: Props) => {
  const { userId, username, profile, education, userTier } = user;

  return (
    <div className="summary-info">
      <div className="summary-info__container">
        <div className="summary-info__item">
          <Avatar
            src={profile.avatar || userAvatar}
            name={username}
            size="lg"
          />
        </div>

        <div className="summary-info__item ">
          <h3 className="item-title">{username}</h3>
          <p className="item-id">{userId}</p>
        </div>

        <div className="line"></div>

        <div className="summary-info__item user-tier">
          <p className="item-users-tier">User tier</p>
          <Ratings tier={Number(userTier)} />
        </div>
        <div className="summary-info__item margin-top">
          <h3 className="item-title">{education.loanRepayment}.00</h3>
          <p className="item-bank-detail">993e34343/providus</p>
        </div>
      </div>

      <div className="summary-info__tab">
        {tabData.map((tab) => (
          <div onClick={() => handleTabClick(tab)} key={tab}>
            <p className={`${tab === "General details" && "active"}`}>{tab}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryInfoTab;
