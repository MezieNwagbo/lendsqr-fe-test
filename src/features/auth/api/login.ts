import type { LoginPayload, LoginResponse } from "../types/loginTypes";

export async function login({
  email,
  password,
}: LoginPayload): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "adedeji@lendsqr.com" && password === "test123") {
        resolve({
          token: "lendsqr_token",
          user: { id: "1", name: "Adedeji Lendsqr" },
        });
      } else {
        reject(
          new Error(
            "Invalid credentials. Login with \nEmail: adedeji@lendsqr.com, \nPassword: test123"
          )
        );
      }
    }, 2000);
  });
}
