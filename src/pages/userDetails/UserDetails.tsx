import React, { useEffect, useState } from "react";
import "./UserDetails.scss";
// import { formatDate } from "../../../../utils/formatter";
import type { UserType } from "../../features/users/types/userTypes";

import QuickActions from "../../features/users/components/UserDetails/quickActions/QuickActions";
import SummaryInfoTab from "../../features/users/components/UserDetails/summaryInfoTab/SummaryInfoTab";

import { useNavigate } from "react-router-dom";

const UserDetails: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("selectedUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  if (!user) return <p>Loading user details...</p>;

  const {
    profile,
    education,
    socials,
    guarantor,
    username,
    email,
    phoneNumber,
    dateJoined,
    status,
    organisation,
  } = user;

  return (
    <div className="user-details">
      <QuickActions />
      <SummaryInfoTab user={user} />

      <br />
      <div className="user-details-grid">
        {/* Personal Information */}
        <div className="info-group">
          <h3>Personal Information</h3>
          <div className="info-row">
            <span>Full Name</span>
            <span>{`${profile.firstName} ${profile.lastName}`}</span>
          </div>
          <div className="info-row">
            <span>Phone Number</span>
            <span>{phoneNumber}</span>
          </div>
          <div className="info-row">
            <span>Email</span>
            <span>{email}</span>
          </div>
          <div className="info-row">
            <span>BVN</span>
            <span>{profile.bvn}</span>
          </div>
          <div className="info-row">
            <span>Gender</span>
            <span>{profile.gender}</span>
          </div>
          <div className="info-row">
            <span>Marital Status</span>
            <span>{profile.maritalStatus}</span>
          </div>
          <div className="info-row">
            <span>Children</span>
            <span>{profile.children}</span>
          </div>
          <div className="info-row">
            <span>Type of Residence</span>
            <span>{profile.typeOfResidence}</span>
          </div>
        </div>

        {/* Education & Employment */}
        <div className="info-group">
          <h3>Education & Employment</h3>
          <div className="info-row">
            <span>Level of Education</span>
            <span>{education.level}</span>
          </div>
          <div className="info-row">
            <span>Employment Status</span>
            <span>{education.employmentStatus}</span>
          </div>
          <div className="info-row">
            <span>Sector of Employment</span>
            <span>{education.sector}</span>
          </div>
          <div className="info-row">
            <span>Duration</span>
            <span>{education.duration}</span>
          </div>
          <div className="info-row">
            <span>Office Email</span>
            <span>{education.officeEmail}</span>
          </div>
          <div className="info-row">
            <span>Monthly Income</span>
            <span>₦{education.monthlyIncome.join(" - ₦")}</span>
          </div>
          <div className="info-row">
            <span>Loan Repayment</span>
            <span>₦{education.loanRepayment}</span>
          </div>
        </div>

        {/* Socials */}
        <div className="info-group">
          <h3>Socials</h3>
          <div className="info-row">
            <span>Twitter</span>
            <span>{socials.twitter}</span>
          </div>
          <div className="info-row">
            <span>Facebook</span>
            <span>{socials.facebook}</span>
          </div>
          <div className="info-row">
            <span>Instagram</span>
            <span>{socials.instagram}</span>
          </div>
        </div>

        {/* Guarantor */}
        <div className="info-group">
          <h3>Guarantor</h3>
          {guarantor.map((g, i) => (
            <React.Fragment key={i}>
              <div className="info-row">
                <span>Full Name</span>
                <span>{`${g.firstName} ${g.lastName}`}</span>
              </div>
              <div className="info-row">
                <span>Phone Number</span>
                <span>{g.phoneNumber}</span>
              </div>
              <div className="info-row">
                <span>Email</span>
                <span>{g.email}</span>
              </div>
              <div className="info-row">
                <span>Relationship</span>
                <span>{g.relationship}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
