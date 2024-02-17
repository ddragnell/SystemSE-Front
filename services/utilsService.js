export const utilsService = {
  isNumber: (value) => {
    return /^[0-9]+|[()\.]+/.test(value);
  },
  isInteger: (value) => {
    return /^[0-9]+$/.test(value);

  },
  greaterThanOrEqualTo0: (value) => {
    return parseFloat(value) >= 0;
  },
  greaterThan0: (value) => {
    return parseFloat(value) > 0;
  },
  between0And1: (value) => {
    return 0 <= parseFloat(value) <= 1;
  },
}
