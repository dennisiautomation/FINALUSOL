const manufacturers = {
  panels: ['Canadian Solar', 'Jinko Solar', 'JA Solar', 'Trina Solar', 'LONGi Solar'],
  inverters: ['Growatt', 'Fronius', 'SMA', 'Huawei', 'GoodWe'],
  structures: ['Romagnole', 'Schletter', 'K2 Systems', 'SolarGroup', 'Solarfix'],
  cables: ['Prysmian', 'Nexans', 'General Cable', 'Conduspar', 'SIL'],
  stringBoxes: ['Soprano', 'WEG', 'ABB', 'Schneider', 'PHB']
};

export const generateExamples = {
  basicInfo: (count: number) => {
    const types = ['solar_panel', 'inverter', 'structure', 'cables', 'string_box'];
    return Array.from({ length: count }, (_, i) => {
      const type = types[i % types.length];
      const mfg = manufacturers[type === 'solar_panel' ? 'panels' : 
                               type === 'inverter' ? 'inverters' :
                               type === 'structure' ? 'structures' :
                               type === 'cables' ? 'cables' : 'stringBoxes'][i % 5];
      return [
        type,
        `${mfg}-${String(i + 1).padStart(3, '0')}`,
        mfg,
        `Produto ${type} de alta qualidade`,
        (1000 + (i * 100)).toFixed(2),
        (10 + (i % 15)).toString()
      ];
    });
  },

  solarPanels: (count: number) => {
    return Array.from({ length: count }, (_, i) => {
      const power = 400 + (i * 5);
      const efficiency = 20 + (i % 3);
      return [
        power.toString(),
        efficiency.toFixed(1),
        (1.7 + (i % 3) * 0.1).toFixed(1),
        (1.0 + (i % 2) * 0.1).toFixed(1),
        (22 + i).toString(),
        (1.7).toFixed(2)
      ];
    });
  },

  inverters: (count: number) => {
    return Array.from({ length: count }, (_, i) => {
      const capacity = 3 + (i % 8);
      const efficiency = 97 + (i % 2);
      return [
        capacity.toString(),
        efficiency.toFixed(1),
        i % 2 === 0 ? '220,380' : '220',
        (4 + (i % 4)).toString(),
        'wifi,app'
      ];
    });
  },

  structures: (count: number) => {
    const types = ['roof', 'ground', 'adjustable'];
    const materials = ['aluminum', 'galvanized_steel'];
    return Array.from({ length: count }, (_, i) => [
      types[i % types.length],
      materials[i % materials.length],
      (300 + (i * 50)).toString(),
      'ceramic,metallic',
      (i % 2 === 0).toString()
    ]);
  },

  cables: (count: number) => {
    const types = ['copper', 'aluminum'];
    const gauges = [4, 6, 10, 16, 25, 35];
    return Array.from({ length: count }, (_, i) => [
      types[i % types.length],
      gauges[i % gauges.length].toString(),
      (50 + (i * 10)).toString()
    ]);
  },

  stringBoxes: (count: number) => {
    return Array.from({ length: count }, (_, i) => [
      (20 + (i * 5)).toString(),
      (800 + (i * 50)).toString(),
      `INV${String(i + 1).padStart(3, '0')},INV${String(i + 2).padStart(3, '0')}`
    ]);
  }
};