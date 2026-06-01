import TrustScoreWidget from "../components/trust/TrustScoreWidget";

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex items-center gap-6">
          <img
            src="/avatar.jpg"
            alt="User avatar"
            className="w-32 h-32 rounded-full"
          />

          <div>
            <h1 className="font-syne text-4xl font-bold">
              Anshika Pandey
            </h1>

            <p className="text-gray-400">
              Trusted Community Member
            </p>
          </div>
        </div>

        <div className="mt-12">
          <TrustScoreWidget />
        </div>
      </div>
    </div>
  );
};

export default Profile;