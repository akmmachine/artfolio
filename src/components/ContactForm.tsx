import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { motion } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-12 text-center bg-muted/30 rounded-2xl"
      >
        <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
        <h3 className="text-2xl font-display font-bold mb-2">Message Sent!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for reaching out. I'll get back to you as soon as possible.
        </p>
        <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="John Doe" required className="bg-muted/50 border-none" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="john@example.com" required className="bg-muted/50 border-none" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" placeholder="Project Inquiry" required className="bg-muted/50 border-none" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell me about your project or just say hi..."
          className="min-h-[150px] bg-muted/50 border-none resize-none"
          required
        />
      </div>
      <Button type="submit" className="w-full h-12 gap-2 text-lg" disabled={isLoading}>
        {isLoading ? (
          "Sending..."
        ) : (
          <>
            Send Message <Send className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
};
