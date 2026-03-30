'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@ieee.ipb.ac.id',
      href: 'mailto:contact@ieee.ipb.ac.id',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+62 xxx xxxx xxxx',
      href: 'tel:+62xxxxxxxxxx',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'IPB University, Bogor, Indonesia',
      href: 'https://maps.google.com',
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-700 mb-4">
            Get In <span className="text-accent-cyan">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-accent-cyan mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions or want to join us? We'd love to hear from you. Send
            us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-navy-700 mb-6">
                Send us a message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us what you're thinking..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2" size={18} />
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-navy-700 mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-start gap-4 group hover:bg-navy-50 p-4 rounded-lg transition-colors duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-navy-500 to-accent-cyan rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <info.icon className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-1">
                        {info.label}
                      </p>
                      <p className="text-navy-700 font-medium">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold text-navy-700 mb-4">
                Follow Us
              </h3>
              <p className="text-gray-600 mb-6">
                Stay connected with us on social media for updates, events, and
                more.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/ieeesbipb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-navy-500 to-accent-cyan rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                >
                  IG
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-gradient-to-br from-navy-500 to-accent-cyan rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                >
                  LI
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-gradient-to-br from-navy-500 to-accent-cyan rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                >
                  TW
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
