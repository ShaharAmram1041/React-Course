import { useEffect, useState } from "react";
import { useSidebar } from "../hooks/UseSidebar";
import "./Header.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";



const THEMES = {
  light: "lara-light-blue",
  dark: "lara-dark-blue",
};

export function Header() {
  const { toggle } = useSidebar();
  const { t, i18n } = useTranslation('common');
  const navigate = useNavigate();


  
 const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || THEMES.light;
  });


  const changeLanguage = () => {
    const newLang = i18n.language === 'en' ? 'he' : 'en';
    i18n.changeLanguage(newLang);
  };

  const changeTheme = () => {
    const newTheme = theme === THEMES.light ? THEMES.dark : THEMES.light;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeLink(newTheme);
  };

  const updateThemeLink = (newTheme: string) => {
    const id = "theme-css";
    const existingLink = document.getElementById(id) as HTMLLinkElement | null;

    const href = `https://unpkg.com/primereact/resources/themes/${newTheme}/theme.css`;

    if (existingLink) {
      existingLink.href = href;
    } else {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  };

   useEffect(() => {
    updateThemeLink(theme);
  }, [theme]);


  return (
    <div>
    <header className="header">
      <button className="filter-button" onClick={toggle}>
          {t('button.filter')}
      </button>

       <button className="header-button-form" onClick={() => navigate("/form")}>
        {t('form')}
      </button>

      <button className="change-language-button" onClick={changeLanguage}>
          {t('changeLanguage')}
      </button>

      <button className="theme-switch-button" onClick={changeTheme}>
        {theme === THEMES.light ? t("darkTheme") : t("lightTheme")}
      </button>
      
    </header>
    
    </div>
  );
}

