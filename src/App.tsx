import { useState } from 'react';
import { motion } from 'framer-motion';
import { PhotoUpload } from '@/components/PhotoUpload';
import { PhotoEditor } from '@/components/PhotoEditor';
import { BulkActions } from '@/components/BulkActions';
import { BulkSettingsEditor } from '@/components/BulkSettingsEditor';
import { Footer } from '@/components/Footer';
import type { PhotoMetadata, EditableSettings } from '@/types';
import { createStoryCanvas, downloadCanvas } from '@/utils/imageProcessing';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ThemeProvider } from '@/components/ThemeProvider';

function App() {
  const [photos, setPhotos] = useState<PhotoMetadata[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBulkSettings, setShowBulkSettings] = useState(false);

  const handlePhotosUploaded = (newPhotos: PhotoMetadata[]) => {
    setIsProcessing(true);
    setTimeout(() => {
      setPhotos((prev) => [...prev, ...newPhotos]);
      setIsProcessing(false);
    }, 1000);
  };

  const handleSettingsChange = (id: string, settings: EditableSettings) => {
    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === id
          ? {
              ...photo,
              cameraModel: settings.cameraModel,
              lens: settings.lens,
              aperture: settings.aperture,
              filmStock: settings.filmStock,
              customSettings: settings.customSettings,
            }
          : photo,
      ),
    );
  };

  const handleBulkSettingsApply = (bulkSettings: Partial<EditableSettings>) => {
    setPhotos((prev) =>
      prev.map((photo) => ({
        ...photo,
        ...(bulkSettings.cameraModel && {
          cameraModel: bulkSettings.cameraModel,
        }),
        ...(bulkSettings.lens && { lens: bulkSettings.lens }),
        ...(bulkSettings.aperture && { aperture: bulkSettings.aperture }),
        ...(bulkSettings.filmStock && { filmStock: bulkSettings.filmStock }),
        ...(bulkSettings.customSettings && {
          customSettings: bulkSettings.customSettings,
        }),
      })),
    );
  };

  const handleDownloadAll = async () => {
    for (const photo of photos) {
      const img = new Image();
      img.onload = () => {
        const canvas = createStoryCanvas(img, photo, {
          cameraModel: photo.cameraModel,
          lens: photo.lens,
          aperture: photo.aperture,
          filmStock: photo.filmStock,
          customSettings: photo.customSettings,
          showCameraInfo: true,
          showSettings: true,
          showColorPalette: true,
        });
        downloadCanvas(canvas, `story-${photo.file.name}`);
      };
      img.src = photo.preview;

      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  const handleClearAll = () => {
    setPhotos([]);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div
        className="min-h-screen bg-white text-black relative flex flex-col overflow-x-hidden"
        style={{
          background: 'var(--background)',
          color: 'var(--foreground)',
          fontFamily: 'Space Mono, Courier Prime, monospace',
        }}
      >
        <div className="absolute top-4 right-4 z-50">
          <ThemeSwitcher defaultValue="light" />
        </div>

        <main className="flex-1 flex flex-col justify-center py-8">
          <div className="max-w-7xl mx-auto px-4 w-full">
            {photos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center flex flex-col justify-center min-h-[60vh]"
              >
                <PhotoUpload
                  onPhotosUploaded={handlePhotosUploaded}
                  isProcessing={isProcessing}
                />
              </motion.div>
            ) : (
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <PhotoUpload
                    onPhotosUploaded={handlePhotosUploaded}
                    isProcessing={isProcessing}
                    isEditorMode={true}
                  />
                </motion.div>

                <BulkActions
                  photos={photos}
                  onDownloadAll={handleDownloadAll}
                  onClearAll={handleClearAll}
                  onToggleBulkSettings={() => setShowBulkSettings(true)}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {photos.map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <PhotoEditor
                        photo={photo}
                        onSettingsChange={handleSettingsChange}
                        onRemove={handleRemovePhoto}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        <BulkSettingsEditor
          isOpen={showBulkSettings}
          onClose={() => setShowBulkSettings(false)}
          onApply={handleBulkSettingsApply}
        />

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
