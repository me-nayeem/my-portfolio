import { WhatsappIcon } from "./icons";

const whatsappUrl =
  "https://wa.me/8801879333905?text=" +
  encodeURIComponent("Hi Nayeem, I found your portfolio and…");

export function WhatsappButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-5 bottom-5 z-40 flex size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-transform duration-200 hover:-translate-y-1 hover:scale-105 sm:right-7 sm:bottom-7"
    >
      <WhatsappIcon className="size-7" />
    </a>
  );
}
