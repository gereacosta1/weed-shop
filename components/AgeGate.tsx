'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { Button } from './ui/button';
import { Card } from './ui/card';

export default function AgeGate() {
  const { ageVerified, setAgeVerified } = useAppStore();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show modal if age not verified on client side only
    const timer = setTimeout(() => {
      if (!ageVerified) {
        setShowModal(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [ageVerified]);

  const handleVerify = (isOfAge: boolean) => {
    if (isOfAge) {
      setAgeVerified(true);
      setShowModal(false);
    } else {
      // Redirect to external site or show message
      window.location.href = 'https://www.google.com';
    }
  };

  if (!showModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
        >
          <Card className="max-w-md mx-auto p-8 text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">Age Verification Required</h2>
                <p className="text-muted-foreground">
                  You must be 21 or older to view this website
                </p>
              </div>

              <div className="mb-6">
                <p className="text-lg font-medium mb-4">
                  Are you 21 years of age or older?
                </p>
              </div>

              <div className="flex gap-4 mb-6">
                <Button
                  onClick={() => handleVerify(true)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  Yes, I'm 21+
                </Button>
                <Button
                  onClick={() => handleVerify(false)}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  No, I'm under 21
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                By entering this site you are agreeing to our{' '}
                <a href="/legal/terms" className="text-green-500 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/legal/privacy" className="text-green-500 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}