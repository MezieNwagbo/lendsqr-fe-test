export type ProfileType = {
  firstName: string;
  lastName: string;
  avatar: string;
  gender: string;
  maritalStatus: string;
  children: number;
  typeOfResidence: string;
};

export type EducationType = {
  level: string;
  employmentStatus: string;
  sector: string;
  officeEmail: string;
  monthlyIncome: string[];
  loanRepayment: string;
  duration: string;
};

export type SocialsType = {
  twitter: string;
  facebook: string;
  instagram: string;
};

export type GuarantorType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  relationship: string;
};

export type UserType = {
  id: string;
  userId: string;
  organisation: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: string;
  profile: ProfileType;
  education: EducationType;
  socials: SocialsType;
  guarantor: GuarantorType[];
  userTier: number;
  bvn: string;
};

export type UsersSummaryType = {
  totalUsers: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
};
