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
    <section className="summary-info">
      <div className="summary-info__container">
        {/* User avatar */}
        <figure className="summary-info__item">
          <Avatar
            src={profile.avatar || userAvatar}
            name={username}
            size="lg"
          />
        </figure>

        {/* User basic info */}
        <div className="summary-info__item">
          <h2 className="item-title">{username}</h2>
          <p className="item-id">{userId}</p>
        </div>

        <hr className="line" aria-hidden="true" />

        {/* User tier */}
        <div className="summary-info__item user-tier">
          <p className="item-users-tier">User Tier</p>
          <Ratings tier={Number(userTier)} />
        </div>

        {/* Account info */}
        <div className="summary-info__item margin-top">
          <h3 className="item-title">{education.loanRepayment}.00</h3>
          <p className="item-bank-detail">993e34343/providus</p>
        </div>
      </div>

      {/* Tabs navigation */}
      <nav className="summary-info__tab" aria-label="User detail tabs">
        {tabData.map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={tab === "General details" ? "active" : ""}
            aria-current={tab === "General details" ? "page" : undefined}
          >
            {tab}
          </button>
        ))}
      </nav>
    </section>
  );
};

export default SummaryInfoTab;
