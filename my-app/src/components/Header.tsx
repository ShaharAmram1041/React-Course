// src/components/Header.tsx
import { useSidebar } from "../shared";
import "./Header.css";

export function Header() {
  const { toggle } = useSidebar();

  return (
    <header className="header">
      <button className="filter-btn" onClick={toggle}>
        Filter
      </button>
    </header>
  );
}
