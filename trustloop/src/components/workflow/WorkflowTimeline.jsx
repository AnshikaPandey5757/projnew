import {
  Package,
  Handshake,
  ShieldCheck,
  ScanSearch,
  RefreshCcw,
} from "lucide-react";

import WorkflowStep from "./WorkflowStep";

const steps = [
  {
    number: "01",
    title: "List Item",
    icon: Package,
    description:
      "Upload photos, set deposit amount, define availability and lending radius.",
  },

  {
    number: "02",
    title: "Borrower Requests",
    icon: Handshake,
    description:
      "Verified community members submit borrowing requests securely.",
  },

  {
    number: "03",
    title: "Escrow Protection",
    icon: ShieldCheck,
    description:
      "TrustLoop securely holds deposits until successful return.",
  },

  {
    number: "04",
    title: "AI Verification",
    icon: ScanSearch,
    description:
      "Condition reports generated before and after borrowing.",
  },

  {
    number: "05",
    title: "Return & Refund",
    icon: RefreshCcw,
    description:
      "Deposit automatically refunded when item is safely returned.",
  },
];

const WorkflowTimeline = () => {
  return (
    <div className="relative">
      {/* Desktop Connection Line */}
      <div
        className="
          hidden
          lg:block
          absolute
          left-0
          right-0
          top-1/2
          h-[2px]
          bg-gradient-to-r
          from-[#00E5CC]
          via-[#00E5CC]/30
          to-[#FFB347]
        "
      />

      <div className="grid lg:grid-cols-5 gap-6 relative">
        {steps.map((step, index) => (
          <WorkflowStep
            key={step.title}
            stepNumber={step.number}
            title={step.title}
            description={step.description}
            icon={step.icon}
            active={index === 2}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkflowTimeline;