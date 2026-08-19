import { siteConfig } from "@/config/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="text-xl font-bold tracking-tighter text-zinc-50">
              {siteConfig.name.split(" ").map(n => n[0]).join("") || "Logo"}
            </span>
            <p className="text-sm text-zinc-400">
              &copy; {currentYear} {siteConfig.name}. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {siteConfig.socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900 transition-colors"
                  aria-label={social.name}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
