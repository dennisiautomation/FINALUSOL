import { Product } from '../../../types/product';

export function selectStringBox(
  stringBoxes: Product[],
  selectedInverters: Array<{ product: Product; quantity: number }>
): Array<{ product: Product; quantity: number; reason: string }> {
  const availableStringBoxes = stringBoxes.filter(p => p.type === 'string_box') as any[];

  if (availableStringBoxes.length === 0 || selectedInverters.length === 0) {
    return [];
  }

  // Find compatible string box
  const selectedStringBox = availableStringBoxes.find(sb =>
    selectedInverters.some(({ product }) => 
      sb.compatibleInverters.includes(product.id)
    )
  );

  if (!selectedStringBox) {
    return [];
  }

  return [{
    product: selectedStringBox,
    quantity: selectedInverters[0].quantity,
    reason: 'String box compatível com o inversor selecionado'
  }];
}