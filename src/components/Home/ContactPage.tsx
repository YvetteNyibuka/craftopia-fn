import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warmGray-50 to-craft-50 flex items-center justify-center px-4">
        <Card className="max-w-lg mx-auto text-center p-8 shadow-lg">
          <div className="mb-6">
            <Icon
              icon="mdi:check-circle"
              className="w-16 h-16 text-green-500 mx-auto mb-4"
            />
            <h1 className="text-2xl font-serif font-bold text-warmGray-900 mb-3">
              Message Sent!
            </h1>
            <p className="text-warmGray-600 mb-6">
              Thanks for reaching out. We'll get back to you soon.
            </p>
            <Button
              variant="primary"
              onClick={() => setSubmitted(false)}
              className="flex items-center gap-2 mx-auto"
            >
              <Icon icon="mdi:arrow-left" className="w-4 h-4" />
              Send Another
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warmGray-50 to-craft-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header - Simple and Humble */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon icon="mdi:email-outline" className="w-8 h-8 text-craft-500" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-warmGray-800">
              Let's Talk
            </h1>
          </div>
          <p className="text-lg text-warmGray-600 max-w-2xl mx-auto">
            Have questions? Need something custom? Just want to chat about
            crafts? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-6 md:p-8 shadow-lg">
              <div className="mb-6">
                <h2 className="text-2xl font-serif font-bold text-warmGray-800 mb-2">
                  Drop us a line
                </h2>
                <p className="text-warmGray-600">
                  Fill out the form and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-warmGray-700">
                      Name
                    </label>
                    <div className="relative">
                      <Icon
                        icon="mdi:account-outline"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warmGray-400"
                      />
                      <input
                        name="name"
                        type="text"
                        placeholder="Your name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-warmGray-700">
                      Email
                    </label>
                    <div className="relative">
                      <Icon
                        icon="mdi:email-outline"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warmGray-400"
                      />
                      <input
                        name="email"
                        type="email"
                        placeholder="you@email.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-warmGray-700">
                    Subject
                  </label>
                  <div className="relative">
                    <Icon
                      icon="mdi:message-outline"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warmGray-400"
                    />
                    <input
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-warmGray-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us more..."
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-transparent transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Icon
                        icon="mdi:loading"
                        className="w-5 h-5 animate-spin"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:send" className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Info & Quick Links */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="p-6 shadow-lg">
              <h3 className="text-xl font-serif font-bold text-warmGray-800 mb-4 flex items-center gap-2">
                <Icon
                  icon="mdi:map-marker"
                  className="w-5 h-5 text-craft-500"
                />
                Visit Us
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon
                    icon="mdi:home-outline"
                    className="w-5 h-5 text-craft-500 mt-0.5"
                  />
                  <div>
                    <p className="font-medium text-warmGray-900">Studio</p>
                    <p className="text-sm text-warmGray-600">
                      Nyamirambo, Kigali
                    </p>
                    <p className="text-sm text-warmGray-600">Rwanda</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Icon
                    icon="mdi:phone"
                    className="w-5 h-5 text-craft-500 mt-0.5"
                  />
                  <div>
                    <p className="font-medium text-warmGray-900">Call</p>
                    <p className="text-sm text-warmGray-600">
                      +250 786 875 7890
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Icon
                    icon="mdi:email"
                    className="w-5 h-5 text-craft-500 mt-0.5"
                  />
                  <div>
                    <p className="font-medium text-warmGray-900">Email</p>
                    <p className="text-sm text-warmGray-600">
                      hello@craftopia.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Icon
                    icon="mdi:clock-outline"
                    className="w-5 h-5 text-craft-500 mt-0.5"
                  />
                  <div>
                    <p className="font-medium text-warmGray-900">Hours</p>
                    <p className="text-sm text-warmGray-600">
                      Mon-Fri: 9AM-6PM
                    </p>
                    <p className="text-sm text-warmGray-600">Sat: 10AM-4PM</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Social Links */}
            <Card className="p-6 shadow-lg">
              <h3 className="text-xl font-serif font-bold text-warmGray-800 mb-4 flex items-center gap-2">
                <Icon icon="mdi:heart" className="w-5 h-5 text-craft-500" />
                Connect
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="#"
                  className="flex items-center gap-2 p-3 bg-craft-50 hover:bg-craft-100 rounded-lg transition-colors group"
                >
                  <Icon
                    icon="mdi:instagram"
                    className="w-5 h-5 text-craft-500 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-sm font-medium text-warmGray-700">
                    Instagram
                  </span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-2 p-3 bg-craft-50 hover:bg-craft-100 rounded-lg transition-colors group"
                >
                  <Icon
                    icon="mdi:facebook"
                    className="w-5 h-5 text-craft-500 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-sm font-medium text-warmGray-700">
                    Facebook
                  </span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-2 p-3 bg-craft-50 hover:bg-craft-100 rounded-lg transition-colors group"
                >
                  <Icon
                    icon="mdi:twitter"
                    className="w-5 h-5 text-craft-500 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-sm font-medium text-warmGray-700">
                    Twitter
                  </span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-2 p-3 bg-craft-50 hover:bg-craft-100 rounded-lg transition-colors group"
                >
                  <Icon
                    icon="mdi:whatsapp"
                    className="w-5 h-5 text-craft-500 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-sm font-medium text-warmGray-700">
                    WhatsApp
                  </span>
                </a>
              </div>
            </Card>

            {/* Quick Newsletter */}
            <Card className="p-6 shadow-lg bg-gradient-to-br from-craft-50 to-sage-50">
              <h3 className="text-lg font-serif font-bold text-warmGray-800 mb-2 flex items-center gap-2">
                <Icon icon="mdi:newspaper" className="w-5 h-5 text-craft-500" />
                Stay Updated
              </h3>
              <p className="text-sm text-warmGray-600 mb-4">
                Get craft tips and new collection updates.
              </p>

              <div className="space-y-3">
                <div className="relative">
                  <Icon
                    icon="mdi:email-outline"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-warmGray-400"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full pl-9 pr-4 py-2 text-sm border border-warmGray-300 rounded-lg focus:ring-2 focus:ring-craft-500 focus:border-transparent transition-colors"
                  />
                </div>
                <Button variant="primary" size="sm" className="w-full text-sm">
                  Subscribe
                </Button>
                <p className="text-xs text-warmGray-500 text-center">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick FAQ */}
        <div className="mt-12">
          <Card className="p-6 md:p-8 shadow-lg">
            <h2 className="text-2xl font-serif font-bold text-warmGray-800 mb-6 text-center flex items-center justify-center gap-2">
              <Icon
                icon="mdi:help-circle-outline"
                className="w-6 h-6 text-craft-500"
              />
              Quick Questions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-warmGray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon icon="mdi:palette" className="w-5 h-5 text-craft-500" />
                  <h4 className="font-semibold text-warmGray-800">
                    Custom Work?
                  </h4>
                </div>
                <p className="text-sm text-warmGray-600">
                  Yes! We love creating custom pieces. Just tell us your vision.
                </p>
              </div>

              <div className="p-4 bg-warmGray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon
                    icon="mdi:truck-delivery"
                    className="w-5 h-5 text-craft-500"
                  />
                  <h4 className="font-semibold text-warmGray-800">Shipping?</h4>
                </div>
                <p className="text-sm text-warmGray-600">
                  Free shipping in Kigali. Nationwide and international rates calculated at
                  checkout.
                </p>
              </div>

              <div className="p-4 bg-warmGray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon
                    icon="mdi:clock-fast"
                    className="w-5 h-5 text-craft-500"
                  />
                  <h4 className="font-semibold text-warmGray-800">How Long?</h4>
                </div>
                <p className="text-sm text-warmGray-600">
                  Ready-made items ship in 1-2 hours. Custom pieces take 1-3 days.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
