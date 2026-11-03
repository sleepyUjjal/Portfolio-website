import React from 'react';
import { motion } from 'framer-motion';

// Unified, smooth image transition replacing the sliced effect for better performance and aesthetics
export const ImageTransition = ({ src, alt }) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ 
        duration: 0.15, 
        ease: "easeOut"
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        imageRendering: 'pixelated',
      }}
    />
  );
};
