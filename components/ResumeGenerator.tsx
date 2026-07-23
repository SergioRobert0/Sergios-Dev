"use client";

import { Download, QrCode } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

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
            backgroundColor: "#F8F7F3",
            windowWidth: 794,
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
          className="w-[794px] bg-[#F8F7F3] p-[28px] text-[#111111]"
          style={{ fontFamily: "Arial, Helvetica, sans-serif", height: "1122px" }}
        >
          <div className="grid grid-cols-[112px_1fr] gap-8 border-b-2 border-[#111111] pb-6">
            <div>
              <div className="relative h-[124px] w-[100px] overflow-hidden border-2 border-[#E4571B] bg-white">
                <Image
                  src={profile.image}
                  alt=""
                  fill
                  sizes="100px"
                  unoptimized
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#E4571B]">
                Portfólio • Currículo
              </p>
              <h1 className="mt-2 text-[36px] font-black uppercase leading-[0.95]">
                Sérgio Roberto Loyola
              </h1>
              <p className="mt-2 text-[15px] font-bold uppercase">
                {profile.role}
              </p>
              <p className="mt-2 text-[9.5px] leading-4 text-[#555]">
                {profile.email} • {profile.phone} • {profile.location}
                <br />
                LinkedIn: {profile.linkedinLabel} • GitHub: {profile.githubLabel}
              </p>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-[1fr_224px] gap-8">
            <main>
              <ResumeBlock title="Resumo profissional" compact>
                <p>{profile.summary}</p>
              </ResumeBlock>

              <ResumeBlock title="Experiência profissional" compact>
                {experienceItems.map((item) => (
                  <div key={item.title} className="pdf-section mb-4 break-inside-avoid">
                    <h3 className="text-[13px] font-black uppercase">
                      {item.title}
                    </h3>
                    <p className="text-[10px] font-bold text-[#E4571B]">
                      {item.company} • {item.date}
                    </p>
                    <p className="mt-1 text-[9.5px] leading-4 text-[#444]">
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
                      <p className="text-[10px] font-black uppercase text-[#E4571B]">
                        {category.title}
                      </p>
                      <p className="mt-1 text-[9.5px] leading-4 text-[#444]">
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
                      className="border border-[#DDDDDD] px-2 py-1 text-[8px] font-bold uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </ResumeBlock>

              <div className="mt-4 flex items-center gap-4 border-t border-[#DDDDDD] pt-4">
                <QRCodeSVG value={siteUrl} size={54} fgColor="#111111" bgColor="#F8F7F3" />
                <div>
                  <QrCode className="mb-2 h-4 w-4 text-[#E4571B]" />
                  <p className="text-[9px] font-bold uppercase leading-4">
                    Acesse o portfólio online
                  </p>
                </div>
              </div>
            </aside>
          </div>

          <footer className="mt-4 border-t border-[#111111] pt-3 text-[8px] font-bold uppercase tracking-[1.5px] text-[#6F6F6F]">
            Currículo gerado automaticamente pelo portfólio de Sérgio Roberto Loyola
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
    <section className={`pdf-section break-inside-avoid text-[9.8px] leading-4 text-[#444] ${compact ? "mb-5" : "mb-8"}`}>
      <h2 className="mb-3 border-b border-[#DDDDDD] pb-2 text-[10px] font-black uppercase tracking-[2.2px] text-[#111111]">
        {title}
      </h2>
      {children}
    </section>
  );
}
