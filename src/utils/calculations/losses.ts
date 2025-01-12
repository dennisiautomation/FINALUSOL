import { InstallationInfo } from '../../types/customer';

export function calculateShadowLoss(installationInfo: InstallationInfo): number {
  let shadowLoss = 0;
  
  // Orientation losses
  if (installationInfo.type === 'roof') {
    switch (installationInfo.roofOrientation) {
      case 'north':
        shadowLoss += 0;
        break;
      case 'east':
      case 'west':
        shadowLoss += 0.1; // 10% loss
        break;
      case 'south':
        shadowLoss += 0.2; // 20% loss
        break;
    }
    
    // Inclination losses
    if (installationInfo.roofInclination) {
      const optimalInclination = 23; // Optimal for Brazil
      const inclinationDiff = Math.abs(installationInfo.roofInclination - optimalInclination);
      shadowLoss += (inclinationDiff > 15) ? 0.1 : 0.05;
    }
  }
  
  return shadowLoss;
}