import { createFileRoute } from "@tanstack/react-router";
import StackletLanding from "@/components/landing/StackletLanding";

export const Route = createFileRoute("/")({
  component: StackletLanding,
});
