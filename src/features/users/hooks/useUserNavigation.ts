import { useNavigate } from "react-router-dom";
import type { UserType } from "../types/userTypes";

export const useUserNavigation = () => {
  const navigate = useNavigate();

  const goToUserDetails = (user: UserType) => {
    // Save user in localStorage
    localStorage.setItem("selectedUser", JSON.stringify(user));
    // Navigate to the details page
    navigate(`/users/${user.id}`);
  };

  return { goToUserDetails };
};
