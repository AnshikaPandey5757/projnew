export const calculateTrustScore = ({
  successfulReturns = 0,
  disputes = 0,
  cancellations = 0,
  averageRating = 0,
  verificationLevel = 0,
}) => {
  let score = 50;

  score += successfulReturns * 1.5;

  score += averageRating * 5;

  score += verificationLevel * 5;

  score -= disputes * 10;

  score -= cancellations * 5;

  score = Math.max(
    0,
    Math.min(100, score)
  );

  return Math.round(score);
};

export const getTrustLevel = (
  score
) => {
  if (score >= 90)
    return {
      label: "Elite Trusted",
      color: "#00E5CC",
    };

  if (score >= 75)
    return {
      label: "Highly Trusted",
      color: "#3B82F6",
    };

  if (score >= 60)
    return {
      label: "Trusted",
      color: "#F59E0B",
    };

  return {
    label: "Building Reputation",
    color: "#EF4444",
  };
};