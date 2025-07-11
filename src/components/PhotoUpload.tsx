import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PhotoMetadata } from '@/types';
import {
  extractColorsFromImage,
  generateUniqueId,
} from '@/utils/imageProcessing';
import { NeonGradientCard } from '@/components/magicui/neon-gradient-card';

interface PhotoUploadProps {
  onPhotosUploaded: (photos: PhotoMetadata[]) => void;
  isProcessing: boolean;
  isEditorMode?: boolean;
}

export const PhotoUpload = ({
  onPhotosUploaded,
  isProcessing,
  isEditorMode = false,
}: PhotoUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const processFiles = useCallback(
    async (filesToProcess?: File[]) => {
      const files = filesToProcess || selectedFiles;
      if (files.length === 0) return;

      const processedPhotos: PhotoMetadata[] = [];

      for (const file of files) {
        const preview = URL.createObjectURL(file);
        const img = new Image();

        await new Promise((resolve) => {
          img.onload = resolve;
          img.src = preview;
        });

        const colors = await extractColorsFromImage(img);

        const photo: PhotoMetadata = {
          id: generateUniqueId(),
          file,
          preview,
          cameraModel: 'Camera Model',
          lens: 'Lens Model',
          aperture: 'f/2.8',
          filmStock: 'Film Stock',
          customSettings: 'Custom Settings',
          colors,
        };

        processedPhotos.push(photo);
      }

      onPhotosUploaded(processedPhotos);
      setSelectedFiles([]);
    },
    [selectedFiles, onPhotosUploaded],
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith('image/'),
      );

      if (files.length > 0) {
        setSelectedFiles(files);
        setTimeout(() => processFiles(files), 100);
      }
    },
    [processFiles],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []).filter((file) =>
        file.type.startsWith('image/'),
      );

      if (files.length > 0) {
        setSelectedFiles(files);
        setTimeout(() => processFiles(files), 100);
      }
    },
    [processFiles],
  );

  const uploadContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{
        opacity: 1,
        scale: dragActive ? 1.02 : 1,
        filter: dragActive ? 'brightness(1.1)' : 'brightness(1)',
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`text-center transition-all duration-300 ${
        dragActive ? 'shadow-lg' : ''
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <Upload className="mx-auto h-12 w-12 mb-4" />
      <h3 className="text-lg font-mono font-semibold mb-2">Upload Photos</h3>
      <p className="font-mono mb-4">
        Drop images here or click to select files
      </p>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload">
        <Button asChild>
          <span className="font-mono">Select Files</span>
        </Button>
      </label>
    </motion.div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {isEditorMode ? (
        <div
          className="max-w-full border rounded-lg p-6"
          style={{
            background: 'var(--card)',
            color: 'var(--card-foreground)',
            borderColor: 'var(--border)',
          }}
        >
          {uploadContent}
        </div>
      ) : (
        <NeonGradientCard className="max-w-full">
          {uploadContent}
        </NeonGradientCard>
      )}

      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-6 text-center"
        >
          <div className="font-mono text-lg">Processing images...</div>
          <div className="text-sm text-gray-600 font-mono mt-2">
            Please wait while processing images...
          </div>
        </motion.div>
      )}
    </div>
  );
};
