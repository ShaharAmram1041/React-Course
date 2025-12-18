import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { SidebarContext } from "../contexts/SideBarContext";


export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useLocalStorageState<boolean>(
    "sidebar-open",
    false
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(prev => !prev);

  return (
    <SidebarContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}