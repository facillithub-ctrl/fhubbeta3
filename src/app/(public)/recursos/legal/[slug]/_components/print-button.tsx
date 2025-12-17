'use client';

import { Button } from "@/shared/ui/button";
import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={() => window.print()}
      className="print:hidden gap-2 text-slate-600"
    >
      <Printer className="h-4 w-4" />
      Imprimir
    </Button>
  );
}