const Settings = () => {
  return (
    <div className="min-h-screen bg-[#0B0F1A] p-8 text-white">
      <h1 className="font-syne text-5xl font-bold">
        Settings
      </h1>

      <div
        className="
          mt-10
          rounded-3xl
          bg-white/5
          border
          border-white/10
          p-8
        "
      >
        <label className="block mb-5">
          Full Name
        </label>

        <input
          className="
            w-full
            bg-white/5
            border
            border-white/10
            rounded-2xl
            p-4
          "
        />

        <button
          className="
            mt-8
            px-8
            py-4
            rounded-2xl
            bg-[#00E5CC]
            text-black
          "
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;