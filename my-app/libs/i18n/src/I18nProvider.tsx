import { useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { isRtlLang } from "./helpers";

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const html = document.documentElement;

    if (isRtlLang(i18n.language)) {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'he');
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', 'en');
    }
  }, [i18n.language]);

  return <>{children}</>;
}
