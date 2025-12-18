import { useToastStore } from "../store/Notification";
import "./ToastHost.css";

export function ToastHost() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="toast-host">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <span>{toast.message}</span>
          <button className="toast-close" onClick={() => removeToast(toast.id)}>✕</button>
        </div>
      ))}
    </div>
  );
}