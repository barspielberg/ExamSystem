export const getNewId = (): string => {
  return `${Math.round(Math.random() * 10000)}-${Date.now()}`;
};
