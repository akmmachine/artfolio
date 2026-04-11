import React from 'react';
import { ContactForm } from '../components/ContactForm';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Instagram, Twitter, Linkedin } from 'lucide-react';
import { useData } from '../context/DataContext';

export const Contact: React.FC = () => {
  const { profile } = useData();
  
  const socialLinks = [
    { Icon: Instagram, url: profile?.contact?.instagram },
    { Icon: Twitter, url: profile?.contact?.twitter },
    { Icon: Linkedin, url: profile?.contact?.linkedin },
  ].filter(link => link.url);

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-12"
        >
          <div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">Let's <span className="text-primary">Collaborate</span>.</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have a project in mind, want to commission a piece, or just want to say hello? I'd love to hear from you.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-1">Email</h4>
                <p className="text-muted-foreground">{profile?.contact?.email || 'hello@artfolio.com'}</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-1">Studio</h4>
                <p className="text-muted-foreground">
                  {profile?.contact?.address ? (
                    <span className="whitespace-pre-line">{profile.contact.address}</span>
                  ) : (
                    <>123 Creative Lane, Arts District<br />Jaipur, 302017</>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-1">Phone</h4>
                <p className="text-muted-foreground">{profile?.contact?.phone || '+91 7728877446'}</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t">
            <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Follow My Journey</h4>
            <div className="flex gap-4">
              {socialLinks.length > 0 ? (
                socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                  >
                    <link.Icon className="h-5 w-5" />
                  </a>
                ))
              ) : (
                <p className="text-xs text-muted-foreground italic">No social links added yet.</p>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-muted/20 p-8 md:p-12 rounded-3xl border border-muted"
        >
          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
};
