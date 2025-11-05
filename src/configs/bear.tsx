import type { BearData } from "~/types";

const bear: BearData[] = [
  {
    id: "profile",
    title: "Profile",
    icon: "i-fa-solid:paw",
    md: [
      {
        id: "about-me",
        title: "About Me",
        file: "markdown/about-me.md",
        icon: "i-la:dragon",
        excerpt: "AI & ML grad | React Native dev | AI app builder"
      },
      {
        id: "github-stats",
        title: "Github Stats",
        file: "markdown/github-stats.md",
        icon: "i-icon-park-outline:github",
        excerpt: "Here are some status about my github account..."
      },
      {
        id: "about-site",
        title: "About This Site",
        file: "markdown/about-site.md",
        icon: "i-octicon:browser",
        excerpt: "Something about this personal portfolio site..."
      }
    ]
  },
  {
    id: "project",
    title: "Projects",
    icon: "i-octicon:repo",
    md: [
      {
        id: "FlavorySync",
        title: "FlavorySync",
        file: "markdown/flavorsync.md",
        icon: "i-heroicons-solid:fire",
        excerpt: "A React Native MobileApplication",
        link: "https://www.flavorsync.xyz"
      },
      {
        id: "Snix",
        title: "Snix",
        file: "markdown/snix.md", 
        icon: "i-fa-brands:vuejs",
        excerpt: "Snix Crytpo App.",
        link: "https://www.snix.fun/"
      },
      {
        id: "loan mate",
        title: "Loan Mate",
        file: "markdown/loanmate.md",
        icon: "i-gg:format-text",
        excerpt: "LoanMate AI – Smart loan approval engine.",
        link: "https://huggingface.co/spaces/Chakri5658/loanmate"
      },
      {
        id: "PromptWizard",
        title: "PromptWizard",
        file: "markdown/Promptwizard.md",
        icon: "i-ri:newspaper-fill",
        excerpt: "Turn Raw Ideas into Polished Prompts",
        link: "https://www.promptwizard.fun"
      },
      {
        id: "Portfolio-Website",
        title: "Netflix Portfolio",
        file: "markdown/Netflix-Portfolio.md",
        icon: "i-fa-brands:vuejs",
        excerpt: "Netflix Inspired Portfolio. Real-World Impact.",
        link: "https://portfolio-website-gilt-gamma.vercel.app/"
      },
      {
        id: "Cara",
        title: "Cara Landing Page",
        file: "markdown/Cara-Landing-Page.md",
        icon: "i-akar-icons:sword",
        excerpt: "A Responsive Landing Page",
        link: "https://www.lawcara.site/"
      },
      {
        id: "Cara-app",
        title: "Cara App",
        file: "markdown/Cara.md",
        icon: "i-icon-park-outline:heavy-metal",
        excerpt: "AI that makes legal talk simple",
        link: "https://www.lawcara.site/"
      },
      {
        id: "FlavorSync-Landingpage",
        title: "Landing Page",
        file: "markdown/flavorsycn-landigpage.md",
        icon: "i-ri:gamepad-line",
        excerpt: "Landing page for FlavorSync",
        link: "https://www.flavorsync.xyz"
      },
      {
        id: "TiltX",
        title: "TiltX",
        file: "markdown/tiltx.md",
        icon: "i-mdi:robot",
        excerpt: "TiltX - Gesture-controlled Shorts scroller.", 
        link: "https://github.com/chakravarthigit"
      },
    ]
  }
];

export default bear;
