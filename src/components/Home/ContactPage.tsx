const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center md:px-6 py-12">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-12 text-center max-w-2xl">
        We’d love to hear from you! Please fill out the form below for any inquiries, feedback, or general information. 
        Our team will get back to you as soon as possible.
      </p>

      {/* Contact Form */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8">
        <form className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md "
            />
          </div>
          
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md "
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-gray-700 font-medium" htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium" htmlFor="message">Message</label>
            <textarea
              id="message"
              placeholder="Type your message here"
              className="w-full h-40 px-4 py-3 border border-gray-300 rounded-md outline-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white font-bold py-3 rounded-md  transition-all duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Additional Info */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-medium text-gray-800 mb-2">Our Office</h3>
        <p className="text-gray-600">Nyamirambo, Kigali-Rwanda</p>
        <p className="text-gray-600">Phone: +250 786 875 7890</p>
        <p className="text-gray-600">Email: support@craftopia.com</p>
      </div>
    </div>
  );
};

export default ContactPage;
