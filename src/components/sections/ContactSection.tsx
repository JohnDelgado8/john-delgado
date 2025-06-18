'use client';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Sending...');

    try {
      const response = await fetch('/api/send-email', { // Your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('Message sent successfully! I will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(result.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('Failed to send message. Please try again or email me directly.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const inputClass = `w-full p-3 bg-card border border-card-border rounded-lg focus:ring-2
                    focus:ring-primary focus:border-primary outline-none transition-all text-text placeholder-text-dark`;

  return (
    <AnimatedSection id="contact">
      <h2 className="text-4xl font-bold text-center mb-12">
        Get In <span className="text-primary">Touch</span>
      </h2>
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* THIS IS THE PART THAT SHOULD NOT BE REMOVED */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-8"
        >
          <p className="text-lg text-text-dark">
            Im always open to discussing new projects, creative ideas, or opportunities to
            be part of something amazing. Feel free to reach out!
          </p>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Mail size={24} className="text-primary" />
              {/* Remember to replace with your actual email */}
              <a href="mailto:your.actual.email@example.com" className="text-text hover:text-primary transition-colors">
                your.actual.email@example.com
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Phone size={24} className="text-primary" />
              <span className="text-text">(+123) 456 7890 (Optional)</span>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin size={24} className="text-primary" />
              <span className="text-text">Your City, Country (Optional)</span>
            </div>
          </div>
        </motion.div>
        {/* END OF THE PART THAT SHOULD NOT BE REMOVED */}

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay:0.2, ease: 'easeOut' }}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-dark mb-1">Full Name</label>
            <input type="text" name="name" id="name" required className={inputClass} value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-1">Email Address</label>
            <input type="email" name="email" id="email" required className={inputClass} value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-text-dark mb-1">Message</label>
            <textarea name="message" id="message" rows={5} required className={inputClass} value={formData.message} onChange={handleChange}></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-primary text-background font-semibold px-6 py-3 rounded-lg
                         text-lg hover:bg-accent hover:text-white transition-all duration-300
                         shadow-md hover:shadow-glow-accent transform hover:scale-105 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
          {status && (
            <p className={`text-sm mt-4 text-center ${status.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
              {status}
            </p>
          )}
        </motion.form>
      </div>
    </AnimatedSection>
  );
}