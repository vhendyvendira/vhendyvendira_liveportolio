import { CaseStudy } from './types';

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1, index: "01",
    title: "Gotham - Risk Intelligence",
    tags: ["Business Model Canvas", "PRD", "MVP"],
    year: "2026", duration: "3 months", role: "Product Manager", event: "Internal Innovation Lab",
    description: "A risk intelligence platform that deciphers unsustainable schemes in fintech and investments including suspected Ponzi models and financial fraud risks",
    problem: "Financial institutions lose billions annually to complex fraud schemes that often bypass traditional rule-based detection systems.",
    challenge: "How do you surface financial fraud risk to non-expert users without overwhelming them or triggering false alarms?",
    approach: "I led the product definition from scratch — starting with the business model canvas to map incentive structures, then translating that into a PRD that prioritized signal clarity over feature completeness. The MVP was scoped around one core decision: show risk level, not raw data.",
    outcome: "Framework adopted as internal standard. Pilot phase increased team velocity by 25%. Currently scaling to enterprise-wide implementation.",
    team: "1 PM, 2 Developers, 1 Data Scientist",
    tools: ["Figma", "Jira", "Notion", "Python"],
    projectType: "B2B SaaS / Risk Platform",
    gallery: [
      "https://picsum.photos/seed/gotham1/800/600",
      "https://picsum.photos/seed/gotham2/800/600",
      "https://picsum.photos/seed/gotham3/800/600",
      "https://picsum.photos/seed/gotham4/800/600"
    ],
    color: "#F2F2F2",
    image: "https://picsum.photos/seed/gotham/1200/800",
    slug: ""
  },
  {
    id: 2, index: "02",
    title: "MetaGo Coin, Film Studio - Crypto",
    tags: ["GTM", "Marketing", "Crypto"],
    year: "2026", duration: "2 months", role: "Product Marketing", event: "Startup Project - MetaGo Coin",
    description: "A crypto token powering a Web3 entertainment ecosystem where users invest in films, run virtual studios, and earn rewards through gameplay.",
    problem: "Web3 projects often struggle with user acquisition due to the high barrier of entry and a general lack of trust in the crypto space.",
    challenge: "Launching a crypto token in a trust-deficit market where most users have been burned before.",
    approach: "I owned the go-to-market strategy and positioning, focusing on the entertainment utility angle rather than investment speculation. The framing shift — from \"earn\" to \"participate\" — was the central decision that shaped all downstream marketing and onboarding.",
    outcome: "Increased adoption rate by 60% in the first week after launch, generating nearly 500 million in total revenue.",
    team: "Marketing Lead, 2 Ops, CEO",
    tools: ["Twitter Spaces", "Discord", "Medium", "Canva"],
    projectType: "Web3 / Entertainment",
    gallery: [
      "https://picsum.photos/seed/meta1/800/600",
      "https://picsum.photos/seed/meta2/800/600",
      "https://picsum.photos/seed/meta3/800/600",
      "https://picsum.photos/seed/meta4/800/600"
    ],
    color: "#C8D8FF",
    image: "https://picsum.photos/seed/metago/1200/800",
    slug: ""
  },
  {
    id: 3, index: "03",
    title: "Glance Fit - Digital Health & Fitness",
    tags: ["PRD", "UI Design", "Product Policy"],
    year: "2024", duration: "2 months", role: "Product Manager", event: "SparcLabs",
    description: "A social fitness rewards platform that tracks habits like walking, running, eating, sleeping, and workouts, rewarding users with redeemable points.",
    problem: "Most fitness apps fail to sustain long-term engagement because they focus on data entry rather than meaningful habit formation.",
    challenge: "Designing a habit-tracking product that actually changes behavior — not just logs it.",
    approach: "I drove the full product lifecycle from PRD through UI, anchoring every feature decision around one question: does this make the next healthy action easier or harder? The rewards system was designed last, not first — to avoid incentivizing the wrong behaviors.",
    outcome: "Designed an end-to-end MVP for an application with 5+ core features, including 5 product policy slides.",
    team: "Solo PM & Designer",
    tools: ["Figma", "Whimsical", "Google Workspace"],
    projectType: "Digital Health / Social Fitness",
    gallery: [
      "https://picsum.photos/seed/glance1/800/600",
      "https://picsum.photos/seed/glance2/800/600",
      "https://picsum.photos/seed/glance3/800/600",
      "https://picsum.photos/seed/glance4/800/600"
    ],
    color: "#D4F0E8",
    image: "/images/glance-fit-thumbanail.png",
    slug: ""
  },
  {
    id: 4, index: "04",
    title: "Privy Acceleration Program - Education",
    tags: ["Program Management", "Learning Operations", "Stakeholder Management"],
    year: "2023", duration: "5 months", role: "Project Support", event: "National Program - Privy",
    description: "A 6-month initiative designed to accelerate growth and build core skills for 100+ junior to mid-level Product & Tech team members",
    problem: "Organizations struggle to scale training programs while ensuring that the skills learned are actually applied to solve business problems.",
    challenge: "Scaling a 100-person internal learning program while maintaining quality and measurable business impact.",
    approach: "I operated at the intersection of learning design and stakeholder management — translating business goals into program structure and keeping alignment across HR, product, and senior leadership. The key decision was tracking talent outcomes (promotions, remapping) rather than completion rates alone.",
    outcome: "Drove ~IDR 1B/month OPEX reduction, enabled 80+ talent remappings, and achieved 80%+ success rate with promotions and salary growth",
    team: "Learning & Development Team, 5 Mentors",
    tools: ["Slack", "Google Sheets", "Zoom", "LMS"],
    projectType: "Internal Capability / Education",
    gallery: [
      "https://picsum.photos/seed/privy1/800/600",
      "https://picsum.photos/seed/privy2/800/600",
      "https://picsum.photos/seed/privy3/800/600",
      "https://picsum.photos/seed/privy4/800/600"
    ],
    color: "#F0E8FF",
    image: "https://picsum.photos/seed/privy/1200/800",
    slug: ""
  },
  {
    id: 5, index: "05",
    title: "Is traditional TV still relevant in the Digital Age?",
    tags: ["Qualitative Research", "Data Synthesize", "UX Research Report"],
    year: "2023", duration: "1 months", role: "UX Researcher", event: "Mentify Online Bootcamp",
    description: "A behavioral study of digital media habits, reframing TV as an ambient companion and revealing how attention, control, and context reshape its role.",
    problem: "Streaming has fundamentally changed how we consume video, but the traditional metrics of 'viewership' don't capture the ambient role TV plays in modern life.",
    challenge: "Reframing what \"TV\" means when the question is no longer whether people watch, but how and why they choose it over alternatives.",
    approach: "I designed the research methodology to capture context — not just preference. By studying when and where people chose TV over other screens, the insights shifted from usage patterns to emotional and situational triggers, which made the strategic implications sharper.",
    outcome: "Delivered insights from 2 research methods and 3 participants, redefining TV as an ambient medium and informing content, timing, and cross-device strategy.",
    team: "Research Duo",
    tools: ["Miro", "Zoom Interviews", "Dedoose"],
    projectType: "Behavioral Research / Media",
    gallery: [
      "https://picsum.photos/seed/tv1/800/600",
      "https://picsum.photos/seed/tv2/800/600",
      "https://picsum.photos/seed/tv3/800/600",
      "https://picsum.photos/seed/tv4/800/600"
    ],
    color: "#FFF0D8",
    image: "https://picsum.photos/seed/tv/1200/800",
    slug: "",
    externalLink: "https://tvbroadcast.vercel.app/"
  },
  {
    id: 6, index: "06",
    title: "K-Shop - Social Commerce",
    tags: ["Product Management", "UX Design", "Mobile Apps"],
    year: "2022", duration: "7 months", role: "Lead of Product Research & Design", event: "Early-Startup K-Shop",
    description: "A social commerce experience built on real discovery and trust, blending content, conversation, and community to drive engagement and confident purchasing decisions.",
    problem: "Social commerce requires a delicate balance of community trust and high-velocity transactions, which is difficult for early-stage startups to get right.",
    challenge: "Building social commerce trust in a market where users don't buy from strangers — and early-stage startups can't afford to get retention wrong.",
    approach: "I led research and design across 3 MVP cycles, using each deployment to stress-test one hypothesis about discovery and trust. The biggest decision was deprioritizing the transaction flow in favor of the social layer — betting that purchase would follow community.",
    outcome: "Successfully designed a social commerce app and deployed 3 MVPs early in his career, while gaining valuable lessons learned.",
    team: "Founding Team (3 members)",
    tools: ["Figma", "Firebase", "React Native", "Trello"],
    projectType: "Social Commerce / Mobile App",
    gallery: [
      "https://picsum.photos/seed/kshop1/800/600",
      "https://picsum.photos/seed/kshop2/800/600",
      "https://picsum.photos/seed/kshop3/800/600",
      "https://picsum.photos/seed/kshop4/800/600"
    ],
    color: "#FFE8EC",
    image: "/images/k-shop-thumbnail.png",
    slug: ""
  }
].map(cs => ({ ...cs, slug: slugify(cs.title) }));
