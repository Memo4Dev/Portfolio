import React, { useState } from "react";
import SocialLinks from "../components/SocialLinks";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import Swal from "sweetalert2";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: 'Sending Message...',
      html: 'Please wait while we send your message',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      // Get form data
      const form = e.target;
      const formData = new FormData(form);

      // Submit form
      await form.submit();

      // Show success message
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully!',
        icon: 'success',
        confirmButtonColor: '#6366f1',
        timer: 2000,
        timerProgressBar: true,
        background: '#030014',
        color: '#ffffff'
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#6366f1',
        background: '#030014',
        color: '#ffffff'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] overflow-hidden" id="Contact">
      <div className="container mx-auto px-[5%] md:px-[10%] py-20">
        {/* Title */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Let's connect and discuss potential collaborations
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 gap-8">
          {/* Social Links */}
          <div className="w-full" data-aos="fade-up" data-aos-delay="200">
            <SocialLinks />
          </div>

          {/* Form */}
          <div className="w-full" data-aos="fade-up" data-aos-delay="400">
            <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 py-8 backdrop-blur-xl">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                    <span className="inline-block w-8 h-1 bg-indigo-500 rounded-full"></span>
                    Send Message
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Have something to discuss? Send me a message and let's talk.
                  </p>
                </div>
                <Share2 className="w-10 h-10 text-[#6366f1] opacity-50" />
              </div>

              <form
                action="https://formsubmit.co/mesam7849@gmail.com" 
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* FormSubmit Configuration */}
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      disabled={isSubmitting}
                      className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                      required
                    />
                  </div>

                  <div className="relative group">
                    <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      disabled={isSubmitting}
                      className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                      required
                    />
                  </div>
                </div>

                <div className="relative group">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    disabled={isSubmitting}
                    className="w-full p-4 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                    required
                  />
                </div>

                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    disabled={isSubmitting}
                    rows="4"
                    className="w-full resize-none p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;