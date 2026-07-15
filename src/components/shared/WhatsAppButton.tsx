import { MessageCircle } from "lucide-react";
import {
  DEFAULT_WHATSAPP_MESSAGE,
  WHATSAPP_BASE_URL,
  WHATSAPP_NUMBER,
} from "@/lib/constants";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function WhatsAppButton({
  message = DEFAULT_WHATSAPP_MESSAGE,
  className = "",
  children,
}: WhatsAppButtonProps) {
  const encodedText = encodeURIComponent(message);
  const href = `${WHATSAPP_BASE_URL}/${WHATSAPP_NUMBER}?text=${encodedText}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-6 py-3 font-medium text-zinc-950 transition-all duration-200 hover:bg-amber-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-offset-zinc-950 ${className}`}
    >
      <MessageCircle className="h-5 w-5" />
      <span>{children || "Hubungi via WhatsApp"}</span>
    </a>
  );
}
