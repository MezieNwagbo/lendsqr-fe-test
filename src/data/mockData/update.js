import fs from "fs";
import path from "path";

// Path to your users.json
const filePath = path.join(process.cwd(), "users.json");

// Utility functions
const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const formatCurrency = (num) => `₦${num.toLocaleString()}`;

// Options for profile and education
const genders = ["Male", "Female"];
const maritalStatuses = ["Single", "Married", "Divorced"];
const residenceTypes = ["Apartment", "House", "Parent's House", "Hostel"];
const educationLevels = ["B.Sc", "HND", "M.Sc", "PhD"];
const employmentStatuses = ["Employed", "Self-employed", "Unemployed"];
const sectors = ["Technology", "Finance", "Health", "Education", "Agriculture"];

// Guarantor name pools
const firstNames = [
  "John",
  "Jane",
  "Paul",
  "Mary",
  "Mike",
  "Linda",
  "David",
  "Susan",
  "James",
  "Patricia",
];
const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Miller",
  "Davis",
  "Garcia",
  "Wilson",
  "Taylor",
];

// Read existing users
const users = JSON.parse(fs.readFileSync(filePath, "utf8"));

// Enrich users
const enrichedUsers = users.map((user, index) => {
  const [firstName, lastName] = user.username.split(" ");

  return {
    ...user,
    profile: {
      firstName,
      lastName,
      avatar: `https://i.pravatar.cc/150?img=${(index % 70) + 1}`,
      bvn: `${randomNumber(10000000000, 99999999999)}`,
      gender: randomChoice(genders),
      maritalStatus: randomChoice(maritalStatuses),
      children: randomNumber(0, 4),
      typeOfResidence: randomChoice(residenceTypes),
    },
    education: {
      level: randomChoice(educationLevels),
      employmentStatus: randomChoice(employmentStatuses),
      sector: randomChoice(sectors),
      duration: `${randomNumber(1, 10)} years`,
      officeEmail: user.email, // same as original email
      monthlyIncome: [
        formatCurrency(randomNumber(100000, 500000)),
        formatCurrency(randomNumber(500001, 1000000)),
      ],
      loanRepayment: formatCurrency(randomNumber(20000, 100000)),
    },
    socials: {
      twitter: `@${user.username.replace(" ", "").toLowerCase()}`,
      facebook: `facebook.com/${user.username.replace(" ", "").toLowerCase()}`,
      instagram: `@${user.username.replace(" ", "").toLowerCase()}`,
    },
    guarantor: [
      {
        firstName: randomChoice(firstNames),
        lastName: randomChoice(lastNames),
        phoneNumber: `0${randomNumber(7000000000, 9999999999)}`,
        email: `guar${index + 1}@example.com`,
        relationship: randomChoice(["Sibling", "Parent", "Spouse"]),
      },
    ],
  };
});

// Write back enriched users.json
fs.writeFileSync(filePath, JSON.stringify(enrichedUsers, null, 2));

console.log(
  "✅ users.json enriched with profile, education, socials, and realistic guarantors!"
);
