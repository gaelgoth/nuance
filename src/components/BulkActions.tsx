import { motion } from "framer-motion";
import { Download, Settings, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PhotoMetadata } from "@/types";

interface BulkActionsProps {
  photos: PhotoMetadata[];
  onDownloadAll: () => void;
  onClearAll: () => void;
  onToggleBulkSettings: () => void;
}

export const BulkActions = ({
  photos,
  onDownloadAll,
  onClearAll,
  onToggleBulkSettings,
}: BulkActionsProps) => {
  if (photos.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap items-center justify-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
    >
      <span className="font-mono text-sm text-gray-600">
        {photos.length} photo{photos.length !== 1 ? "s" : ""} ready
      </span>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleBulkSettings}
          className="font-mono"
        >
          <Settings className="h-4 w-4 mr-1" />
          Bulk Edit
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onDownloadAll}
          className="font-mono"
        >
          <Download className="h-4 w-4 mr-1" />
          Download All
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onClearAll}
          className="font-mono text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Clear All
        </Button>
      </div>
    </motion.div>
  );
};
