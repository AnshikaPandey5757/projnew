import { useAuthContext } from "../context/AuthContext";

const useAuth = () => {
  const context = useAuthContext();

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  const {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
  } = context;

  return {
    currentUser: user,
    user,
    loading,
    isAuthenticated,
    login,
    logout,
  };
};

export const useAuthNamed = useAuth;
export { useAuthNamed as useAuth };
export default useAuth;