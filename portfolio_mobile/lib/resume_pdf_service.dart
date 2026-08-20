import 'dart:ui' show Rect;

import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:printing/printing.dart';

class ResumePdfService {
  const ResumePdfService._();

  static Future<bool> createAndShare({Rect? sharePosition}) async {
    final document = pw.Document(
      title: 'Currículo - Sérgio Roberto Loyola',
      author: 'Sérgio Roberto de Oliveira Loyola',
      creator: 'Portfólio Mobile',
    );

    const dark = PdfColor.fromInt(0xFF101827);
    const accent = PdfColor.fromInt(0xFF008DA8);
    const muted = PdfColor.fromInt(0xFF526274);
    const light = PdfColor.fromInt(0xFFF2F7F9);

    pw.Widget sectionTitle(String title) => pw.Container(
      margin: const pw.EdgeInsets.only(top: 16, bottom: 7),
      padding: const pw.EdgeInsets.only(bottom: 4),
      decoration: const pw.BoxDecoration(
        border: pw.Border(bottom: pw.BorderSide(color: accent, width: 1.2)),
      ),
      child: pw.Text(
        title.toUpperCase(),
        style: pw.TextStyle(
          color: accent,
          fontSize: 11,
          fontWeight: pw.FontWeight.bold,
          letterSpacing: 1.1,
        ),
      ),
    );

    pw.Widget timelineItem({
      required String title,
      required String subtitle,
      required String date,
      required String description,
    }) => pw.Padding(
      padding: const pw.EdgeInsets.only(bottom: 9),
      child: pw.Row(
        crossAxisAlignment: pw.CrossAxisAlignment.start,
        children: [
          pw.Container(
            width: 6,
            height: 6,
            margin: const pw.EdgeInsets.only(top: 4, right: 8),
            decoration: const pw.BoxDecoration(
              color: accent,
              shape: pw.BoxShape.circle,
            ),
          ),
          pw.Expanded(
            child: pw.Column(
              crossAxisAlignment: pw.CrossAxisAlignment.start,
              children: [
                pw.Text(
                  title,
                  style: pw.TextStyle(
                    color: dark,
                    fontSize: 10.5,
                    fontWeight: pw.FontWeight.bold,
                  ),
                ),
                pw.Text(
                  '$subtitle  |  $date',
                  style: const pw.TextStyle(color: accent, fontSize: 8.5),
                ),
                pw.SizedBox(height: 2),
                pw.Text(
                  description,
                  style: const pw.TextStyle(
                    color: muted,
                    fontSize: 8.8,
                    lineSpacing: 1.5,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );

    document.addPage(
      pw.MultiPage(
        pageFormat: PdfPageFormat.a4,
        margin: const pw.EdgeInsets.fromLTRB(34, 30, 34, 30),
        theme: pw.ThemeData.withFont(
          base: pw.Font.helvetica(),
          bold: pw.Font.helveticaBold(),
        ),
        header: (context) => context.pageNumber == 1
            ? pw.SizedBox()
            : pw.Align(
                alignment: pw.Alignment.centerRight,
                child: pw.Text(
                  'Sérgio Roberto Loyola',
                  style: const pw.TextStyle(color: muted, fontSize: 8),
                ),
              ),
        footer: (context) => pw.Align(
          alignment: pw.Alignment.centerRight,
          child: pw.Text(
            'Página ${context.pageNumber} de ${context.pagesCount}',
            style: const pw.TextStyle(color: muted, fontSize: 8),
          ),
        ),
        build: (context) => [
          pw.Container(
            width: double.infinity,
            padding: const pw.EdgeInsets.only(top: 14, bottom: 13),
            decoration: const pw.BoxDecoration(
              border: pw.Border(
                top: pw.BorderSide(color: accent, width: 4),
                bottom: pw.BorderSide(color: PdfColor.fromInt(0xFFD7E0E8)),
              ),
            ),
            child: pw.Column(
              crossAxisAlignment: pw.CrossAxisAlignment.start,
              children: [
                pw.Text(
                  'CURRÍCULO PROFISSIONAL',
                  style: pw.TextStyle(
                    color: accent,
                    fontSize: 8,
                    fontWeight: pw.FontWeight.bold,
                    letterSpacing: 1.8,
                  ),
                ),
                pw.SizedBox(height: 5),
                pw.Text(
                  'SÉRGIO ROBERTO LOYOLA',
                  style: pw.TextStyle(
                    color: dark,
                    fontSize: 23,
                    fontWeight: pw.FontWeight.bold,
                  ),
                ),
                pw.SizedBox(height: 3),
                pw.Text(
                  'Suporte, Helpdesk e Programador',
                  style: const pw.TextStyle(color: accent, fontSize: 11),
                ),
                pw.SizedBox(height: 9),
                pw.Row(
                  children: [
                    pw.Expanded(
                      child: pw.Text(
                        'Teresina - PI  |  (86) 99514-4549  |  sergiorbt12@gmail.com',
                        style: const pw.TextStyle(color: muted, fontSize: 8.5),
                      ),
                    ),
                  ],
                ),
                pw.SizedBox(height: 3),
                pw.Text(
                  'github.com/SergioRobert0  |  sergioloyola.dev',
                  style: const pw.TextStyle(color: muted, fontSize: 8.5),
                ),
              ],
            ),
          ),
          sectionTitle('Perfil profissional'),
          pw.Text(
            'Estudante de Ciência da Computação e técnico em Desenvolvimento de Sistemas, '
            'com experiência em suporte técnico, helpdesk presencial e remoto, atendimento '
            'ao público, orientação de usuários e desenvolvimento de soluções digitais.',
            style: const pw.TextStyle(
              color: muted,
              fontSize: 9.5,
              lineSpacing: 2,
            ),
          ),
          sectionTitle('Experiência profissional'),
          timelineItem(
            title: 'Helpdesk e Suporte de TI',
            subtitle: 'Secretaria da Agricultura Familiar - SAF',
            date: '10/2024 - 10/2026',
            description:
                'Atendimento de chamados presencial e remoto, suporte a usuários, '
                'computadores, sistemas, equipamentos e periféricos.',
          ),
          timelineItem(
            title: 'Triador e Técnico em Informática',
            subtitle: 'Instituto Nacional do Seguro Social - INSS',
            date: '2021 - 2022',
            description:
                'Atendimento e triagem, suporte básico de informática e apoio às '
                'rotinas administrativas e tecnológicas.',
          ),
          sectionTitle('Formação'),
          timelineItem(
            title: 'Bacharelado em Ciência da Computação',
            subtitle: 'Universidade Estadual do Piauí - UESPI',
            date: 'Conclusão prevista: 2028.1',
            description:
                'Formação superior em andamento voltada à computação e ao '
                'desenvolvimento de soluções tecnológicas.',
          ),
          timelineItem(
            title: 'Técnico em Desenvolvimento de Sistemas',
            subtitle: 'Instituto Federal do Piauí - IFPI',
            date: 'Conclusão: 2023.1',
            description:
                'Formação técnica em desenvolvimento de sistemas e tecnologia da informação.',
          ),
          sectionTitle('Competências'),
          pw.Wrap(
            spacing: 6,
            runSpacing: 6,
            children:
                [
                      'Suporte presencial e remoto',
                      'Atendimento de chamados',
                      'Orientação a usuários',
                      'Instalação de programas',
                      'Manutenção de computadores',
                      'Desenvolvimento de sistemas',
                    ]
                    .map(
                      (skill) => pw.Container(
                        padding: const pw.EdgeInsets.symmetric(
                          horizontal: 8,
                          vertical: 5,
                        ),
                        decoration: pw.BoxDecoration(
                          color: light,
                          borderRadius: pw.BorderRadius.circular(4),
                        ),
                        child: pw.Text(
                          skill,
                          style: const pw.TextStyle(color: dark, fontSize: 8.5),
                        ),
                      ),
                    )
                    .toList(),
          ),
          sectionTitle('Projetos'),
          pw.Text(
            'ProTech - Aplicativo e ecossistema de ferramentas para educação técnica, '
            'com organização de conteúdos e recursos mobile.',
            style: const pw.TextStyle(color: muted, fontSize: 9),
          ),
          pw.SizedBox(height: 5),
          pw.Text(
            'LoveInLoop - Aplicativo autoral com foco em experiência de uso, ciclos de '
            'interação e interface mobile.',
            style: const pw.TextStyle(color: muted, fontSize: 9),
          ),
        ],
      ),
    );

    return Printing.sharePdf(
      bytes: await document.save(),
      filename: 'curriculo-sergio-roberto-loyola.pdf',
      bounds: sharePosition,
      subject: 'Currículo - Sérgio Roberto Loyola',
      body: 'Olá! Segue meu currículo em PDF.',
    );
  }
}
