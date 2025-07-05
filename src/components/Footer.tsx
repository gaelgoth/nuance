import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

export const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="w-full py-8 px-4 mt-auto"
    >
      <div className="max-w-4xl mx-auto flex justify-center">
        <div className="flex items-center space-x-4 bg-black text-white px-4 py-2 rounded-full">
          <span className="font-mono text-sm">v1.0.0</span>
          <div className="w-px h-4 bg-white opacity-30" />
          <a
            href="https://github.com/gaelgoth/nuance"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Github className="h-4 w-4" />
            <span className="font-mono text-sm">GitHub</span>
          </a>
        </div>
      </div>
    </motion.footer>
  );
};
