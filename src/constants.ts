import { CaseStudy } from './types';

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1, index: "01",
    title: "Gotham - Risk Intelligence",
    tags: ["Business Model Canvas", "PRD", "MVP"],
    year: "2026", duration: "3 months", role: "Product Owner", event: "BI-OJK Hackaton x Digdaya 2026",
    description: "A risk intelligence platform that deciphers unsustainable schemes in fintech and investments including suspected Ponzi models and financial fraud risks.",
    context: "Over the past 5 years in Indonesia, illegal investments and scam schemes (Ponzi & Pyramid Models) have caused **losses of IDR 50–140 trillion**, impacting more than 5 million victims across 2,400+ entities. Despite financial inclusion reaching 85.10%, financial literacy remains at 49.68%, exposing a **critical gap between access and understanding** that is actively exploited.\n\nThe consequences extend beyond financial loss, with 42% of victims experiencing severe psychological distress. Notably, **68% of victims reported initial suspicion** but lacked an objective way to validate their concerns.",
    problem: "There is no **objective and structured system** to deconstruct business models and distinguish real value creation from participant-funded cash flow, resulting in unreliable risk assessment.",
    challenge: "The challenge is not about labeling entities as “legal” or “illegal”—because many do not fit cleanly into either category. If an entity is formally registered and operates under regulatory oversight, **should it be considered illegal?**\n\nMany entities meet all typical signals of legitimacy yet still operate on fundamentally unsustainable structures. They exist in a **gray zone where traditional definitions and enforcement struggle to apply.**",
    approach: "To address this, I designed **SRAF (Sustainable Risk Analysis Framework)**—a multi-dimensional framework designed to systematically analyze business models and assess their sustainability.\n\nSRAF powers an AI-driven system that deconstructs financial flows and growth mechanisms. It produces an explainable risk assessment—**not as a legal verdict**, but as a clear basis for decision-making.",
    outcome: "Create an initial MVP concept that can be tested in the market.",
    team: "Solo Founder",
    tools: ["Notion, Jira, Vibe Coding (Antigravity)"],
    projectType: "Personal Project",
    gallery: [
      "https://picsum.photos/seed/gotham1/800/600",
      "https://picsum.photos/seed/gotham2/800/600",
      "https://picsum.photos/seed/gotham3/800/600",
      "https://picsum.photos/seed/gotham4/800/600"
    ],
    color: "#F2F2F2",
    image: "https://picsum.photos/seed/gotham/1200/800",
    slug: "gotham-risk-intelligence"
  },
  {
    id: 2, index: "02",
    title: "MetaGo Coin, Film Studio - Crypto",
    tags: ["Marketing", "Strategy", "Crypto"],
    year: "2026", duration: "2 months", role: "Product Marketing", event: "MetaGo Coin",
    description: "A crypto token powering a Web3 entertainment ecosystem where users invest in films, run virtual studios, and earn rewards through gameplay.",
    context: "MetaGo Coin (MGO) is a Web3 entertainment ecosystem building a film industry infrastructure through tokenized participation.\n\nFilm Studio serves as its core gamified production system, bridges the gap between digital assets and real entertainment utility.",
    opportunity: "High demand driven by FOMO and holding incentives creates a foundation to convert passive accumulation into **active ecosystem engagement**.\n\nThe upcoming Film Tokenization Launchpad further drives anticipation, making it critical to transition users from speculators into active participants.",
    approach: "Users acquire and operate virtual cinemas as production hubs for film templates. These templates represent different tiers of production with unique cost structures and earning potentials.\n\nTo sustain rewards, users must perform periodic 'marketing pushes'. This mechanism ensures that film assets remain operational while acting as **active engagement proof** within the ecosystem.",
    strategy: "The marketing communication strategy focused on translating complex mechanics into **simple, direct value narratives**. This approach made the product easy to adopt through early community-driven channels.\n\nKey messaging focused on managing cinemas for recurring rewards and maintaining active film production, which successfully activated users within the internal WhatsApp community distribution.",
    outcome: "Increased adoption rate by 60% in the first week after launch, generating nearly 500 million in total revenue.",
    team: "CEO, 2 Product Engineer, 3 Marketing Lead",
    tools: ["Communication Tools: Notion, Gamma, & WhatsApp"],
    projectType: "Web3, Crypto Utility",
    gallery: [
      "https://picsum.photos/seed/meta1/800/600",
      "https://picsum.photos/seed/meta2/800/600",
      "https://picsum.photos/seed/meta3/800/600",
      "https://picsum.photos/seed/meta4/800/600"
    ],
    color: "#C8D8FF",
    image: "/case-study-images/film-studio-metago-thumnail.png",
    slug: "metago-coin"
  },
  {
    id: 3, index: "03",
    title: "Glance Fit - Digital Health & Fitness",
    tags: ["PRD", "UI Design", "Product Policy"],
    year: "2024", duration: "2 months", role: "Project Manager & Design Lead", event: "SparcLabs",
    description: "A social fitness rewards platform that tracks habits like walking, running, eating, sleeping, and workouts, rewarding users with redeemable points.",
    context: "Sparc Labs is a company focused on developing crypto tokens and alternative payment infrastructure in Indonesia, built on the Solana blockchain.\n\nIts core vision is to create a utility token that goes beyond speculation—one that delivers real use cases within the DeFi and DApps ecosystem.",
    challenge: "The primary challenge was not technological—but economic: **How might we create real, sustainable demand for the token?**",
    opportunity: "Rather than positioning the token purely as a financial asset, Sparc Labs identified an opportunity to embed it within a behavior-driven ecosystem—where token value is driven by users’ everyday activities.\n\nThis is where Glance Fit comes in: a digital fitness application that transforms health-related activities—such as walking, running, sleep, and nutrition—into a value-generating loop.",
    approach: "My role extended beyond design management to shaping the system end-to-end—from experience to economic layers. Users access premium features via a **pay-with-crypto model**, positioning the token as both an incentive and a medium of exchange.",
    expansion: "To drive both user acquisition and retention, I contributed to **designing a multi-layer marketing and incentive system**. These systems are reinforced by recurring commissions, upgrade incentives, and Achievement Points (AP) as a gamification layer.",
    system: "Beneath a seemingly simple user experience lies a combination of interconnected systems, all designed with a single objective To build an ecosystem that drives user behavior while sustaining value circulation within the system.",
    outcome: "Designed an end-to-end MVP for an application with 5+ core features, including 5 product policy slides.",
    team: "Designer: Alwan, Juman, Ryra & Andisa",
    tools: ["Figma", "Whimsical", "Click Up"],
    projectType: "Client Side",
    gallery: [
      "https://picsum.photos/seed/glance1/800/600",
      "https://picsum.photos/seed/glance2/800/600",
      "https://picsum.photos/seed/glance3/800/600",
      "https://picsum.photos/seed/glance4/800/600"
    ],
    color: "#D4F0E8",
    image: "/case-study-images/glance-fit-thumbanail.png",
    slug: "glance-fit"
  },
  {
    id: 4, index: "04",
    title: "Privy Acceleration Program - Education",
    tags: ["Program Management", "Learning Operations", "Stakeholder Management"],
    year: "2023", duration: "5 months", role: "Project Support", event: "Privy",
    description: "A 6-month initiative designed to accelerate growth and build core skills for 100+ junior to mid-level product & tech team members",
    context: "The Acceleration Program is a national initiative designed as a structured career development and competency advancement program for employees within Privy’s Product and Technology divisions. It serves as an intensive learning journey aimed at strengthening organizational capabilities and supporting the company’s long-term growth.",
    problem: "Privy lacked a standardized competency framework across Product and Technology roles, causing inconsistent skill expectations and unclear career development paths across teams.",
    challenge: "The program was designed to deliver two key outcomes: Skill development and capability enhancement across technical and functional roles, Career growth opportunities, including promotion to higher positions with greater responsibilities, compensation, and impact",
    approach: "The program also carried a sensitive underlying reality—it effectively became a structured mechanism to evaluate and filter employees, determining who was ready to be retained and continue their journey at Privy.",
    outcome: "Drove ~IDR 1B/month OPEX reduction, enabled 80+ talent remappings, and achieved 80%+ success rate with promotions and salary growth",
    team: "Ardhi Kusuma (Manager), Afri Mimo, Dewa, & HR Team",
    tools: ["Ms. Excel", "Algobash", "G-Form-Survey", "Slack"],
    projectType: "National Program",
    gallery: [
      "https://picsum.photos/seed/privy1/800/600",
      "https://picsum.photos/seed/privy2/800/600",
      "https://picsum.photos/seed/privy3/800/600",
      "https://picsum.photos/seed/privy4/800/600"
    ],
    color: "#F0E8FF",
    image: "/case-study-images/privy-acc-thumnail.png",
    videoUrl: "https://www.youtube.com/embed/MT-0AktCUaE",
    slug: "privy-acceleration"
  },
  {
    id: 5, index: "05",
    title: "Is traditional TV still relevant in the Digital Age?",
    tags: ["Qualitative Research", "Data Synthesize", "UX Research Report"],
    year: "2023", duration: "2 months", role: "UX Researcher", event: "Mentify Online Bootcamp",
    description: "A behavioral study of digital media habits, reframing TV as an ambient companion and revealing how attention, control, and context reshape its role.",
    context: "A deep-dive behavioral study conducted as a capstone project for the Mentify Online Bootcamp to challenge conventional media consumption metrics.",
    problem: "Streaming has fundamentally changed how we consume video, but the traditional metrics of 'viewership' don't capture the ambient role TV plays in modern life.",
    challenge: "Reframing what \"TV\" means when the question is no longer whether people watch, but how and why they choose it over alternatives.",
    approach: "I designed the research methodology to capture context — not just preference. By studying when and where people chose TV over other screens, the insights shifted from usage patterns to emotional and situational triggers, which made the strategic implications sharper.",
    outcome: "Delivered insights from 2 research methods and 3 participants, redefining TV as an ambient medium and informing content, timing, and cross-device strategy.",
    team: "Aldo Fernando (Partner)",
    tools: ["Figma/Figjam", "Zoom Interviews", "G-Form"],
    projectType: "Bootcamp Capstone Project",
    gallery: [
      "https://picsum.photos/seed/tv1/800/600",
      "https://picsum.photos/seed/tv2/800/600",
      "https://picsum.photos/seed/tv3/800/600",
      "https://picsum.photos/seed/tv4/800/600"
    ],
    color: "#FFF0D8",
    image: "https://picsum.photos/seed/tv/1200/800",
    slug: "tv-ambient",
    externalLink: "https://tvbroadcast.vercel.app/"
  },
  {
    id: 6, index: "06",
    title: "K-Shop - Social Commerce",
    tags: ["Product Management", "UX Design", "Mobile Apps"],
    year: "2022", duration: "7 months", role: "Lead of Product Research & Design", event: "K-Shop",
    description: "A social commerce experience built on real discovery and trust, blending content, conversation, and community to drive engagement and confident purchasing decisions.",
    context: "A founding-team endeavor to disrupt traditional e-commerce by introducing a social-first discovery layer for early-stage startup growth.",
    problem: "Social commerce requires a delicate balance of community trust and high-velocity transactions, which is difficult for early-stage startups to get right.",
    challenge: "Building social commerce trust in a market where users don't buy from strangers — and early-stage startups can't afford to get retention wrong.",
    approach: "I led research and design across 3 MVP cycles, using each deployment to stress-test one hypothesis about discovery and trust. The biggest decision was deprioritizing the transaction flow in favor of the social layer — betting that purchase would follow community.",
    outcome: "Successfully designed a social commerce app and deployed 3 MVPs early in his career, while gaining valuable lessons learned.",
    team: "Founding Team (Teki, Herman, Ervan)",
    tools: ["Figma", "Whimsical", "Trello", "React-Native/Flutter", "Wordpress"],
    projectType: "Startup Project",
    gallery: [
      "https://picsum.photos/seed/kshop1/800/600",
      "https://picsum.photos/seed/kshop2/800/600",
      "https://picsum.photos/seed/kshop3/800/600",
      "https://picsum.photos/seed/kshop4/800/600"
    ],
    color: "#FFE8EC",
    image: "/case-study-images/k-shop-thumbnail.png",
    slug: "k-shop"
  }
].map(cs => ({ ...cs, slug: cs.slug || slugify(cs.title) }));
