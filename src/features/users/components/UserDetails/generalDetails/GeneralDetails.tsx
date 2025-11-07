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
    <article className="general-details">
      <section className="general-details__section">
        <header>
          <h2 className="general-details__header">Personal Information</h2>
        </header>

        <dl className="general-details__info-wrapper">
          {Object.entries(personalInfo).map(([key, value], index) => (
            <div className="info-item" key={index}>
              <dt className="info-title">{formatText(key, "uppercase")}</dt>
              <dd className="info-value">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="general-details__section">
        <header>
          <h2 className="general-details__header">Education and Employment</h2>
        </header>

        <dl className="general-details__info-wrapper">
          {Object.entries(educationAndEmployment).map(([key, value]) => (
            <div className="info-item" key={key}>
              <dt className="info-title">{formatText(key, "uppercase")}</dt>
              <dd className="info-value">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="general-details__section">
        <header>
          <h2 className="general-details__header">Socials</h2>
        </header>

        <dl className="general-details__info-wrapper">
          {Object.entries(socials).map(([key, value]) => (
            <div className="info-item" key={key}>
              <dt className="info-title">{formatText(key, "uppercase")}</dt>
              <dd className="info-value">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {guarantor.map((item, i) => (
        <section className="general-details__section" key={i}>
          <header>
            <h2 className="general-details__header">Guarantor</h2>
          </header>

          <dl className="general-details__info-wrapper last-item">
            {Object.entries(item).map(([key, value]) => (
              <div className="info-item" key={key}>
                <dt className="info-title">{formatText(key, "uppercase")}</dt>
                <dd className="info-value">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </article>
  );
};

export default GeneralDetails;
