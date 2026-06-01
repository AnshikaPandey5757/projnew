import { motion } from "framer-motion";
import ReviewCard from "./ReviewCard";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "IIT Kanpur • Hostel Block C",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    review:
      "Borrowed a DSLR for a robotics event. The AI condition report made the process completely stress-free.",
  },

  {
    name: "Rahul Verma",
    location: "Sunshine Apartments",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    review:
      "Trust score and security deposits made me comfortable lending my projector to strangers nearby.",
  },

  {
    name: "Ananya Gupta",
    location: "BITS Pilani Hostel",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    review:
      "The digital agreement feature feels surprisingly professional. Everything is documented automatically.",
  },
];

const Testimonials = () => {
  return (
    <section id="community" style={{ scrollMarginTop: "7rem" }} className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-[#00E5CC] font-semibold">05 — Community</span>
          <h2 className="mt-4 text-5xl md:text-6xl font-bold text-white font-syne">
            Trusted feedback from our members.
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
              }}
            >
              <ReviewCard {...testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;