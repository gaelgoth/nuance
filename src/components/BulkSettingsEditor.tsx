import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EditableSettings } from "@/types";

interface BulkSettingsEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (settings: Partial<EditableSettings>) => void;
}

export const BulkSettingsEditor = ({
  isOpen,
  onClose,
  onApply,
}: BulkSettingsEditorProps) => {
  const [settings, setSettings] = useState<Partial<EditableSettings>>({
    cameraModel: "",
    lens: "",
    aperture: "",
    filmStock: "",
    customSettings: "",
    showCameraInfo: true,
    showSettings: true,
    showColorPalette: true,
  });

  const handleApply = () => {
    const filteredSettings = Object.entries(settings).reduce(
      (acc, [key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          (acc as Record<string, unknown>)[key] = value;
        }
        return acc;
      },
      {} as Partial<EditableSettings>,
    );

    onApply(filteredSettings);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-mono font-bold">
                Bulk Edit Settings
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-mono font-medium mb-2">
                  Camera Model
                </label>
                <input
                  type="text"
                  value={settings.cameraModel || ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      cameraModel: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                  placeholder="Leave empty to keep existing"
                />
              </div>

              <div>
                <label className="block text-sm font-mono font-medium mb-2">
                  Lens
                </label>
                <input
                  type="text"
                  value={settings.lens || ""}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, lens: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                  placeholder="Leave empty to keep existing"
                />
              </div>

              <div>
                <label className="block text-sm font-mono font-medium mb-2">
                  Aperture
                </label>
                <input
                  type="text"
                  value={settings.aperture || ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      aperture: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                  placeholder="Leave empty to keep existing"
                />
              </div>

              <div>
                <label className="block text-sm font-mono font-medium mb-2">
                  Film Stock
                </label>
                <input
                  type="text"
                  value={settings.filmStock || ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      filmStock: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                  placeholder="Leave empty to keep existing"
                />
              </div>

              <div>
                <label className="block text-sm font-mono font-medium mb-2">
                  Custom Settings
                </label>
                <textarea
                  value={settings.customSettings || ""}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      customSettings: e.target.value,
                    }))
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                  placeholder="Leave empty to keep existing"
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.showCameraInfo}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        showCameraInfo: e.target.checked,
                      }))
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
                      setSettings((prev) => ({
                        ...prev,
                        showSettings: e.target.checked,
                      }))
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
                      setSettings((prev) => ({
                        ...prev,
                        showColorPalette: e.target.checked,
                      }))
                    }
                    className="rounded"
                  />
                  <span className="text-sm font-mono">Show Color Palette</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={onClose} className="font-mono">
                Cancel
              </Button>
              <Button onClick={handleApply} className="font-mono">
                <Check className="h-4 w-4 mr-1" />
                Apply to All
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
