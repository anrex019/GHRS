import React from 'react';

interface BackgroundImageProps {
  imageUrl?: string;
}

const extractImageUrl = (input: string): string | null => {
  // If input is a simple URL, return it
  if (!input.includes('[') && !input.includes('"')) {
    return input;
  }

  try {
    // Try to parse as JSON
    let parsed = input;
    while (typeof parsed === 'string' && (parsed.includes('[') || parsed.includes('"'))) {
      parsed = JSON.parse(parsed);
      if (Array.isArray(parsed)) {
        parsed = parsed[0];
      }
    }
    return typeof parsed === 'string' ? parsed : null;
  } catch (e) {
    console.error('Failed to parse image URL:', e);
    return null;
  }
};

const BackgroundImage: React.FC<BackgroundImageProps> = ({ imageUrl }) => {
  if (!imageUrl) return null;

  const finalUrl = extractImageUrl(imageUrl);
  if (!finalUrl) return null;

  return (
    <div
      className="absolute inset-0 bg-cover bg-center h-[70px] z-[-1]"
      style={{ backgroundImage: `url('${finalUrl}')` }}
    />
  );
};

export default BackgroundImage;