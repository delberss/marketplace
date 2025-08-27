import { Loader2 } from "lucide-react";

type LoadingProps = {
  message?: string;
  fullScreen?: boolean;
};

export default function Loading({ message = "Carregando...", fullScreen = false }: LoadingProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 
        ${fullScreen ? "fixed inset-0 bg-black/50 z-50" : "p-4"}`}
    >
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      <p className="text-white text-sm">{message}</p>
    </div>
  );
}
