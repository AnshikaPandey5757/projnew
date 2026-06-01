import {
  createContext,
  useContext,
  useReducer,
} from "react";

const TrustContext =
  createContext();

const initialState = {
  trustScore: 91,

  verification: {
    phone: true,
    email: true,
    identity: true,
    society: true,
  },

  reviews: [],

  analytics: {
    successfulReturns: 96,
    disputes: 2,
    cancellations: 1,
    averageRating: 4.9,
  },
};

function trustReducer(
  state,
  action
) {
  switch (action.type) {
    case "UPDATE_SCORE":
      return {
        ...state,
        trustScore:
          action.payload,
      };

    case "ADD_REVIEW":
      return {
        ...state,
        reviews: [
          action.payload,
          ...state.reviews,
        ],
      };

    case "UPDATE_ANALYTICS":
      return {
        ...state,
        analytics: {
          ...state.analytics,
          ...action.payload,
        },
      };

    default:
      return state;
  }
}

export const TrustProvider = ({
  children,
}) => {
  const [state, dispatch] =
    useReducer(
      trustReducer,
      initialState
    );

  const updateTrustScore = (
    score
  ) => {
    dispatch({
      type: "UPDATE_SCORE",
      payload: score,
    });
  };

  const addReview = (
    review
  ) => {
    dispatch({
      type: "ADD_REVIEW",
      payload: review,
    });
  };

  return (
    <TrustContext.Provider
      value={{
        ...state,
        dispatch,
        updateTrustScore,
        addReview,
      }}
    >
      {children}
    </TrustContext.Provider>
  );
};

export const useTrustContext =
  () => useContext(TrustContext);