import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { login } from "./login";

describe("login API", () => {
  beforeEach(() => {
    vi.useFakeTimers(); // ⏳ fake timers to skip real waiting
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("resolves with a token and user data when credentials are correct", async () => {
    const payload = { email: "adedeji@lendsqr.com", password: "test123" };

    // trigger login, but don’t await immediately
    const promise = login(payload);

    // fast-forward fake timer
    vi.advanceTimersByTime(2000);

    const response = await promise;

    expect(response).toHaveProperty("token", "lendsqr_token");
    expect(response.user.name).toBe("Adedeji Lendsqr");
  });

  it("rejects with an error when credentials are invalid", async () => {
    const payload = { email: "wrong@user.com", password: "badpass" };

    const promise = login(payload);

    vi.advanceTimersByTime(2000);

    await expect(promise).rejects.toThrow(
      "Invalid credentials. Login with \nEmail: adedeji@lendsqr.com, \nPassword: test123"
    );
  });
});
