
"use client";

import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border-none text-center p-6">
      <CardContent>
        {icon}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
