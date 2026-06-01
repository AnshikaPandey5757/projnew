const notifications = [
  "Your Canon Camera request was approved.",
  "Deposit refunded successfully.",
  "Trust score increased to 91.",
];

const Notifications = () => {
  return (
    <div className="min-h-screen bg-[#0B0F1A] p-8 text-white">
      <h1 className="font-syne text-5xl font-bold">
        Notifications
      </h1>

      <div className="space-y-4 mt-10">
        {notifications.map((note) => (
          <div
            key={note}
            className="
              p-5
              rounded-2xl
              bg-white/5
              border
              border-white/10
            "
          >
            {note}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;