import {
  ShieldCheck,
  Mail,
  MapPin,
  GitBranch,
  Link,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-20">
        
        <div className="grid lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div>
            <h2 className="font-syne text-3xl font-bold">
              TrustLoop
            </h2>

            <p className="text-gray-400 mt-4">
              Hyperlocal lending powered by
              trust, AI verification and secure
              deposits.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-5">
              Product
            </h3>

            <div className="space-y-3 text-gray-400">
              <p>Discover Items</p>
              <p>Trust Scores</p>
              <p>AI Verification</p>
              <p>Digital Agreements</p>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-5">
              Company
            </h3>

            <div className="space-y-3 text-gray-400">
              <p>About</p>
              <p>Careers</p>
              <p>Privacy</p>
              <p>Terms</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-4 text-gray-400">
              <div className="flex gap-3">
                <Mail size={18} />
                hello@trustloop.com
              </div>

              <div className="flex gap-3">
                <MapPin size={18} />
                India
              </div>

              <div className="flex gap-4 mt-5">
                <GitBranch />
                <Link />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
            mt-16
            pt-8
            border-t
            border-white/5
            flex
            flex-col
            md:flex-row
            justify-between
            gap-4
          "
        >
          <div className="flex items-center gap-2 text-gray-500">
            <ShieldCheck
              size={16}
              className="text-[#00E5CC]"
            />

            Protected by TrustLoop Security
          </div>

          <p className="text-gray-500">
            © 2026 TrustLoop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;