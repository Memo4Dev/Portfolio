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
      let response;

      if (import.meta.env.DEV) {
        response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          }),
        });
        if (!response.ok) throw new Error("Failed to send message");
      } else {
        const fallbackData = new FormData();
        fallbackData.append("name", formData.name);
        fallbackData.append("email", formData.email);
        fallbackData.append("subject", formData.subject);
        fallbackData.append("message", formData.message);
        response = await fetch("https://formsubmit.co/ajax/mesam7849@gmail.com", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: fallbackData,
        });
      }

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Failed to send message");
      }

      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully!',
        icon: 'success',
        confirmButtonColor: '#d4af7a',
        timer: 2000,
        timerProgressBar: true,
        background: '#101417',
        color: '#e0e2e6'
      });

      setFormData({ name: "", email: "", subject: "", message: "" });

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#d4af7a',
        background: '#101417',
        color: '#e0e2e6'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden" id="Contact">
      <div className="container mx-auto px-[5%] md:px-[10%] py-20">
        {/* Title */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary">
            <span className="font-mono text-sm text-secondary/50 mr-2">&gt;_</span>Get In Touch
          </h2>
          <p className="text-[#909097] mt-2 text-sm md:text-base">
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
            <div className="bg-surface-container/80 rounded-2xl p-6 py-8 backdrop-blur-xl border border-[#46464d]">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-[#e0e2e6] mb-2 flex items-center gap-2">
                    <span className="inline-block w-8 h-1 bg-secondary rounded-full"></span>
                    Send Message
                  </h3>
                  <p className="text-[#909097] text-sm">
                    Have something to discuss? Send me a message and let's talk.
                  </p>
                </div>
                <Share2 className="w-10 h-10 text-secondary opacity-50" />
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <User className="absolute left-4 top-4 w-5 h-5 text-[#909097] group-focus-within:text-secondary transition-colors" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      disabled={isSubmitting}
                      className="w-full p-4 pl-12 bg-surface-container-high/60 rounded-xl border border-[#46464d] placeholder-[#909097] text-[#e0e2e6] focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/50 transition-all duration-300 hover:border-secondary/30 disabled:opacity-50"
                      required
                    />
                  </div>

                  <div className="relative group">
                    <Mail className="absolute left-4 top-4 w-5 h-5 text-[#909097] group-focus-within:text-secondary transition-colors" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      disabled={isSubmitting}
                      className="w-full p-4 pl-12 bg-surface-container-high/60 rounded-xl border border-[#46464d] placeholder-[#909097] text-[#e0e2e6] focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/50 transition-all duration-300 hover:border-secondary/30 disabled:opacity-50"
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
                    className="w-full p-4 bg-surface-container-high/60 rounded-xl border border-[#46464d] placeholder-[#909097] text-[#e0e2e6] focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/50 transition-all duration-300 hover:border-secondary/30 disabled:opacity-50"
                    required
                  />
                </div>

                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-[#909097] group-focus-within:text-secondary transition-colors" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    disabled={isSubmitting}
                    rows="4"
                    className="w-full resize-none p-4 pl-12 bg-surface-container-high/60 rounded-xl border border-[#46464d] placeholder-[#909097] text-[#e0e2e6] focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/50 transition-all duration-300 hover:border-secondary/30 disabled:opacity-50"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-secondary text-obsidian py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-accent-gold-light hover:scale-[1.02] hover:shadow-lg hover:shadow-secondary/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
