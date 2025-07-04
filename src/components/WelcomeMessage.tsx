import { motion } from "framer-motion";
import { Camera, Upload, Palette, Download } from "lucide-react";

export const WelcomeMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center py-12 max-w-4xl mx-auto"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <Camera className="h-16 w-16 mx-auto mb-4 text-black" />
        <h2 className="text-2xl font-mono font-bold mb-2">Welcome to Nuance</h2>
        <p className="text-gray-600 font-mono">
          Transform your photos into shareable Instagram stories with camera
          settings
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
      >
        <div className="text-center">
          <Upload className="h-8 w-8 mx-auto mb-3 text-black" />
          <h3 className="font-mono font-semibold mb-2">Upload</h3>
          <p className="text-sm text-gray-600 font-mono">
            Drag & drop or select multiple photos
          </p>
        </div>
        <div className="text-center">
          <Palette className="h-8 w-8 mx-auto mb-3 text-black" />
          <h3 className="font-mono font-semibold mb-2">Customize</h3>
          <p className="text-sm text-gray-600 font-mono">
            Edit camera settings and view color palettes
          </p>
        </div>
        <div className="text-center">
          <Download className="h-8 w-8 mx-auto mb-3 text-black" />
          <h3 className="font-mono font-semibold mb-2">Share</h3>
          <p className="text-sm text-gray-600 font-mono">
            Download 9:16 format for Instagram stories
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-sm text-gray-500 font-mono"
      >
        All processing happens locally in your browser - no uploads to servers
      </motion.div>
    </motion.div>
  );
};
