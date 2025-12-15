export const getFullAssetUrl = (path: string) => {
  if (path.startsWith("/")) {
    const finalUrl = `http://localhost:3000${path}`;
    return finalUrl;
  }
  return path;
};
