import { Link } from "react-router-dom";
import { ArrowRight, Recycle, Users, ShieldCheck } from "lucide-react";
import Footer from "../component/Footer";
import Navbar from "../component/Nav";

function About() {
  return (
    <main className="min-h-screen bg-[#f7f9f6] text-[#18352a]">
      <Navbar/>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 sm:px-10 lg:px-16 lg:pt-24">
        <div className="max-w-4xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-wide text-[#2d8b57]">
            About EcoCycle
          </p>

          <h1 className="max-w-4xl text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Built for cleaner, more connected communities.
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-[#68766f] sm:text-xl">
            EcoCycle connects households, verified collectors and community
            teams through transparent service workflows, local reporting and
            fair rewards.
          </p>
        </div>
      </section>

      {/* Main about card */}
      <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-10 lg:px-16">
        <div className="rounded-[32px] bg-white p-8 shadow-[0_10px_40px_rgba(20,50,35,0.05)] sm:p-12 lg:p-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-[#2d8b57]">
                Our purpose
              </p>

              <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
                Turning everyday environmental actions into measurable impact.
              </h2>
            </div>

            <div className="space-y-5 text-base leading-7 text-[#68766f] sm:text-lg">
              <p>
                EcoCycle is designed to make responsible waste management
                easier for households and communities. Instead of leaving
                collection requests, recycling and illegal dumping reports
                disconnected, EcoCycle brings them into one transparent
                platform.
              </p>

              <p>
                Every request follows a clear workflow, from submission and
                collector assignment through collection or resolution. This
                gives users a better understanding of what is happening with
                their requests.
              </p>

              <p>
                EcoCycle also introduces rewards for meaningful environmental
                participation, helping communities turn responsible actions
                into something visible and valuable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-16">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-[28px] bg-white p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f4ec] text-[#146044]">
              <Recycle size={23} />
            </div>

            <h3 className="text-xl font-medium">Responsible action</h3>

            <p className="mt-3 leading-7 text-[#68766f]">
              We make it easier to request responsible collection, recycle
              useful materials and reduce unmanaged waste.
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f4ec] text-[#146044]">
              <Users size={23} />
            </div>

            <h3 className="text-xl font-medium">Connected communities</h3>

            <p className="mt-3 leading-7 text-[#68766f]">
              Households, collectors and community teams work through one
              connected system with clear responsibilities.
            </p>
          </div>

          <div className="rounded-[28px] bg-white p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f4ec] text-[#146044]">
              <ShieldCheck size={23} />
            </div>

            <h3 className="text-xl font-medium">Transparent progress</h3>

            <p className="mt-3 leading-7 text-[#68766f]">
              Users can follow the progress of their environmental requests
              and understand what happens at each stage.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-10 lg:px-16">
        <div className="rounded-[32px] bg-[#0d4f38] px-8 py-12 text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-[#a9d8b9]">
              Be part of the cycle
            </p>

            <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight sm:text-4xl">
              Cleaner communities begin with accountable action.
            </h2>
          </div>

          <Link
            to="/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-medium text-[#0d4f38] transition hover:bg-[#edf7f0] lg:mt-0"
          >
            Join EcoCycle
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
      <Footer/>
    </main>
  );
}

export default About;