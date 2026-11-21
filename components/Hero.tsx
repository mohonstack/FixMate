
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Wrench,
  Star,
  Clock,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 lg:py-28">

        {/* Left Content */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-[#246BFD]">
            <CheckCircle2 size={17} />
            Trusted Home Repair Services
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#172B4D] md:text-5xl lg:text-6xl">
            Your Home,
            <span className="block text-[#246BFD]">
              Our Responsibility.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-gray-500 md:text-lg">
            Find trusted professionals for all your home repair needs.
            From plumbing to electrical work, FixMate makes home
            maintenance simple, reliable, and stress-free.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl bg-[#246BFD] px-7 py-4 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-[#1749B8]"
            >
              Explore Services
              <ArrowRight size={19} />
            </Link>

            <Link
              href="/register"
              className="rounded-xl border border-gray-200 px-7 py-4 font-semibold text-[#172B4D] transition hover:border-[#246BFD] hover:text-[#246BFD]"
            >
              Become a Technician
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 flex flex-wrap gap-6 border-t border-gray-100 pt-7">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-[#246BFD]" size={22} />
              <span className="text-sm font-medium text-gray-600">
                Verified Experts
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="text-[#246BFD]" size={22} />
              <span className="text-sm font-medium text-gray-600">
                Quick Service
              </span>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-blue-100 blur-3xl" />
          <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-blue-50 blur-3xl" />

          <div className="relative rounded-3xl bg-[#EEF4FF] p-5 md:p-8">
            <div className="rounded-2xl bg-white p-6 shadow-xl shadow-blue-100">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">
                    Find your expert
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-[#172B4D]">
                    Professional Services
                  </h3>
                </div>
                <div className="rounded-xl bg-blue-50 p-3 text-[#246BFD]">
                  <Wrench size={26} />
                </div>
              </div>

              {/* Service Cards */}
              <div className="mt-7 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-gray-100 p-4 transition hover:border-blue-200">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-2xl">
                    🔧
                  </div>
                  <h4 className="font-bold text-[#172B4D]">Plumbing</h4>
                  <p className="mt-1 text-xs text-gray-400">
                    Expert plumbers
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 p-4 transition hover:border-blue-200">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-2xl">
                    ⚡
                  </div>
                  <h4 className="font-bold text-[#172B4D]">Electrical</h4>
                  <p className="mt-1 text-xs text-gray-400">
                    Safe electrical work
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 p-4 transition hover:border-blue-200">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                    ❄️
                  </div>
                  <h4 className="font-bold text-[#172B4D]">AC Repair</h4>
                  <p className="mt-1 text-xs text-gray-400">
                    Cooling solutions
                  </p>
                </div>

                <div className="rounded-xl border border-gray-100 p-4 transition hover:border-blue-200">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl">
                    🏠
                  </div>
                  <h4 className="font-bold text-[#172B4D]">Home Repair</h4>
                  <p className="mt-1 text-xs text-gray-400">
                    Complete solutions
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="mt-6 flex items-center justify-between rounded-xl bg-blue-50 p-4">
                <div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        size={17}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-sm font-semibold text-[#172B4D]">
                    Quality You Can Trust
                  </p>
                </div>

                <ShieldCheck className="text-[#246BFD]" size={30} />
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -left-5 top-1/3 hidden items-center gap-3 rounded-xl bg-white p-4 shadow-lg sm:flex">
              <div className="rounded-full bg-green-100 p-2 text-green-600">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#172B4D]">
                  Trusted Experts
                </p>
                <p className="text-xs text-gray-400">
                  Reliable professionals
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
