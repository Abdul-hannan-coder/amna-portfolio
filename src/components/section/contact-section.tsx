import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";

export default function ContactSection() {
  const contactLink = DATA.contact.social.LinkedIn?.url || 
                      DATA.contact.social.WhatsApp?.url || 
                      `mailto:${DATA.contact.email}`;
  const contactPlatform = DATA.contact.social.LinkedIn?.url ? "LinkedIn" : 
                            DATA.contact.social.WhatsApp?.url ? "WhatsApp" : "Email";

  return (
    <div className="flex min-h-0 flex-col gap-y-4">
      <h2 className="text-xl font-bold">Contact</h2>
      <div className="border rounded-xl p-6 md:p-10 relative overflow-hidden bg-card/40">
        <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
          <FlickeringGrid
            className="h-full w-full"
            squareSize={2}
            gridGap={2}
            style={{
              maskImage: "linear-gradient(to bottom, black, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
            }}
          />
        </div>
        <div className="relative flex flex-col items-start gap-3 text-left">
          <h3 className="text-lg font-semibold text-foreground">
            Get in Touch
          </h3>
          <p className="max-w-lg text-muted-foreground text-left text-sm sm:text-base">
            Want to chat? Just shoot me a message{" "}
            <Link
              href={contactLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            >
              on {contactPlatform}
            </Link>{" "}
            and I&apos;ll respond whenever I can. I will ignore all
            soliciting.
          </p>
        </div>
      </div>
    </div>
  );
}


