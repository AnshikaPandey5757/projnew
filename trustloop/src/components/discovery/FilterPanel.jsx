import {
  SlidersHorizontal,
  MapPin,
  ShieldCheck,
} from "lucide-react";

const FilterPanel = () => {
  return (
    <div
      className="
      flex
      flex-wrap
      gap-3
      items-center
    "
    >
      <FilterButton
        icon={<SlidersHorizontal size={16} />}
        label="Filters"
      />

      <FilterButton
        icon={<MapPin size={16} />}
        label="Within 5 km"
      />

      <FilterButton
        icon={<ShieldCheck size={16} />}
        label="Verified Owners"
      />
    </div>
  );
};

function FilterButton({
  icon,
  label,
}) {
  return (
    <button className="flex items-center gap-2 px-4 py-3 rounded-2xl btn-ghost text-gray-300 hover:border-[#00E5CC]/30 transition-all">
      {icon}
      {label}
    </button>
  );
}

export default FilterPanel;