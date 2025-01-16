export const getCroppedImageUrl = (
  url: string,
  width: number,
  height: number,
  target = 'media/',
) => {
  if (!url) return '';

  return url.replace(target, `${target}crop/${width}/${height}/`);
};
