'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const loadingTexts = [
  'Loading system...',
  'Initializing modules...',
  'Establishing connection...',
  'Almost ready...',
];

export default function LoadingScreen({
  onLoadingComplete,
}: {
  onLoadingComplete: () => void;
}) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) =>
        prev < loadingTexts.length - 1 ? prev + 1 : prev
      );
    }, 500);

    const hideTimeout = setTimeout(() => {
      setShowLoading(false);
      onLoadingComplete(); // Signal that loading is complete
    }, 2000);

    return () => {
      clearInterval(textInterval);
      clearTimeout(hideTimeout);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {showLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <div className="space-y-4 text-center">
            <pre className="font-mono text-xs text-green-400">
              {loadingTexts.slice(0, currentTextIndex + 1).join('\n')}
            </pre>
            <div className="flex justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-2 w-2 rounded-full bg-green-500"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
