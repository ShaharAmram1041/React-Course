import { useSidebar } from "../hooks/UseSidebar";
import "./Header.css";
import { useTranslation } from "react-i18next";

export function Header() {
  const { toggle } = useSidebar();
  const { t } = useTranslation('common');

  return (
    <header className="header">
      <button className="filter-button" onClick={toggle}>
          {t('button.filter')}
      </button>
    </header>
  );
}
