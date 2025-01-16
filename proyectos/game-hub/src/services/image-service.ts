import noImage from '@/assets/no-image-placeholder.webp';

export const getCroppedImageUrl = (
  url: string,
  width: number,
  height: number,
  target = 'media/',
) => {
  if (!url) return noImage;

  return url.replace(target, `${target}crop/${width}/${height}/`);
};
