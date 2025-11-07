import "./GeneralDetails.scss";

import type { UserType } from "../../../types/userTypes";
import { formatText } from "../../../../../utils/formatter";

type Props = {
  user: UserType;
};

const GeneralDetails = ({ user }: Props) => {
  const {
    username,
    profile,
    email,
    phoneNumber,
    bvn,
    education,
    guarantor,
    socials: socialLinks,
  } = user;

  const personalInfo = {
    fullName: username,
    phoneNumber: phoneNumber,
    email,
    bvn,
    gender: profile.gender,
    maritalStatus: profile.maritalStatus,
    children: profile.children,
    typeOfResidence: profile.typeOfResidence,
  };

  const educationAndEmployment = {
    levelOfEducation: education.level,
    employmentStatus: education.employmentStatus,
    sectorOfEmployment: education.sector,
    durationOfEmployment: education.duration,
    officeEmail: education.officeEmail,
    monthlyIncome: `${education.monthlyIncome[0]} - ${education.monthlyIncome[1]}`,
    loanRepayment: education.loanRepayment,
  };

  const socials = {
    twitter: socialLinks.twitter,
    facebook: socialLinks.facebook,
    instagram: socialLinks.instagram,
  };

  return (
    <div className="general-details">
      <div className="general-details__section">
        <h5 className="general-details__header">Personal Information</h5>

        <div className="general-details__info-wrapper">
          {Object.entries(personalInfo).map(([key, value], index) => {
            return (
              <div className="info-item" key={index}>
                <p className="info-title">{formatText(key, "uppercase")}</p>
                <p className="info-value">{value}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="general-details__section">
        <h5 className="general-details__header">Education and Employment</h5>

        <div className="general-details__info-wrapper">
          {Object.entries(educationAndEmployment).map(([key, value]) => {
            return (
              <div className="info-item">
                <p className="info-title">{formatText(key, "uppercase")}</p>
                <p className="info-value">{value}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="general-details__section">
        <h5 className="general-details__header">Socials</h5>

        <div className="general-details__info-wrapper">
          {Object.entries(socials).map(([key, value]) => {
            return (
              <div className="info-item">
                <p className="info-title">{formatText(key, "uppercase")}</p>
                <p className="info-value">{value}</p>
              </div>
            );
          })}
        </div>
      </div>

      {guarantor.map((item) => {
        return (
          <div className="general-details__section">
            <h5 className="general-details__header">Guarantor</h5>

            <div className="general-details__info-wrapper last-item">
              {Object.entries(item).map(([key, value]) => {
                return (
                  <div className="info-item">
                    <p className="info-title">{formatText(key, "uppercase")}</p>
                    <p className="info-value">{value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GeneralDetails;
