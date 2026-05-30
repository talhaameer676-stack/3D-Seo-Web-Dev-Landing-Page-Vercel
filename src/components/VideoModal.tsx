import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoSrc }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/95 backdrop-blur-lg z-[100]"
              />
            </Dialog.Overlay>

            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  className="w-full max-w-5xl aspect-video bg-black rounded-3xl relative overflow-hidden focus:outline-none border border-white/10"
                >
                  <Dialog.Close asChild>
                    <button className="absolute top-4 right-4 z-10 text-white/50 hover:text-white transition-colors rounded-full p-2 bg-black/50 backdrop-blur-sm border-none cursor-pointer">
                      <X className="w-5 h-5" />
                    </button>
                  </Dialog.Close>

                  <video
                    src={videoSrc}
                    className="w-full h-full object-cover"
                    autoPlay
                    controls
                    playsInline
                  />
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
