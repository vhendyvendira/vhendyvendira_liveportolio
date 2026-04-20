import { CaseStudy } from './types';

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1, index: "01",
    title: "Gotham - Risk Intelligence",
    tags: ["Business Model Canvas", "PRD", "MVP"],
    year: "2026", duration: "3 months", role: "Product Manager", event: "Internal Innovation Lab",
    description: "A risk intelligence platform that deciphers unsustainable schemes in fintech and investments including suspected Ponzi models and financial fraud risks",
    outcome: "Framework adopted as internal standard. Pilot phase increased team velocity by 25%. Currently scaling to enterprise-wide implementation.",
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
    outcome: "Increased adoption rate by 60% in the first week after launch, generating nearly 500 million in total revenue.",
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
    outcome: "Designed an end-to-end MVP for an application with 5+ core features, including 5 product policy slides.",
    color: "#D4F0E8",
    image: "/images/glance-fit-thumbnail.png",
    slug: ""
  },
  {
    id: 4, index: "04",
    title: "Privy Acceleration Program - Education",
    tags: ["Program Management", "Learning Operations", "Stakeholder Management"],
    year: "2023", duration: "5 months", role: "Project Support", event: "National Program - Privy",
    description: "A 6-month initiative designed to accelerate growth and build core skills for 100+ junior to mid-level Product & Tech team members",
    outcome: "Drove ~IDR 1B/month OPEX reduction, enabled 80+ talent remappings, and achieved 80%+ success rate with promotions and salary growth",
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
    outcome: "Delivered insights from 2 research methods and 3 participants, redefining TV as an ambient medium and informing content, timing, and cross-device strategy.",
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
    outcome: "Successfully designed a social commerce app and deployed 3 MVPs early in his career, while gaining valuable lessons learned.",
    color: "#FFE8EC",
    image: "/images/k-shop-thumbnail.png",
    slug: ""
  }
].map(cs => ({ ...cs, slug: slugify(cs.title) }));
