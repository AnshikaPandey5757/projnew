const lendings = [
  {
    item: "Canon DSLR",
    borrower: "Rahul",
    deposit: "₹5000",
    status: "Active",
  },
  {
    item: "Gaming Console",
    borrower: "Aman",
    deposit: "₹3000",
    status: "Returning",
  },
];

const ActiveLendings = () => {
  return (
    <div
      className="
      rounded-3xl
      border
      border-white/10
      bg-white/5
      p-6
    "
    >
      <h3 className="text-xl font-semibold mb-6">
        Active Lendings
      </h3>

      <div className="space-y-4">
        {lendings.map((item) => (
          <div
            key={item.item}
            className="
            flex
            justify-between
            items-center
            p-4
            rounded-2xl
            bg-white/5
          "
          >
            <div>
              <h4>{item.item}</h4>
              <p className="text-sm text-gray-500">
                {item.borrower}
              </p>
            </div>

            <div>{item.deposit}</div>

            <span className="text-[#00E5CC]">
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveLendings;