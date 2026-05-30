import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Calendar, Video, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim() || 'No message provided';

    // Format a professional WhatsApp message with the booking details
    const baseText = `Hello Talha, I would like to book a Zoom scaling session with you.\n\nHere are my booking details:\n• Name: ${name}\n• Email: ${email}\n• Message: ${message}\n\nPlease let me know your availability!`;
    const whatsappUrl = `https://wa.me/923343194542?text=${encodeURIComponent(baseText)}`;

    // Redirect to WhatsApp immediately (synchronously to avoid browser popup blockers)
    window.open(whatsappUrl, '_blank');

    setIsSuccess(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            {/* Overlay */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
              />
            </Dialog.Overlay>

            {/* Content Container */}
            <div className="fixed inset-0 overflow-y-auto z-[101] flex items-center justify-center p-4">
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  className="w-full max-w-lg liquid-glass-strong rounded-3xl p-8 text-white relative focus:outline-none"
                >
                  {/* Close button */}
                  <Dialog.Close asChild>
                    <button className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors rounded-full p-2 hover:bg-white/5 border-none cursor-pointer">
                      <X className="w-5 h-5" />
                    </button>
                  </Dialog.Close>

                  <AnimatePresence mode="wait">
                    {!isSuccess ? (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Dialog.Title className="font-heading italic text-3xl md:text-4xl text-white mb-2 leading-none">
                          Book a Quick Meet Scaling Session
                        </Dialog.Title>
                        <Dialog.Description className="font-body font-light text-white/60 text-sm mb-6">
                          Claim your free 5-10 minute scaling session. We'll map out a direct growth pipeline for your business.
                        </Dialog.Description>

                        {/* Meeting Info */}
                        <div className="flex flex-col gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 font-body text-sm font-light text-white/80">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4.5 h-4.5 text-white/50" />
                            <span>5 - 10 Minutes</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Video className="w-4.5 h-4.5 text-white/50" />
                            <span>Google Meet / Video Conference</span>
                          </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4 font-body">
                          <div>
                            <label className="block text-xs uppercase tracking-wider text-white/40 mb-1.5 font-medium">Name</label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Sarah Chen"
                              className="w-full bg-white/[0.02] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-xs uppercase tracking-wider text-white/40 mb-1.5 font-medium">Email Address</label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="sarah@luminary.com"
                              className="w-full bg-white/[0.02] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-xs uppercase tracking-wider text-white/40 mb-1.5 font-medium">Message (Optional)</label>
                            <textarea
                              rows={3}
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              placeholder="Tell us about your budget & goals..."
                              className="w-full bg-white/[0.02] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none transition-colors resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-white text-black hover:bg-white/90 disabled:bg-white/50 text-sm font-medium py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 mt-6 cursor-pointer border-none font-body"
                          >
                            {isSubmitting ? (
                              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            ) : (
                              <>
                                <Calendar className="w-4 h-4" />
                                <span>Schedule Meet Scaling Session</span>
                              </>
                            )}
                          </button>
                        </form>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-8 font-body flex flex-col items-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 mb-6">
                          <motion.svg
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="w-8 h-8 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <motion.path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </motion.svg>
                        </div>
                        <h3 className="font-heading italic text-3xl text-white mb-2 leading-none">
                          Meeting Requested!
                        </h3>
                        <p className="font-body font-light text-white/60 text-sm max-w-sm mb-8 leading-relaxed">
                          We've received your request! A calendar invitation with meeting details will be sent to your email shortly.
                        </p>
                        <button
                          onClick={() => {
                            setIsSuccess(false);
                            onClose();
                          }}
                          className="px-8 py-3 bg-white/10 hover:bg-white/20 text-sm font-medium rounded-full text-white border border-white/10 transition-colors cursor-pointer"
                        >
                          Done
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
