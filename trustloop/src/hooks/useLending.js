import { useLendingContext } from "../context/LendingContext";

const useLending = () => {
  const context = useLendingContext();

  if (!context) {
    throw new Error(
      "useLending must be used inside LendingProvider"
    );
  }

  const {
    listings,
    requests,
    activeLendings,
    dispatch,
    addListing,
  } = context;

  return {
    listings,
    requests,
    activeLendings,
    dispatch,
    addListing,
  };
};

export default useLending;