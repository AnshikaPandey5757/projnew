import {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

function authReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case "LOGOUT":
      return {
        user: null,
        isAuthenticated: false,
        loading: false,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
}

export const AuthProvider = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    authReducer,
    initialState
  );

  useEffect(() => {
    const storedUser =
      localStorage.getItem("trustloop-user");

    if (storedUser) {
      dispatch({
        type: "SET_USER",
        payload: JSON.parse(storedUser),
      });
    } else {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem(
      "trustloop-user",
      JSON.stringify(userData)
    );

    dispatch({
      type: "SET_USER",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem(
      "trustloop-user"
    );

    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () =>
  useContext(AuthContext);