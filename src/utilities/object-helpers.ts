import { VariantName } from 'src/interfaces/models';

export const getVariantName = (value: VariantName) => {
  if (value.variant) {
    return value.name + ' (' + value.variant + ')';
  } else {
    return value.name;
  }
};