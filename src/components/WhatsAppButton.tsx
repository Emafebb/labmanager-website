"use client";

import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/data/support-links";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contattaci su WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#1ebe57] hover:scale-105 transition-all duration-200"
    >
      <MessageCircle size={28} fill="currentColor" />
    </a>
  );
}

export { WHATSAPP_URL } from "@/data/support-links";
