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

export const compareByVariantName = (
  a: {
    name: string,
    variant?: string,
  },
  b: {
    name: string,
    variant?: string,
  },
) => compareByName({ name: getVariantName(a) }, { name: getVariantName(b) });

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
) => compareByVariantName(a.reference, b.reference);
