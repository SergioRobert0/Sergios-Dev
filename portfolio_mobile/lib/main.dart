import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import 'resume_pdf_service.dart';

void main() => runApp(const PortfolioApp());

const accent = Color(0xFF66E3FF);
const violet = Color(0xFF8B7CFF);
const background = Color(0xFF070B14);
const surface = Color(0xFF101827);
const muted = Color(0xFF9AA9BC);

class PortfolioApp extends StatelessWidget {
  const PortfolioApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Portfólio | Sérgio Loyola',
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: background,
        colorScheme: const ColorScheme.dark(
          primary: accent,
          secondary: violet,
          surface: surface,
        ),
        fontFamily: 'Roboto',
        useMaterial3: true,
      ),
      home: const PortfolioPage(),
    );
  }
}

class PortfolioPage extends StatefulWidget {
  const PortfolioPage({super.key});

  @override
  State<PortfolioPage> createState() => _PortfolioPageState();
}

class _PortfolioPageState extends State<PortfolioPage> {
  final _scrollController = ScrollController();
  final _homeKey = GlobalKey();
  final _projectsKey = GlobalKey();
  final _careerKey = GlobalKey();
  final _contactKey = GlobalKey();
  int _selectedIndex = 0;
  bool _isSharingResume = false;

  Future<void> _scrollTo(int index) async {
    setState(() => _selectedIndex = index);
    final keys = [_homeKey, _projectsKey, _careerKey, _contactKey];
    final context = keys[index].currentContext;
    if (context != null) {
      await Scrollable.ensureVisible(
        context,
        duration: const Duration(milliseconds: 550),
        curve: Curves.easeOutCubic,
      );
    }
  }

  Future<void> _open(String value) async {
    final uri = Uri.parse(value);
    if (!await launchUrl(uri, mode: LaunchMode.externalApplication) &&
        mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Não foi possível abrir este link.')),
      );
    }
  }

  Future<void> _shareResume(BuildContext shareContext) async {
    if (_isSharingResume) return;

    setState(() => _isSharingResume = true);
    try {
      final renderBox = shareContext.findRenderObject() as RenderBox?;
      final sharePosition = renderBox == null
          ? null
          : renderBox.localToGlobal(Offset.zero) & renderBox.size;
      await ResumePdfService.createAndShare(sharePosition: sharePosition);
    } catch (_) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Não foi possível criar o currículo em PDF.'),
          ),
        );
      }
    } finally {
      if (mounted) setState(() => _isSharingResume = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: background.withValues(alpha: .94),
        titleSpacing: 20,
        title: const Row(
          children: [
            Text(
              'SL',
              style: TextStyle(color: accent, fontWeight: FontWeight.w900),
            ),
            SizedBox(width: 10),
            Text(
              'PORTFÓLIO',
              style: TextStyle(fontSize: 14, letterSpacing: 2.4),
            ),
          ],
        ),
        actions: [
          Builder(
            builder: (shareContext) => IconButton(
              tooltip: 'Compartilhar currículo em PDF',
              onPressed: _isSharingResume
                  ? null
                  : () => _shareResume(shareContext),
              icon: _isSharingResume
                  ? const SizedBox.square(
                      dimension: 20,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                  : const Icon(Icons.picture_as_pdf_outlined),
            ),
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          controller: _scrollController,
          padding: const EdgeInsets.fromLTRB(20, 18, 20, 36),
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 720),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  _Hero(
                    key: _homeKey,
                    onOpen: _open,
                    isSharingResume: _isSharingResume,
                    onShareResume: _shareResume,
                  ),
                  const SizedBox(height: 26),
                  const _Stats(),
                  const SizedBox(height: 54),
                  const _SectionTitle(
                    eyebrow: 'QUEM SOU',
                    title: 'Sobre mim',
                    icon: Icons.person_outline_rounded,
                  ),
                  const _InfoCard(
                    child: Text(
                      'Estudante de Ciência da Computação e técnico em Desenvolvimento de Sistemas, com experiência em suporte técnico, helpdesk presencial e remoto, atendimento ao público e orientação de usuários.',
                      style: TextStyle(
                        color: muted,
                        fontSize: 16,
                        height: 1.65,
                      ),
                    ),
                  ),
                  const SizedBox(height: 54),
                  _SectionTitle(
                    key: _projectsKey,
                    eyebrow: 'O QUE CONSTRUÍ',
                    title: 'Projetos',
                    icon: Icons.code_rounded,
                  ),
                  _ProjectCard(
                    title: 'ProTech',
                    description:
                        'Aplicativo e ecossistema de ferramentas para educação técnica, com organização de conteúdos e recursos mobile.',
                    image: 'assets/protech.png',
                    tags: const [
                      'Flutter',
                      'Firebase',
                      'Clean Architecture',
                      'REST APIs',
                    ],
                    onTap: () => _open('https://github.com/SergioRobert0'),
                  ),
                  const SizedBox(height: 16),
                  _ProjectCard(
                    title: 'LoveInLoop',
                    description:
                        'Aplicativo autoral com foco em experiência de uso, ciclos de interação e interface mobile.',
                    image: 'assets/loveinloopprojeto.png',
                    tags: const ['Flutter', 'Hive', 'Firebase', 'UI/UX'],
                    onTap: () => _open('https://github.com/SergioRobert0'),
                  ),
                  const SizedBox(height: 54),
                  _SectionTitle(
                    key: _careerKey,
                    eyebrow: 'MINHA JORNADA',
                    title: 'Experiência e formação',
                    icon: Icons.work_outline_rounded,
                  ),
                  const _TimelineItem(
                    title: 'Helpdesk e Suporte de TI',
                    place: 'Secretaria da Agricultura Familiar — SAF',
                    date: '10/2024 – 10/2026',
                    text:
                        'Atendimento de chamados presencial e remoto, suporte a usuários, computadores, sistemas, equipamentos e periféricos.',
                  ),
                  const _TimelineItem(
                    title: 'Triador e Técnico em Informática',
                    place: 'Instituto Nacional do Seguro Social — INSS',
                    date: '2021 – 2022 · Estágio remunerado',
                    text:
                        'Atendimento e triagem, suporte básico de informática e apoio às rotinas administrativas e tecnológicas.',
                  ),
                  const _TimelineItem(
                    title: 'Bacharelado em Ciência da Computação',
                    place: 'Universidade Estadual do Piauí — UESPI',
                    date: 'Conclusão prevista: 2028.1',
                    text:
                        'Formação superior em andamento voltada à computação e ao desenvolvimento de soluções tecnológicas.',
                  ),
                  const _TimelineItem(
                    title: 'Técnico em Desenvolvimento de Sistemas',
                    place: 'Instituto Federal do Piauí — IFPI',
                    date: 'Conclusão: 2023.1',
                    text:
                        'Formação técnica em desenvolvimento de sistemas e tecnologia da informação.',
                  ),
                  const SizedBox(height: 54),
                  const _SectionTitle(
                    eyebrow: 'COMPETÊNCIAS',
                    title: 'Habilidades',
                    icon: Icons.bolt_rounded,
                  ),
                  const _InfoCard(
                    child: Column(
                      children: [
                        _Skill(name: 'Suporte presencial e remoto', value: .90),
                        _Skill(name: 'Atendimento de chamados', value: .88),
                        _Skill(name: 'Orientação a usuários', value: .90),
                        _Skill(name: 'Instalação de programas', value: .86),
                        _Skill(name: 'Manutenção de computadores', value: .82),
                        _Skill(name: 'Desenvolvimento de sistemas', value: .78),
                      ],
                    ),
                  ),
                  const SizedBox(height: 54),
                  const _SectionTitle(
                    eyebrow: 'CONQUISTAS',
                    title: 'Certificados',
                    icon: Icons.workspace_premium_outlined,
                  ),
                  const _Certificate(
                    image: 'assets/fundacaobradesco.png',
                    title: 'Atendimento ao Público',
                    institution: 'Fundação Bradesco',
                  ),
                  const SizedBox(height: 12),
                  const _Certificate(
                    image: 'assets/senaisp.png',
                    title: 'Tecnologia da Informação e Comunicação',
                    institution: 'SENAI São Paulo',
                  ),
                  const SizedBox(height: 12),
                  const _Certificate(
                    image: 'assets/analise-dados.png',
                    title: 'Análise de Dados e Modelagem Estatística com R',
                    institution: 'Universidade Estadual do Piauí — 2026',
                  ),
                  const SizedBox(height: 54),
                  _SectionTitle(
                    key: _contactKey,
                    eyebrow: 'VAMOS CONVERSAR',
                    title: 'Contato',
                    icon: Icons.chat_bubble_outline_rounded,
                  ),
                  _ContactCard(onOpen: _open),
                  const SizedBox(height: 32),
                  const Center(
                    child: Text(
                      'Feito em Flutter · Sérgio Loyola',
                      style: TextStyle(color: muted),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        backgroundColor: const Color(0xFF0A101C),
        indicatorColor: accent.withValues(alpha: .15),
        onDestinationSelected: _scrollTo,
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.home_outlined),
            selectedIcon: Icon(Icons.home),
            label: 'Início',
          ),
          NavigationDestination(
            icon: Icon(Icons.grid_view_outlined),
            selectedIcon: Icon(Icons.grid_view),
            label: 'Projetos',
          ),
          NavigationDestination(
            icon: Icon(Icons.work_outline),
            selectedIcon: Icon(Icons.work),
            label: 'Carreira',
          ),
          NavigationDestination(
            icon: Icon(Icons.mail_outline),
            selectedIcon: Icon(Icons.mail),
            label: 'Contato',
          ),
        ],
      ),
    );
  }
}

class _Hero extends StatelessWidget {
  const _Hero({
    super.key,
    required this.onOpen,
    required this.isSharingResume,
    required this.onShareResume,
  });
  final Future<void> Function(String) onOpen;
  final bool isSharingResume;
  final Future<void> Function(BuildContext) onShareResume;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(4),
          decoration: const BoxDecoration(
            shape: BoxShape.circle,
            gradient: LinearGradient(colors: [accent, violet]),
          ),
          child: const CircleAvatar(
            radius: 70,
            backgroundImage: AssetImage('assets/profile-sergio.jpeg'),
          ),
        ),
        const SizedBox(height: 24),
        const Text(
          'Olá, eu sou',
          style: TextStyle(color: accent, fontSize: 15, letterSpacing: 1.5),
        ),
        const SizedBox(height: 8),
        const Text(
          'Sérgio Roberto\nLoyola',
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 39,
            height: 1.02,
            fontWeight: FontWeight.w900,
          ),
        ),
        const SizedBox(height: 14),
        const Text(
          'Suporte, Helpdesk e Programador',
          textAlign: TextAlign.center,
          style: TextStyle(color: muted, fontSize: 17),
        ),
        const SizedBox(height: 8),
        const Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.location_on_outlined, size: 17, color: muted),
            SizedBox(width: 4),
            Text('Teresina – PI', style: TextStyle(color: muted)),
          ],
        ),
        const SizedBox(height: 24),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          alignment: WrapAlignment.center,
          children: [
            FilledButton.icon(
              onPressed: () => onOpen('mailto:sergiorbt12@gmail.com'),
              icon: const Icon(Icons.mail_outline),
              label: const Text('Entrar em contato'),
            ),
            OutlinedButton.icon(
              onPressed: () => onOpen('https://github.com/SergioRobert0'),
              icon: const Icon(Icons.code),
              label: const Text('GitHub'),
            ),
            Builder(
              builder: (shareContext) => OutlinedButton.icon(
                onPressed: isSharingResume
                    ? null
                    : () => onShareResume(shareContext),
                icon: isSharingResume
                    ? const SizedBox.square(
                        dimension: 18,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Icon(Icons.ios_share_outlined),
                label: const Text('Compartilhar currículo'),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _Stats extends StatelessWidget {
  const _Stats();

  @override
  Widget build(BuildContext context) {
    const data = [
      ('3', 'Áreas'),
      ('3', 'Experiências'),
      ('3', 'Formações'),
      ('2', 'Cursos'),
    ];
    return Row(
      children: data
          .map(
            (item) => Expanded(
              child: Column(
                children: [
                  Text(
                    item.$1,
                    style: const TextStyle(
                      color: accent,
                      fontSize: 25,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                  Text(
                    item.$2,
                    textAlign: TextAlign.center,
                    style: const TextStyle(color: muted, fontSize: 11),
                  ),
                ],
              ),
            ),
          )
          .toList(),
    );
  }
}

class _SectionTitle extends StatelessWidget {
  const _SectionTitle({
    super.key,
    required this.eyebrow,
    required this.title,
    required this.icon,
  });
  final String eyebrow;
  final String title;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 18),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: accent.withValues(alpha: .12),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: accent),
          ),
          const SizedBox(width: 13),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                eyebrow,
                style: const TextStyle(
                  color: accent,
                  fontSize: 10,
                  letterSpacing: 1.8,
                  fontWeight: FontWeight.w700,
                ),
              ),
              Text(
                title,
                style: const TextStyle(
                  fontSize: 25,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _InfoCard extends StatelessWidget {
  const _InfoCard({required this.child});
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: surface,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white.withValues(alpha: .07)),
      ),
      child: child,
    );
  }
}

class _ProjectCard extends StatelessWidget {
  const _ProjectCard({
    required this.title,
    required this.description,
    required this.image,
    required this.tags,
    required this.onTap,
  });
  final String title;
  final String description;
  final String image;
  final List<String> tags;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return _InfoCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(14),
            child: Container(
              height: 178,
              width: double.infinity,
              color: const Color(0xFF0A101B),
              child: Image.asset(image, fit: BoxFit.contain),
            ),
          ),
          const SizedBox(height: 18),
          Text(
            title,
            style: const TextStyle(fontSize: 23, fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 8),
          Text(description, style: const TextStyle(color: muted, height: 1.5)),
          const SizedBox(height: 14),
          Wrap(
            spacing: 7,
            runSpacing: 7,
            children: tags
                .map(
                  (tag) => Chip(
                    label: Text(tag, style: const TextStyle(fontSize: 11)),
                  ),
                )
                .toList(),
          ),
          const SizedBox(height: 8),
          TextButton.icon(
            onPressed: onTap,
            icon: const Icon(Icons.open_in_new, size: 18),
            label: const Text('Ver no GitHub'),
          ),
        ],
      ),
    );
  }
}

class _TimelineItem extends StatelessWidget {
  const _TimelineItem({
    required this.title,
    required this.place,
    required this.date,
    required this.text,
  });
  final String title;
  final String place;
  final String date;
  final String text;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 13),
      child: _InfoCard(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Padding(
              padding: EdgeInsets.only(top: 4),
              child: Icon(Icons.circle, color: accent, size: 12),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 17,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    place,
                    style: const TextStyle(color: accent, fontSize: 13),
                  ),
                  Text(
                    date,
                    style: const TextStyle(color: violet, fontSize: 12),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    text,
                    style: const TextStyle(color: muted, height: 1.45),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _Skill extends StatelessWidget {
  const _Skill({required this.name, required this.value});
  final String name;
  final double value;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 17),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(name),
              Text(
                '${(value * 100).round()}%',
                style: const TextStyle(color: accent),
              ),
            ],
          ),
          const SizedBox(height: 8),
          LinearProgressIndicator(
            value: value,
            minHeight: 7,
            borderRadius: BorderRadius.circular(10),
            backgroundColor: Colors.white10,
          ),
        ],
      ),
    );
  }
}

class _Certificate extends StatelessWidget {
  const _Certificate({
    required this.image,
    required this.title,
    required this.institution,
  });
  final String image;
  final String title;
  final String institution;

  @override
  Widget build(BuildContext context) {
    return _InfoCard(
      child: Row(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: Container(
              width: 72,
              height: 72,
              color: Colors.white,
              child: Image.asset(image, fit: BoxFit.contain),
            ),
          ),
          const SizedBox(width: 15),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(fontWeight: FontWeight.w700),
                ),
                const SizedBox(height: 5),
                Text(
                  institution,
                  style: const TextStyle(color: muted, fontSize: 13),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _ContactCard extends StatelessWidget {
  const _ContactCard({required this.onOpen});
  final Future<void> Function(String) onOpen;

  @override
  Widget build(BuildContext context) {
    return _InfoCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Text(
            'Estou disponível para oportunidades e novos projetos.',
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 18, height: 1.45),
          ),
          const SizedBox(height: 20),
          FilledButton.icon(
            onPressed: () => onOpen('mailto:sergiorbt12@gmail.com'),
            icon: const Icon(Icons.mail_outline),
            label: const Text('sergiorbt12@gmail.com'),
          ),
          const SizedBox(height: 9),
          OutlinedButton.icon(
            onPressed: () => onOpen('tel:+5586995144549'),
            icon: const Icon(Icons.phone_outlined),
            label: const Text('(86) 99514-4549'),
          ),
          const SizedBox(height: 9),
          OutlinedButton.icon(
            onPressed: () => onOpen(
              'https://www.linkedin.com/in/s%C3%A9rgio-roberto-oliveira-loyola-420b86255/',
            ),
            icon: const Icon(Icons.work_outline),
            label: const Text('LinkedIn'),
          ),
        ],
      ),
    );
  }
}
