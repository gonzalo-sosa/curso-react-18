import noImage from '@/assets/no-image-placeholder.webp';

export const getCroppedImageUrl = (
  url: string,
  width = 600,
  height = 400,
  target = 'media/',
) => {
  if (!url) return noImage;

  return url.replace(target, `${target}crop/${width}/${height}/`);
};
