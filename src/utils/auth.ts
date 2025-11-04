export const isAuthenticated = (): boolean => {
  const authData = localStorage.getItem("lendsqrAuth");
  return !!authData; // true if exists, false if not
};

export const logout = (): void => {
  localStorage.removeItem("lendsqrAuth");
};
