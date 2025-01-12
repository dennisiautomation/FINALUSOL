import { PRODUCT_TEMPLATES, ProductTemplateType } from './templates';

export function downloadProductTemplate(type: ProductTemplateType) {
  const generateTemplate = PRODUCT_TEMPLATES[type];
  const csv = generateTemplate();
  
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csv], { 
    type: 'text/csv;charset=utf-8;' 
  });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', `modelo_${type}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}