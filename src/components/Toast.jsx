import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toast, showToast } = useApp();

  if (!toast.show) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-short shadow-2xl transition-all">
      <div
        className={`flex items-start gap-3 rounded-2xl p-4 border text-sm font-medium ${
          isSuccess
            ? 'bg-emerald-900 text-white border-emerald-600 shadow-emerald-950/30'
            : isError
            ? 'bg-rose-900 text-white border-rose-600 shadow-rose-950/30'
            : 'bg-green-900 text-white border-green-700 shadow-green-950/30'
        }`}
      >
        <div className="mt-0.5 shrink-0">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-300" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-300" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-green-300" />}
        </div>
        <div className="flex-1 pr-2 text-sm leading-relaxed">
          {toast.message}
        </div>
        <button
          onClick={() => showToast('', 'info')}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Tutup Notifikasi"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
