export const getCroppedImageUrl = (
  url: string,
  width: number,
  height: number,
  target = 'media/',
) => {
  return url.replace(target, `${target}crop/${width}/${height}/`);
};
