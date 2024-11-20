"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

// Define the props type to expect a title string
interface SubmitButtonProps {
  title: string;
}

export function SubmitButton({ title }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-yellow-400 text-purple-900 hover:bg-yellow-300" disabled={pending}>
      {pending ? "Processing.." : title} <ChevronRight className="ml-2 h-4 w-4" />
    </Button>
  );
}
