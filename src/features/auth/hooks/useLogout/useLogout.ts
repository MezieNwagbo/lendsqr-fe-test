import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("selectedUser");
    localStorage.removeItem("lendsqrAuth");
    navigate("/login");
  };

  return { handleLogout };
};

export default useLogout;
