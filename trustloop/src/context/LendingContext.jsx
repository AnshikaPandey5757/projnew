import {
  createContext,
  useContext,
  useReducer,
} from "react";

const LendingContext =
  createContext();

const initialState = {
  listings: [],
  requests: [],
  activeLendings: [],
};

function lendingReducer(
  state,
  action
) {
  switch (action.type) {
    case "SET_LISTINGS":
      return {
        ...state,
        listings: action.payload,
      };

    case "ADD_LISTING":
      return {
        ...state,
        listings: [
          action.payload,
          ...state.listings,
        ],
      };

    case "SET_REQUESTS":
      return {
        ...state,
        requests: action.payload,
      };

    case "SET_ACTIVE":
      return {
        ...state,
        activeLendings:
          action.payload,
      };

    default:
      return state;
  }
}

export const LendingProvider = ({
  children,
}) => {
  const [state, dispatch] =
    useReducer(
      lendingReducer,
      initialState
    );

  const addListing = (
    listing
  ) => {
    dispatch({
      type: "ADD_LISTING",
      payload: listing,
    });
  };

  return (
    <LendingContext.Provider
      value={{
        ...state,
        dispatch,
        addListing,
      }}
    >
      {children}
    </LendingContext.Provider>
  );
};

export const useLendingContext =
  () => useContext(LendingContext);