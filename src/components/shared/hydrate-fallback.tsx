import {Loader} from "lucide-react";

export const HydrateFallback = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-xl font-medium text-zinc-500">Loading application...</div>
      <Loader className="w-5 h-5 animate-spin" />
    </div>
  );
}