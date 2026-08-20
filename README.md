# Sergios-Dev — Portfólio de Sérgio Loyola

Portfólio multiplataforma desenvolvido para apresentar minha trajetória, habilidades e projetos como desenvolvedor Full Stack. O projeto possui versões para web, desktop e dispositivos móveis, além de disponibilizar um currículo em PDF diretamente pela interface.

**Acesse:** [sergioloyola.dev](https://sergioloyola.dev) · [LinkedIn](https://www.linkedin.com/in/s%C3%A9rgio-roberto-oliveira-loyola-420b86255/) · [GitHub](https://github.com/SergioRobert0)

## Visão geral

- Apresentação profissional, histórico e competências técnicas.
- Galeria de projetos com tecnologias e detalhes visuais.
- Currículo em PDF gerado no navegador.
- Navegação por seções, indicador de leitura e animações sutis.
- Layout adaptado para desktop e dispositivos móveis.
- Metadados para compartilhamento, sitemap, `robots.txt` e manifesto PWA.
- Aplicativo desktop portátil criado com Electron.
- Aplicativo mobile nativo desenvolvido com Flutter.

## Projetos em destaque

| Projeto | Descrição | Tecnologias principais |
| --- | --- | --- |
| **ProTech** | Ecossistema de ferramentas voltado à educação técnica e ao aprendizado contínuo. | Flutter, Firebase, REST APIs |
| **LoveInLoop** | Aplicativo mobile autoral focado em interação e uma experiência de uso refinada. | Flutter, Hive, Firebase |
| **Mestre Árbitro** | Ferramenta de apoio à arbitragem e à gestão de partidas. | React, TypeScript, Node.js, PostgreSQL |
| **AjudaAqui** | Plataforma para solicitação, triagem e acompanhamento de demandas locais. | Next.js, Supabase, Tailwind CSS, Zod |

## Tecnologias

- **Web:** Next.js, React, TypeScript, Tailwind CSS e Framer Motion
- **Desktop:** Electron e electron-builder
- **Mobile:** Flutter e Dart
- **Backend e dados:** Node.js, Express, Firebase, Supabase, MySQL e PostgreSQL
- **Qualidade e interface:** Zod, React Hook Form, Figma, ESLint e Git

## Executando localmente

### Web

#### Pré-requisitos

- Node.js 20 ou superior
- npm 10 ou superior

#### Instalação

```bash
git clone https://github.com/SergioRobert0/Sergios-Dev.git
cd Sergios-Dev
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Desktop

A versão desktop utiliza a exportação estática do Next.js dentro do Electron.

```bash
npm install
npm run desktop
```

Para gerar o executável portátil do Windows:

```bash
npm run desktop:build
```

O instalador será criado em `dist-desktop/`.

### Mobile

Tenha o Flutter instalado e um dispositivo ou emulador configurado. Em seguida:

```bash
cd portfolio_mobile
flutter pub get
flutter run
```

## Scripts disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o ambiente de desenvolvimento. |
| `npm run build` | Cria a versão otimizada para produção. |
| `npm run start` | Executa a versão de produção após o build. |
| `npm run lint` | Analisa o código com ESLint. |
| `npm run desktop` | Compila e abre o portfólio no Electron. |
| `npm run desktop:build` | Gera o executável portátil para Windows. |

## Estrutura do projeto

```text
app/          # Rotas, layout, estilos globais e metadados
components/   # Componentes reutilizáveis e seções do portfólio
constants/    # Conteúdo e configurações exibidos no site
desktop/      # Processo principal da aplicação Electron
hooks/        # Hooks personalizados
portfolio_mobile/ # Aplicativo mobile desenvolvido em Flutter
public/assets/# Imagens e ilustrações dos projetos
types/        # Tipagens TypeScript
```

## Contato

Estou aberto a oportunidades, colaborações e conversas sobre tecnologia. Entre em contato pelo [LinkedIn](https://www.linkedin.com/in/s%C3%A9rgio-roberto-oliveira-loyola-420b86255/) ou envie um e-mail para [sergiorbt12@gmail.com](mailto:sergiorbt12@gmail.com).
