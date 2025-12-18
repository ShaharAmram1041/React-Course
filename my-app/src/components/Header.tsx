import { useSidebar } from "../hooks/UseSidebar";
import "./Header.css";

export function Header() {
  const { toggle } = useSidebar();

  return (
    <header className="header">
      <button className="filter-button" onClick={toggle}>
        Filter
      </button>
    </header>
  );
}
