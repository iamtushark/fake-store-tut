// TODO: Remove Potential Bug in key generation when more than one
// user signups at the same time,
// ideally should be handled in dbOperations.
export const generateKey = (): string => {
  const date = new Date();
  return date.toISOString().replace(/[-:]/g, "");
};
