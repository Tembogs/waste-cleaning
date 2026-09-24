import { Link } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  Truck,
  Gift,
  Trash2,
  Recycle,
  CircleAlert,
  Award,
} from "lucide-react";
import Navbar from "../component/Nav";
import Footer from "../component/Footer";

const processSteps = [
  {
    number: "01",
    title: "Request",
    icon: CalendarDays,
  },
  {
    number: "02",
    title: "Collector Assigned",
    icon: MapPin,
  },
  {
    number: "03",
    title: "Collection",
    icon: Truck,
  },
  {
    number: "04",
    title: "Earn Rewards",
    icon: Gift,
  },
];

const services = [
  {
    title: "Waste Collection",
    description:
      "Simple requests, accountable updates and local impact you can see.",
    icon: Trash2,
    className: "bg-white",
  },
  {
    title: "Recycling",
    description:
      "Simple requests, accountable updates and local impact you can see.",
    icon: Recycle,
    className: "bg-[#dceedd]",
  },
  {
    title: "Illegal Dump Reporting",
    description:
      "Simple requests, accountable updates and local impact you can see.",
    icon: CircleAlert,
    className: "bg-white",
  },
  {
    title: "Rewards",
    description:
      "Simple requests, accountable updates and local impact you can see.",
    icon: Award,
    className: "bg-[#fff2d2]",
  },
];

const impactStats = [
  { value: "128t", label: "Waste collected" },
  { value: "74t", label: "Recycling collected" },
  { value: "842", label: "Illegal dumps resolved" },
  { value: "4.2m", label: "Points distributed" },
  { value: "18,460", label: "Active users" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#182820]">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-14 md:grid-cols-2 md:px-12 md:py-16">
        <div>
          <h1 className="max-w-xl text-4xl font-normal leading-[1.12] tracking-tight text-[#182820] sm:text-5xl lg:text-6xl">
            Building Cleaner Communities, One Cycle at a Time.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-[#6b7b72]">
            Request responsible collection, recycle more, report illegal
            dumping and earn meaningful rewards—all with transparent progress.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/signup"
              className="rounded-lg bg-[#104b36] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0b3929]"
            >
              Get Started
            </Link>

            <a
              href="#how-it-works"
              className="rounded-lg border border-[#dbe4dd] px-5 py-3 text-sm font-medium text-[#244238] transition hover:bg-[#f3f7f3]"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px]">
          <img
            src="truck.jpg"
            alt="People sorting recyclable materials in a clean community"
            className="h-[320px] w-full object-cover sm:h-[390px]"
          />
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-[#f0f5ee] px-6 py-12 md:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-normal tracking-tight text-[#182820]">
            How EcoCycle works
          </h2>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="rounded-2xl bg-white p-5 sm:min-h-[102px]"
                >
                  <p className="text-xs font-semibold text-[#2b8059]">
                    {step.number}
                  </p>

                  <Icon
                    size={22}
                    strokeWidth={1.5}
                    className="mt-3 text-[#4d8c6b]"
                  />

                  <h3 className="mt-3 text-sm font-semibold text-[#182820]">
                    {step.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 py-12 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className={`min-h-[165px] rounded-3xl border border-[#dfe8e1] p-6 ${service.className}`}
              >
                <Icon
                  size={23}
                  strokeWidth={1.5}
                  className="text-[#4c9870]"
                />

                <h3 className="mt-7 text-base font-semibold text-[#182820]">
                  {service.title}
                </h3>

                <p className="mt-7 text-xs leading-5 text-[#718078]">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Community impact */}
      <section className="bg-[#104b36] px-6 py-12 text-white md:px-12">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl font-normal">Community impact</h2>

          <div className="mt-9 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {impactStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-normal text-[#a9d5b9]">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs text-[#d2e5d9]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final call to action */}
      <section className="px-6 py-14 text-center">
        <h2 className="text-3xl font-normal tracking-tight text-[#182820]">
          Ready to join the cycle?
        </h2>

        <p className="mt-3 text-sm text-[#718078]">
          Cleaner streets begin with one accountable action.
        </p>

        <Link
          to="/signup"
          className="mt-5 inline-block rounded-lg bg-[#104b36] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0b3929]"
        >
          Join EcoCycle
        </Link>
      </section>

      <Footer />
    </div>
  );
}