export const formatNumberWithComma = (number) => {
  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  if (parts[1]) {
    parts[1] = parts[1].slice(0, 2);
  }
  
  return parts.join('.');
};
