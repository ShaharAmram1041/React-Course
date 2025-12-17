import { useSidebar } from "../shared";
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
