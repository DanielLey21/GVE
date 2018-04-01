export function getItemLabel(items, index?) {
  return index !== undefined && items.length > 0 ? items[index].inputLabel : undefined;
}

export function getPickerValue(items, index?) {
  return index !== undefined && items.length > 0 ? items[index].pickerValue : undefined;
}