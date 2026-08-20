"use client";

import { Download } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  profile,
  siteUrl,
  skillCategories,
  techStack,
  timeline,
} from "@/constants/portfolio";

type Html2PdfFactory = () => Html2PdfWorker;

type Html2PdfModule = {
  default?: Html2PdfFactory;
} & Html2PdfFactory;

type Html2PdfWorker = {
  set: (options: unknown) => Html2PdfWorker;
  from: (element: HTMLElement) => Html2PdfWorker;
  save: () => Promise<void>;
};

export function ResumeDownloadButton() {
  return <ResumeGenerator compact />;
}

export function ResumeGenerator({ compact = false }: { compact?: boolean }) {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const experienceItems = timeline.slice(0, 3);

  async function downloadPdf() {
    if (!resumeRef.current) return;

    setLoading(true);
    try {
      const html2pdfModule = (await import("html2pdf.js")) as unknown as Html2PdfModule;
      const html2pdf = html2pdfModule.default ?? html2pdfModule;

      await html2pdf()
        .set({
          margin: 0,
          filename: "Curriculo_Sergio_Roberto_Loyola.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: "#FFFFFF",
            windowWidth: 794,
            windowHeight: 1122,
            onclone: (documentClone: Document) => {
              const resumeClone = documentClone.getElementById("pdf-resume");
              if (resumeClone) {
                resumeClone.style.position = "fixed";
                resumeClone.style.left = "0";
                resumeClone.style.top = "0";
                resumeClone.style.zIndex = "1";
              }
            },
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["css", "legacy"], avoid: [".pdf-section"] },
        })
        .from(resumeRef.current)
        .save();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {compact ? (
        <Button
          type="button"
          onClick={downloadPdf}
          disabled={loading}
          className="h-12 rounded-full bg-brand px-6 text-background hover:bg-hover"
          aria-label="Baixar currículo em PDF"
        >
          <Download className="mr-2 h-4 w-4" />
          {loading ? "Gerando PDF..." : "Baixar Currículo"}
        </Button>
      ) : (
        <div className="grid gap-8 border border-line bg-card p-6 sm:p-8 lg:grid-cols-[1fr_0.55fr] lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-brand">
              Currículo em PDF
            </p>
            <h2 className="mt-4 font-heading text-6xl uppercase leading-none sm:text-8xl">
              Um currículo A4, gerado dinamicamente.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              O currículo usa os dados do portfólio, incluindo experiências,
              formação, competências e formas de contato.
            </p>
          </div>
          <Button
            type="button"
            onClick={downloadPdf}
            disabled={loading}
            className="h-14 rounded-full bg-brand px-7 text-base text-background hover:bg-hover"
            aria-label="Baixar currículo em PDF"
          >
            <Download className="mr-2 h-5 w-5" />
            {loading ? "Gerando PDF..." : "Baixar Currículo"}
          </Button>
        </div>
      )}

      <div className="pointer-events-none fixed -left-[9999px] top-0" aria-hidden="true">
        <div
          ref={resumeRef}
          id="pdf-resume"
          className="flex h-[1122px] w-[794px] flex-col bg-white px-[42px] py-[36px] text-[#172033]"
          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
        >
          <header className="border-t-[5px] border-[#2563EB] pt-5">
            <p className="text-[9px] font-bold uppercase tracking-[3.2px] text-[#2563EB]">
              Currículo profissional
            </p>
            <h1 className="mt-2 text-[31px] font-black uppercase leading-none tracking-[-0.6px] text-[#132238]">
              Sérgio Roberto Loyola
            </h1>
            <p className="mt-2 text-[13px] font-bold uppercase tracking-[0.7px] text-[#3F4D63]">
              {profile.role}
            </p>

            <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-1.5 border-y border-[#D9E1EC] py-3 text-[9px] leading-[1.35] text-[#4B5870]">
              <p><strong className="text-[#172033]">Contato:</strong> {profile.phone}</p>
              <p><strong className="text-[#172033]">E-mail:</strong> {profile.email}</p>
              <p><strong className="text-[#172033]">Localização:</strong> {profile.location}</p>
              <p><strong className="text-[#172033]">Portfólio:</strong> {siteUrl.replace(/^https?:\/\//, "")}</p>
              <p><strong className="text-[#172033]">LinkedIn:</strong> {profile.linkedinLabel}</p>
              <p><strong className="text-[#172033]">GitHub:</strong> {profile.githubLabel}</p>
            </div>
          </header>

          <div className="mt-6 grid grid-cols-[1fr_220px] gap-8">
            <main>
              <ResumeBlock title="Resumo profissional" compact>
                <p>{profile.summary}</p>
              </ResumeBlock>

              <ResumeBlock title="Experiência profissional" compact>
                {experienceItems.map((item) => (
                  <div key={item.title} className="pdf-section mb-4 break-inside-avoid">
                    <h3 className="text-[11.5px] font-black uppercase text-[#172033]">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-[9px] font-bold text-[#2563EB]">
                      {item.company} • {item.date}
                    </p>
                    <p className="mt-1 text-[9.2px] leading-[1.5] text-[#4B5870]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </ResumeBlock>
            </main>

            <aside>
              <ResumeBlock title="Competências" compact>
                <div className="grid gap-3">
                  {skillCategories.map((category) => (
                    <div key={category.title}>
                      <p className="text-[9px] font-black uppercase text-[#2563EB]">
                        {category.title}
                      </p>
                      <p className="mt-1 text-[9px] leading-[1.45] text-[#4B5870]">
                        {category.skills.map((skill) => skill.name).join(" • ")}
                      </p>
                    </div>
                  ))}
                </div>
              </ResumeBlock>

              <ResumeBlock title="Formação acadêmica" compact>
                <p>
                  Bacharelado em Ciência da Computação — UESPI
                  <br />
                  Conclusão prevista: 2028.1
                  <br />
                  <br />
                  Técnico em Desenvolvimento de Sistemas — IFPI
                  <br />
                  Conclusão: 2023.1
                  <br />
                  <br />
                  Ensino Médio — Patronato Nossa Senhora de Lourdes
                  <br />
                  Conclusão: dezembro de 2021
                </p>
              </ResumeBlock>

              <ResumeBlock title="Cursos complementares" compact>
                <p>
                  Atendimento ao Público — Fundação Bradesco
                  <br />
                  Tecnologia da Informação e Comunicação — SENAI São Paulo
                  <br />
                  Análise de Dados e Modelagem Estatística com a Linguagem R — UESPI
                </p>
              </ResumeBlock>

              <ResumeBlock title="Conhecimentos" compact>
                <div className="flex flex-wrap gap-2">
                  {techStack.slice(0, 8).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-sm border border-[#D9E1EC] bg-[#F6F8FB] px-2 py-1 text-[7.8px] font-bold uppercase text-[#34425A]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </ResumeBlock>

            </aside>
          </div>

          <footer className="mt-auto flex items-center justify-between border-t border-[#D9E1EC] pt-3 text-[7.5px] font-bold uppercase tracking-[1.2px] text-[#718096]">
            <span>Sérgio Roberto Loyola</span>
            <span>{profile.email} • {profile.phone}</span>
          </footer>
        </div>
      </div>
    </>
  );
}

function ResumeBlock({
  title,
  children,
  compact = false,
}: {
  title: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={`pdf-section break-inside-avoid text-[9.2px] leading-[1.5] text-[#4B5870] ${compact ? "mb-[18px]" : "mb-8"}`}>
      <h2 className="mb-3 border-b-2 border-[#D9E1EC] pb-1.5 text-[9.5px] font-black uppercase tracking-[1.8px] text-[#172033]">
        {title}
      </h2>
      {children}
    </section>
  );
}
