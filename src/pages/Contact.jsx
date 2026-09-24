import { useState } from "react";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import Navbar from "../component/Nav";
import Footer from "../component/Footer";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // We will connect this to the backend later.
    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-[#f7f9f6] text-[#18352a]">
      <Navbar />
      {/* Contact header */}
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-20 sm:px-10 lg:px-16 lg:pt-24">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-wide text-[#2d8b57]">
            Contact
          </p>

          <h1 className="text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            How can we help?
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#68766f]">
            Have a question about EcoCycle, your collection request, rewards or
            something else? Send us a message and we'll get back to you.
          </p>
        </div>
      </section>

      {/* Main contact area */}
      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Contact information */}
          <div className="rounded-[32px] bg-white p-8 sm:p-10 lg:p-12">
            <p className="text-sm font-medium uppercase tracking-wide text-[#2d8b57]">
              Get in touch
            </p>

            <h2 className="mt-4 text-3xl font-medium tracking-tight">
              We're here to listen.
            </h2>

            <p className="mt-5 leading-7 text-[#68766f]">
              Whether you need help with a request, want to report an issue or
              simply want to learn more about EcoCycle, you can reach out to
              our team.
            </p>

            <div className="mt-10 space-y-7">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8f4ec] text-[#146044]">
                  <Mail size={20} />
                </div>

                <div>
                  <p className="font-medium">Email</p>
                  <p className="mt-1 text-[#68766f]">
                    support@ecocycle.com
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8f4ec] text-[#146044]">
                  <MapPin size={20} />
                </div>

                <div>
                  <p className="font-medium">Community support</p>
                  <p className="mt-1 text-[#68766f]">
                    Supporting cleaner communities through connected
                    environmental services.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8f4ec] text-[#146044]">
                  <MessageCircle size={20} />
                </div>

                <div>
                  <p className="font-medium">General enquiries</p>
                  <p className="mt-1 text-[#68766f]">
                    Questions, feedback and partnership enquiries are welcome.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-[32px] bg-white p-8 sm:p-10 lg:p-12">
            <h2 className="text-3xl font-medium tracking-tight">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter value"
                  required
                  className="w-full rounded-xl border border-[#d8e0da] bg-white px-4 py-4 text-base outline-none transition placeholder:text-[#7b8780] focus:border-[#2d8b57] focus:ring-2 focus:ring-[#2d8b57]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter value"
                  required
                  className="w-full rounded-xl border border-[#d8e0da] bg-white px-4 py-4 text-base outline-none transition placeholder:text-[#7b8780] focus:border-[#2d8b57] focus:ring-2 focus:ring-[#2d8b57]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter value"
                  required
                  rows={5}
                  className="w-full resize-none rounded-xl border border-[#d8e0da] bg-white px-4 py-4 text-base outline-none transition placeholder:text-[#7b8780] focus:border-[#2d8b57] focus:ring-2 focus:ring-[#2d8b57]/10"
                />
              </div>

              {submitted && (
                <div className="rounded-xl bg-[#e8f4ec] px-4 py-3 text-sm text-[#146044]">
                  Thanks for reaching out. Your message has been received.
                </div>
              )}

              <button
                type="submit"
                className="rounded-xl bg-[#0d4f38] px-7 py-3.5 font-medium text-white transition hover:bg-[#083d2b]"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default Contact;