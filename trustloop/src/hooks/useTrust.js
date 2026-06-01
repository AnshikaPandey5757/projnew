import { useTrustContext } from "../context/TrustContext";

const useTrust = () => {
  const context = useTrustContext();

  if (!context) {
    throw new Error(
      "useTrust must be used inside TrustProvider"
    );
  }

  const {
    trustScore,
    verification,
    reviews,
    analytics,
    updateTrustScore,
    addReview,
    dispatch,
  } = context;

  return {
    trustScore,
    verification,
    reviews,
    analytics,
    updateTrustScore,
    addReview,
    dispatch,
  };
};

export default useTrust;