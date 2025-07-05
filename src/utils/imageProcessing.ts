import { extractColors } from 'extract-colors';
import type { PhotoMetadata, EditableSettings } from '../types';

export const extractColorsFromImage = async (
  imageElement: HTMLImageElement,
): Promise<string[]> => {
  try {
    const colors = await extractColors(imageElement, {
      pixels: 10000,
      distance: 0.22,
      colorValidator: (_red, _green, _blue, alpha = 255) => alpha > 250,
      saturationDistance: 0.2,
      lightnessDistance: 0.2,
      hueDistance: 0.083333333,
    });

    const extractedColors = colors.slice(0, 5).map((color) => color.hex);

    // # TODO: Ensure we always have 5 colors, filling with neutral colors if necessary
    while (extractedColors.length < 5) {
      const fallbackColors = [
        '#000000',
        '#333333',
        '#666666',
        '#999999',
        '#CCCCCC',
      ];
      extractedColors.push(fallbackColors[extractedColors.length]);
    }

    return extractedColors;
  } catch (error) {
    console.error('Error extracting colors:', error);
    return ['#000000', '#333333', '#666666', '#999999', '#CCCCCC'];
  }
};

export const createStoryCanvas = (
  image: HTMLImageElement,
  metadata: PhotoMetadata,
  settings: EditableSettings,
): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  // For 9:16 ratio
  const storyWidth = 1080;
  const storyHeight = 1920;
  const marginSize = 15;

  canvas.width = storyWidth;
  canvas.height = storyHeight;

  // Fill with white background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, storyWidth, storyHeight);

  // Calculate image dimensions to fit within the story format
  const availableWidth = storyWidth;
  const availableHeight = storyHeight - marginSize * 2 - 80; // Space for color palette

  const imageAspectRatio = image.width / image.height;
  const availableAspectRatio = availableWidth / availableHeight;

  let imageWidth, imageHeight, imageX, imageY;

  if (imageAspectRatio > availableAspectRatio) {
    // Image is wider than available space (landscape) - touch borders horizontally
    imageWidth = availableWidth;
    imageHeight = availableWidth / imageAspectRatio;
    imageX = 0;
    imageY = marginSize + (availableHeight - imageHeight) / 2;
  } else {
    // Image is taller than available space (portrait) - make it bigger, touching top/bottom margins
    imageHeight = availableHeight;
    imageWidth = availableHeight * imageAspectRatio;
    imageX = (storyWidth - imageWidth) / 2;
    imageY = marginSize;
  }

  // Draw the image
  ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);

  // Set font for text - made larger for better readability
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 50px "Courier New", monospace'; // TODO: change font

  // Draw camera info (top-left)
  if (settings.showCameraInfo) {
    const cameraText = `${metadata.cameraModel}`;
    const lensText = `${metadata.lens}`;

    const textY = imageY - 70;
    ctx.fillText(cameraText, marginSize, textY);
    ctx.fillText(lensText, marginSize, textY + 50);
  }

  // Draw settings (top-right)
  if (settings.showSettings) {
    const settingsText =
      metadata.aperture || metadata.filmStock || metadata.customSettings;
    const textWidth = ctx.measureText(settingsText).width;
    const textY = imageY - 40; // 40px above image
    ctx.fillText(settingsText, storyWidth - marginSize - textWidth, textY);
  }

  // Draw color palette (bottom center) - 5 larger squares glued together
  if (settings.showColorPalette && metadata.colors.length > 0) {
    const paletteY = imageY + imageHeight + 40;
    const colorSize = 80; // Made larger
    const totalColors = 5; // Always 5 colors
    const totalPaletteWidth = totalColors * colorSize; // No gaps between squares
    const paletteX = (storyWidth - totalPaletteWidth) / 2;

    // Ensure we have exactly 5 colors
    const colorsToUse = metadata.colors.slice(0, 5);

    colorsToUse.forEach((color, index) => {
      ctx.fillStyle = color;
      ctx.fillRect(
        paletteX + index * colorSize,
        paletteY,
        colorSize,
        colorSize,
      ); // No gaps
    });
  }

  return canvas;
};

export const downloadCanvas = (canvas: HTMLCanvasElement, filename: string) => {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL();
  link.click();
};

export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
