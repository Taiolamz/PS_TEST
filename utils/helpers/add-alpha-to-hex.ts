export function cssVarHSLToHexWithOpacity(varName: string, opacity = 0.05) {
  console.log({ varName });
  const hslToHex = (h, s, l) => {
    s /= 100;
    l /= 100;
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    let m = l - c / 2;
    let r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    r = Math.round((r + m) * 255)
      .toString(16)
      .padStart(2, "0");
    g = Math.round((g + m) * 255)
      .toString(16)
      .padStart(2, "0");
    b = Math.round((b + m) * 255)
      .toString(16)
      .padStart(2, "0");

    return `#${r}${g}${b}`;
  };

  const rootStyles = getComputedStyle(document.documentElement);
  console.log({ rootStyles });
  const colorValue = rootStyles.getPropertyValue(varName).trim();
  console.log({ colorValue });
  const hslMatch = colorValue.match(/(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%/);
  console.log({ hslMatch });
  if (!hslMatch) return null;

  const h = parseInt(hslMatch[1], 10);
  const s = parseInt(hslMatch[2], 10);
  const l = parseInt(hslMatch[3], 10);

  const hexColor = hslToHex(h, s, l);
  const alphaHex = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");

  return `${hexColor}${alphaHex}`;
  //   const xxxx = `${hexColor}${alphaHex}`;
  //   console.log("WETTTT", xxxx);
  //   return `${colorValue}${alphaHex}`;
}

export const addAlphaToHex = (hex: string, alpha: number): string => {
  if (hex.length !== 7 || alpha < 0 || alpha > 1) {
    throw new Error("Invalid hex color or alpha value");
  }

  const alphaHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${alphaHex}`;
};
