export const colors = {
  primary: [245, 158, 11], // yellow-600
  success: [16, 185, 129], // green-500
  error: [239, 68, 68],    // red-500
  warning: [249, 115, 22], // orange-500
  info: [59, 130, 246],    // blue-500
  gray: {
    50: [249, 250, 251],
    100: [243, 244, 246],
    200: [229, 231, 235],
    300: [209, 213, 219],
    400: [156, 163, 175],
    500: [107, 114, 128],
    600: [75, 85, 99],
    700: [55, 65, 81],
    800: [31, 41, 55],
    900: [17, 24, 39]
  }
} as const;

export function getRGBColor(color: [number, number, number]): string {
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

export function getRGBAColor(color: [number, number, number], alpha: number): string {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
}