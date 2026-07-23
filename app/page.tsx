import { PortfolioShell } from "@/components/PortfolioShell";
import { profile, projects, siteUrl } from "@/constants/portfolio";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: profile.email,
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressRegion: "Piaui",
      addressCountry: "BR",
    },
    sameAs: [profile.linkedin, profile.github],
    knowsAbout: [
      "Suporte técnico",
      "Helpdesk",
      "Atendimento de chamados",
      "Suporte remoto",
      "Desenvolvimento de sistemas",
    ],
    hasPart: projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PortfolioShell />
    </>
  );
}
