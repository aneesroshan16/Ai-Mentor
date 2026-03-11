import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { X } from "lucide-react";

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null); // { message, emoji, id }
  const timerRef = useRef(null);

  const showToast = useCallback((message, emoji = "🔔") => {
    // Clear any existing timer so back-to-back clicks reset the duration
    if (timerRef.current) clearTimeout(timerRef.current);

    setToast({ message, emoji, id: Date.now() });

    timerRef.current = setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  const dismiss = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast(null);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* ── Toast Popup ── */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99999] pointer-events-none"
        aria-live="polite"
      >
        {toast && (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl text-white text-sm font-semibold animate-toast"
            style={{
              background: "linear-gradient(135deg, rgba(20,20,35,0.95) 0%, rgba(40,40,60,0.95) 100%)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)",
            }}
          >
            {/* Emoji icon */}
            <span className="text-xl leading-none">{toast.emoji}</span>

            {/* Message */}
            <span className="tracking-wide">
              Navigating to{" "}
              <span className="text-teal-300 font-black">{toast.message}</span>
            </span>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 h-0.5 rounded-b-2xl bg-teal-400 animate-toast-bar" style={{ width: "100%" }} />

            {/* Dismiss X */}
            <button
              onClick={dismiss}
              className="ml-2 p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Inline keyframe styles */}
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(16px) scale(0.95); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)    scale(1);    }
        }
        @keyframes toastBarShrink {
          from { width: 100%; }
          to   { width: 0%;   }
        }
        .animate-toast {
          animation: toastIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-toast-bar {
          animation: toastBarShrink 3s linear forwards;
        }
      `}</style>
    </ToastContext.Provider>
  );
};
