export const isValidContactFormUrl = (value: string) =>
  /^https:\/\/(docs\.google\.com\/forms|forms\.gle)\//.test(value);

export const isValidPublicEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) &&
  !/(?:example\.(?:com|net|org)|test@|dummy@)/i.test(value);

export const isSafeExternalUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
};
