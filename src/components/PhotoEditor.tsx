import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PhotoMetadata, EditableSettings } from "@/types";
import { createStoryCanvas, downloadCanvas } from "@/utils/imageProcessing";

interface PhotoEditorProps {
  photo: PhotoMetadata;
  onSettingsChange: (id: string, settings: EditableSettings) => void;
  onRemove: (id: string) => void;
}

export const PhotoEditor = ({
  photo,
  onSettingsChange,
  onRemove,
}: PhotoEditorProps) => {
  const [settings, setSettings] = useState<EditableSettings>({
    cameraModel: photo.cameraModel,
    lens: photo.lens,
    aperture: photo.aperture,
    filmStock: photo.filmStock,
    customSettings: photo.customSettings,
    showCameraInfo: true,
    showSettings: true,
    showColorPalette: true,
  });

  const [previewCanvas, setPreviewCanvas] = useState<HTMLCanvasElement | null>(
    null,
  );
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const canvas = createStoryCanvas(img, photo, settings);
      setPreviewCanvas(canvas);
    };
    img.src = photo.preview;
  }, [photo, settings]);

  const handleSettingChange = (
    key: keyof EditableSettings,
    value: string | boolean,
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(photo.id, newSettings);
  };

  const handleDownload = () => {
    if (previewCanvas) {
      downloadCanvas(previewCanvas, `story-${photo.file.name}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-mono font-semibold truncate">
            {photo.file.name}
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="font-mono"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="font-mono"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRemove(photo.id)}
              className="font-mono text-red-600 hover:text-red-700"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <div className="aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden max-w-xs mx-auto story-preview">
            {previewCanvas && (
              <canvas
                ref={(canvas) => {
                  if (canvas && previewCanvas) {
                    const ctx = canvas.getContext("2d")!;
                    const scale = Math.min(
                      canvas.offsetWidth / previewCanvas.width,
                      canvas.offsetHeight / previewCanvas.height,
                    );
                    canvas.width = previewCanvas.width * scale;
                    canvas.height = previewCanvas.height * scale;
                    ctx.drawImage(
                      previewCanvas,
                      0,
                      0,
                      canvas.width,
                      canvas.height,
                    );
                  }
                }}
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>

        {showSettings && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.95 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.95 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 border-t border-gray-200 pt-4"
            style={{ transformOrigin: "top" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-mono font-medium mb-2">
                  Camera Model
                </label>
                <input
                  type="text"
                  value={settings.cameraModel}
                  onChange={(e) =>
                    handleSettingChange("cameraModel", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-mono font-medium mb-2">
                  Lens
                </label>
                <input
                  type="text"
                  value={settings.lens}
                  onChange={(e) => handleSettingChange("lens", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-mono font-medium mb-2">
                  Aperture
                </label>
                <input
                  type="text"
                  value={settings.aperture}
                  onChange={(e) =>
                    handleSettingChange("aperture", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-mono font-medium mb-2">
                  Film Stock
                </label>
                <input
                  type="text"
                  value={settings.filmStock}
                  onChange={(e) =>
                    handleSettingChange("filmStock", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-mono font-medium mb-2">
                Custom Settings
              </label>
              <textarea
                value={settings.customSettings}
                onChange={(e) =>
                  handleSettingChange("customSettings", e.target.value)
                }
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.showCameraInfo}
                  onChange={(e) =>
                    handleSettingChange("showCameraInfo", e.target.checked)
                  }
                  className="rounded"
                />
                <span className="text-sm font-mono">Show Camera Info</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.showSettings}
                  onChange={(e) =>
                    handleSettingChange("showSettings", e.target.checked)
                  }
                  className="rounded"
                />
                <span className="text-sm font-mono">Show Settings</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.showColorPalette}
                  onChange={(e) =>
                    handleSettingChange("showColorPalette", e.target.checked)
                  }
                  className="rounded"
                />
                <span className="text-sm font-mono">Show Color Palette</span>
              </label>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
