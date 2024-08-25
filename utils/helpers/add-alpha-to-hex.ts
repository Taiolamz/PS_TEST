export const addAlphaToHex = (hex: string, alpha: number): string => {
  if (hex.length !== 7 || alpha < 0 || alpha > 1) {
    throw new Error("Invalid hex color or alpha value");
  }

  const alphaHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${alphaHex}`;
};
