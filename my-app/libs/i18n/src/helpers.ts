export const isRtlLang = (lang: string) => lang.startsWith("he");

export const getNextLang = (lang: string) =>
  lang.startsWith("en") ? "he" : "en";
