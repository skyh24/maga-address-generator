"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface AddressDisplayProps {
  label: string;
  value: string;
}

export function AddressDisplay({ label, value }: AddressDisplayProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setIsCopied(true);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      <div className="text-sm text-gray-400">{label}:</div>
      <div className="flex gap-2">
        <code className="block flex-1 p-3 bg-gray-900 rounded-lg text-sm break-all">
          {value}
        </code>
        <Button
          variant="outline"
          size="icon"
          onClick={handleCopy}
          className="shrink-0"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}