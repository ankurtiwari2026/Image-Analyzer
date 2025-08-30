import { AlertTriangle } from 'lucide-react';

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded shadow">
      <AlertTriangle className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
}

