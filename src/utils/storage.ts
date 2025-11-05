export const getUserFromStorage = () => {
  const stored = localStorage.getItem("lendsqrAuth");
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);
    return parsed.user || null;
  } catch (error) {
    console.error("Error parsing user from storage:", error);
    return null;
  }
};
