import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      color: "text-[var(--brand-accent)]",
      title: "Our Address",
      detail: "5/4L ZEE Mart Okara, Pakistan",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      color: "text-[var(--brand-accent)]",
      title: "Phone Number",
      detail: "+92 0313 1435116",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      color: "text-indigo-400",
      title: "Email Address",
      detail: "harisshahnawaz97@gmail.com",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      color: "text-muted-foreground",
      title: "Working Hours",
      detail: "Mon – Sat: 9:00 AM – 6:00 PM",
    },
  ];

  return (
    <section className="w-full bg-white min-h-screen">
      {/* Header Section */}
      <div className="max-w-360 mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-8 md:pb-12 text-center">
        <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-4">
          Get in Touch
        </p>
        <div className="flex flex-col items-center mb-6">
          <h2 className="font-serif text-[3rem] md:text-[4rem] font-black text-foreground mb-3">
            Contact Us
          </h2>
          <div className="w-12 h-0.5 bg-foreground" />
        </div>
        <p className="max-w-2xl mx-auto font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
          Have a question, feedback, or need help with an order? We're here for you.
        </p>
      </div>

      {/* Main Content Grid - Adjusted for Equal Height */}
      <div className="max-w-360 mx-auto px-6 md:px-12 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-stretch">
          
          {/* Left Column - Information & Map (Flexbox ensures height matches right side) */}
          <div className="flex flex-col h-full space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactInfo.map((info) => (
                <div 
                  key={info.title}
                  className="bg-white p-5 rounded-2xl shadow-sm flex items-start space-x-4 border border-border/50"
                >
                  <div className={`${info.color} mt-0.5`}>{info.icon}</div>
                  <div>
                    <h3 className="font-sans text-[13px] font-semibold text-foreground">{info.title}</h3>
                    <p className="font-sans text-[13px] text-muted-foreground">{info.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* The Map now takes up all remaining space to match form height */}
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-border/50 grow min-h-75">
              <iframe
                title="Store Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109156.40134440702!2d73.37682281987546!3d30.806659858509494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922a6e9a657519b%3A0xcad03957805128ff!2sOkara%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1714844390000!5m2!1sen!2s"
                width="100%"
                height="100%"
                className="border-0 rounded-xl w-full h-full"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-border/50 h-full flex flex-col justify-center">
            <h3 className="font-serif text-[1.8rem] md:text-[2.2rem] font-black text-foreground mb-8">
              Send a Message
            </h3>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Full Name</label>
                <input type="text" placeholder="Haris Shahnawaz" className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:ring-1 focus:ring-primary font-sans text-[13px]" />
              </div>
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Email Address</label>
                <input type="email" placeholder="you@example.com" className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:ring-1 focus:ring-primary font-sans text-[13px]" />
              </div>
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Subject</label>
                <input type="text" placeholder="How can we help?" className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:ring-1 focus:ring-primary font-sans text-[13px]" />
              </div>
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Message</label>
                <textarea rows="4" placeholder="Write your message here..." className="w-full px-4 py-3.5 bg-background border border-border rounded-xl focus:ring-1 focus:ring-primary resize-none font-sans text-[13px]"></textarea>
              </div>
              <button type="submit" className="w-full bg-primary text-primary-foreground font-sans text-[11px] font-bold uppercase tracking-[0.2em] py-4 rounded-xl hover:opacity-90 transition-opacity mt-2">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}