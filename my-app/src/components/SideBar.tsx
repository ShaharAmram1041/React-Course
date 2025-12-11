// src/components/Sidebar.tsx
import { useSidebar } from "../shared";
import "./Sidebar.css";

export function Sidebar() {
  const { isOpen, close } = useSidebar();

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={close}>
        ✕
      </button>

      <h3>Filters</h3>
      <label><input type="checkbox" /> Electronics</label>
      <label><input type="checkbox" /> Clothing</label>
      <label><input type="checkbox" /> Jewelry</label>
    </div>
  );
}