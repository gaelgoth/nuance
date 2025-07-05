import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-8 px-4 border-b border-gray-200"
    >
      <div className="max-w-4xl mx-auto flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Camera className="h-8 w-8 text-black" />
          <h1 className="text-3xl font-mono font-bold text-black tracking-tight">
            NUANCE
          </h1>
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center text-gray-600 font-mono mt-2"
      >
        Share your photography settings in style
      </motion.p>
    </motion.header>
  );
}
