import { useSidebar } from "../hooks/UseSidebar";
import "./Sidebar.css";
import { useTranslation } from "react-i18next";

export function Sidebar() {
  const { isOpen, close } = useSidebar();
  const { t } = useTranslation("products");

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={close}>
        ✕
      </button>

      <h3>{t("filters.title")}</h3>
      <label><input type="checkbox" /> {t("filters.electronics")}</label>
      <label><input type="checkbox" /> {t("filters.clothing")}</label>
      <label><input type="checkbox" /> {t("filters.jewelry")}</label>
    </div>
  );
}
