import DamageDetection from "./DamageDetection";

const BeforeAfterViewer = ({
  beforeImage = "/images/camera-before.jpg",
  afterImage = "/images/camera-after.jpg",
  showDamage = false,
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      
      {/* BEFORE */}
      <div>
        <p className="mb-3 text-gray-400 text-sm">
          Before Lending
        </p>

        <div className="relative overflow-hidden rounded-3xl glass">
          <img
            src={beforeImage}
            alt="Condition before lending"
            className="w-full h-[320px] object-cover"
          />

          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#00E5CC]/15 text-[#00E5CC] text-xs">
            VERIFIED
          </div>
        </div>
      </div>

      {/* AFTER */}
      <div>
        <p className="mb-3 text-gray-400 text-sm">
          After Return
        </p>

        <div className="relative overflow-hidden rounded-3xl glass">
          <img
            src={afterImage}
            alt="Condition after return"
            className="w-full h-[320px] object-cover"
          />

          {showDamage && <DamageDetection />}
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterViewer;