export interface PhotoMetadata {
  id: string;
  file: File;
  preview: string;
  cameraModel: string;
  lens: string;
  aperture: string;
  filmStock: string;
  customSettings: string;
  colors: string[];
}

export interface EditableSettings {
  cameraModel: string;
  lens: string;
  aperture: string;
  filmStock: string;
  customSettings: string;
  showCameraInfo: boolean;
  showSettings: boolean;
  showColorPalette: boolean;
}
