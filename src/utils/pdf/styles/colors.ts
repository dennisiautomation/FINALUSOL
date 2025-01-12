export const colors = {
  primary: {
    main: [245, 158, 11], // yellow-600
    light: [251, 191, 36], // yellow-400
    dark: [217, 119, 6], // yellow-700
  },
  secondary: {
    main: [59, 130, 246], // blue-500
    light: [96, 165, 250], // blue-400
    dark: [37, 99, 235], // blue-600
  },
  success: [16, 185, 129], // green-500
  error: [239, 68, 68], // red-500
  text: {
    primary: [17, 24, 39], // gray-900
    secondary: [75, 85, 99], // gray-600
    light: [255, 255, 255], // white
  }
};

export const getRGBA = (color: number[], alpha: number = 1) => 
  `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;