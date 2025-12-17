"use client";
import { FaWhatsapp as WhatsappIcon } from "react-icons/fa6"
import posthog from 'posthog-js'
  
export default function WhatsappButton () {
  
  function handleClick() {
      posthog.capture('whatsapp_button_click', {});
  }
  
  return (
    <a
      className="bg-[#24CC63] rounded-full fixed z-100! bottom-safe-offset-5 right-5 p-3.5 shadow-md active:scale-90 transition-transform"
      href="https://wa.me/558897174708?text=Ol%C3%A1!%20Vim%20do%20seu%20site%20para%20tirar%20algumas%20d%C3%BAvidas%20sobre%20os%20seus%20servi%C3%A7os."
      target="_blank"
      onClick={handleClick}
    >
      <WhatsappIcon className="size-8 text-white" />
    </a>
  )
}
