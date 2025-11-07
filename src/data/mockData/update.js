import fs from "fs";

// Path to your users.json file
const filePath = "./users.json";

// function generateRandomId(salt = "") {
//   const base = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let id = "";

//   // Incorporate the salt by seeding the random behavior slightly
//   const seed = Array.from(salt).reduce(
//     (acc, char) => acc + char.charCodeAt(0),
//     0
//   );

//   for (let i = 0; i < 11; i++) {
//     const randomIndex =
//       Math.floor((Math.random() + (seed % 1)) * base.length) % base.length;
//     id += base.charAt(randomIndex);
//   }

//   return id;
// }

function generateRandomNumberString() {
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += Math.floor(Math.random() * 10); // random digit 0–9
  }
  return result;
}

try {
  // Read existing users
  const users = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // Update each user with a random tier (1–3)
  const updatedUsers = users.map((user) => ({
    ...user,
    bvn: generateRandomNumberString(),
  }));

  // Write back to file (pretty format)
  fs.writeFileSync(filePath, JSON.stringify(updatedUsers, null, 2));

  console.log(
    `✅ Successfully added userTier to ${updatedUsers.length} users!`
  );
} catch (error) {
  console.error("❌ Error updating users.json:", error.message);
}
