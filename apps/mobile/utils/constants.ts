export const getFullAssetUrl = (path: string) => {
  if (path.startsWith("/")) {
    const finalUrl = `http://192.168.29.63:3000${path}`;
    return finalUrl;
  }
  return path;
};
