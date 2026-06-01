export const formatDate = (
  date
) => {
  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  ).format(new Date(date));
};

export const formatDateTime = (
  date
) => {
  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  ).format(new Date(date));
};

export const getRelativeTime = (
  date
) => {
  const diff =
    Date.now() -
    new Date(date).getTime();

  const hours = Math.floor(
    diff / 3600000
  );

  if (hours < 24)
    return `${hours}h ago`;

  const days = Math.floor(
    hours / 24
  );

  return `${days}d ago`;
};