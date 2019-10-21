import { getVariantName } from './object-helpers';

export const compareByName = (
  a: {
    name: string,
  },
  b: {
    name: string,
  }
) => {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  } else {
    return 0;
  }
};

export const compareReferencesByVariantName = (
  a: {
    reference: {
      name: string;
      variant?: string;
    },
  },
  b: {
    reference: {
      name: string;
      variant?: string;
    },
  },
) => {
  if (getVariantName(a.reference) < getVariantName(b.reference)) {
    return -1;
  } else if (getVariantName(a.reference) > getVariantName(b.reference)) {
    return 1;
  } else {
    return 0;
  }
};
