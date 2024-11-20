
"use client";

import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  service: string;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="bg-gradient-to-br from-pink-500 to-orange-400 border-none h-full">
      <CardContent className="p-6 flex items-center justify-center h-full">
        <h3 className="text-lg font-semibold text-center">{service}</h3>
      </CardContent>
    </Card>
  );
}
