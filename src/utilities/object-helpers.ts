export const getVariantName = (value: {
  name: string;
  variant?: string;
}) => {
  if (value.variant) {
    return value.name + ' (' + value.variant + ')';
  } else {
    return value.name;
  }
};

export const addPlurality = (value: string, count: number) => (
  value + (count !== 1 ? 's' : '')
);
