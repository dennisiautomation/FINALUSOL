import { Product } from '../../types/product';
import { PRODUCT_TEMPLATE_COLUMNS } from './templateColumns';

interface ImportResult {
  success: boolean;
  products: Product[];
  errors: string[];
  totalRows: number;
  successRows: number;
}

export async function importProductsFromCSV(file: File): Promise<ImportResult> {
  const result: ImportResult = {
    success: false,
    products: [],
    errors: [],
    totalRows: 0,
    successRows: 0
  };

  try {
    const content = await readFileContent(file);
    const rows = parseCSV(content);
    result.totalRows = rows.length;

    // Remove linhas de instruções e cabeçalho
    const dataRows = rows.filter(row => 
      !row[0].startsWith('###') && 
      !row[0].startsWith('Opções:') &&
      !row[0].includes('*')
    );

    for (let i = 0; i < dataRows.length; i++) {
      try {
        const product = parseProductRow(dataRows[i]);
        if (product) {
          result.products.push(product);
          result.successRows++;
        }
      } catch (error) {
        result.errors.push(`Linha ${i + 1}: ${error.message}`);
      }
    }

    result.success = result.errors.length === 0;
    return result;

  } catch (error) {
    result.errors.push(`Erro ao processar arquivo: ${error.message}`);
    return result;
  }
}

async function readFileContent(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = (e) => reject(new Error('Erro ao ler arquivo'));
    reader.readAsText(file, 'UTF-8');
  });
}

function parseCSV(content: string): string[][] {
  return content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)
    .map(line => 
      line.split(';')
        .map(cell => cell.trim().replace(/^"|"$/g, ''))
    );
}

function parseProductRow(row: string[]): Product | null {
  const basicInfo = parseBasicInfo(row.slice(0, PRODUCT_TEMPLATE_COLUMNS.BASIC_INFO.length));
  
  // Pega as colunas específicas do tipo do produto
  const specificColumns = row.slice(PRODUCT_TEMPLATE_COLUMNS.BASIC_INFO.length);
  
  switch (basicInfo.type) {
    case 'solar_panel':
      return parseSolarPanel(basicInfo, specificColumns);
    case 'inverter':
      return parseInverter(basicInfo, specificColumns);
    case 'structure':
      return parseStructure(basicInfo, specificColumns);
    case 'cables':
      return parseCables(basicInfo, specificColumns);
    case 'string_box':
      return parseStringBox(basicInfo, specificColumns);
    default:
      throw new Error(`Tipo de produto inválido: ${basicInfo.type}`);
  }
}

function parseBasicInfo(row: string[]) {
  validateRequiredFields(row, PRODUCT_TEMPLATE_COLUMNS.BASIC_INFO);
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    type: row[0] as Product['type'],
    model: row[1],
    manufacturer: row[2],
    description: row[3],
    price: parseFloat(row[4]),
    warranty: parseInt(row[5]),
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'import'
  };
}

function validateRequiredFields(row: string[], columns: typeof PRODUCT_TEMPLATE_COLUMNS.BASIC_INFO) {
  columns.forEach((col, index) => {
    if (col.required && !row[index]) {
      throw new Error(`Campo obrigatório não preenchido: ${col.label}`);
    }
  });
}

// Funções específicas para cada tipo de produto
function parseSolarPanel(basic: any, specific: string[]): Product {
  return {
    ...basic,
    nominalPower: parseFloat(specific[0]),
    efficiency: parseFloat(specific[1]),
    dimensions: {
      width: parseFloat(specific[2]),
      height: parseFloat(specific[3])
    },
    weight: parseFloat(specific[4]),
    area: parseFloat(specific[5])
  };
}

function parseInverter(basic: any, specific: string[]): Product {
  return {
    ...basic,
    maxCapacity: parseFloat(specific[0]),
    efficiency: parseFloat(specific[1]),
    voltageCompatibility: specific[2].split(','),
    maxStrings: specific[3] ? parseInt(specific[3]) : undefined,
    monitoring: specific[4].split(',')
  };
}

function parseStructure(basic: any, specific: string[]): Product {
  return {
    ...basic,
    structureType: specific[0] as any,
    material: specific[1] as any,
    maxWeight: parseFloat(specific[2]),
    compatibility: {
      roof: specific[3] ? specific[3].split(',') : undefined,
      ground: specific[4] === 'true'
    }
  };
}

function parseCables(basic: any, specific: string[]): Product {
  return {
    ...basic,
    cableType: specific[0] as any,
    gauge: parseFloat(specific[1]),
    maxLength: specific[2] ? parseFloat(specific[2]) : undefined
  };
}

function parseStringBox(basic: any, specific: string[]): Product {
  return {
    ...basic,
    maxCurrent: parseFloat(specific[0]),
    maxVoltage: parseFloat(specific[1]),
    compatibleInverters: specific[2].split(',')
  };
}