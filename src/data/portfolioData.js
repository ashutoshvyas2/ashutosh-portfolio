export const personalInfo = {
  name: "Ashutosh Gautam",
  role: "Full-Stack Developer & Financial Data Analyst",
  subheading: "Computer Applications Scholar (BCA) passionate about engineering scalable, responsive full-stack web architectures (MERN Stack Core), consumer-facing prototypes, and translating complex market data into actionable intelligence.",
  location: "West Bengal, India",
  email: "vyasashutosh551@gmail.com",
  phone: "+91 8482084419",
  phoneDisplay: "+91 84820 84419",
  status: "Available for Full-Stack Engineering & Analyst Roles",
  about: `An extremely driven Computer Application student seeking entry-level opportunities to apply rigorous academic knowledge and foundational technical skills in high-impact professional settings. Combining robust full-stack software development (MERN stack core, Next.js, TypeScript) with analytical financial research, active consumer-utility prototyping, and a disciplined work ethic with rapid adaptability.`,
  languages: [
    { name: "English", level: "Fluent / Professional" },
    { name: "Hindi", level: "Native / Bilingual" },
    { name: "Bengali", level: "Working Proficiency" },
    { name: "Italian", level: "Beginner / Elementary (A1)" }
  ]
};

export const stats = [
  { value: "Full Stack", label: "Software Engineer", detail: "MERN Core, Next.js, TypeScript" },
  { value: "4", label: "Active Prototypes", detail: "Quick-commerce, Chrome Ext, WebApps" },
  { value: "4+", label: "Professional Internships", detail: "Tech, Finance & Operations" },
  { value: "#1", label: "Intern of the Month", detail: "Triple One Solution awardee" }
];

export const prototypes = [
  {
    id: "quickscan",
    title: "QuickScan",
    tagline: "Real-Time Quick-Commerce Basket & Price Comparator",
    category: "Consumer Utility",
    status: "Prototype Ready • Functional MVP",
    statusColor: "emerald",
    icon: "Zap",
    problem: "Eliminates the friction of toggling across 4+ quick-commerce apps by providing live basket-cost, delivery time, and pricing comparisons across Blinkit, Zepto, Swiggy Instamart, and BB Now for 150+ daily groceries and household medicines.",
    highlights: [
      "Aggregates 150+ live products with dynamic multi-platform REST adapters.",
      "Instant basket-cost calculation revealing the cheapest and fastest platform per order.",
      "Location-aware pricing heuristics and responsive mobile-first interface."
    ],
    tech: ["React 18", "Vite", "Tailwind CSS", "Node.js", "Express.js", "REST Adapters"],
    metrics: { primary: "150+", label: "Indexed Products", secondary: "4 Platforms", secLabel: "Blinkit, Zepto, Instamart, BB Now" }
  },
  {
    id: "subtrap",
    title: "SubTrap",
    tagline: "Proactive Subscription Protection & Chrome Extension",
    category: "Security & Productivity",
    status: "Production-Ready MVP • Store Listing Ready",
    statusColor: "blue",
    icon: "ShieldAlert",
    problem: "Cures 'free-trial amnesia' and prevents accidental recurring credit card debits. Automatically parses trial confirmations, triggers 1-click Google Calendar kill-switch reminders, provides direct links to buried cancellation pages with dark-pattern bypass guides, and tracks avoided charges on an annual savings dashboard.",
    highlights: [
      "Dual-target deployment: Standalone Web App + Chrome Extension (Manifest V3).",
      "Automated RFC 5545 iCalendar (`.ics`) generation & Google Calendar Action Templates.",
      "Dark-pattern bypass blueprints guiding users past retention traps to cancel effortlessly.",
      "Verified Indian subscription pricing matrix and annual savings calculator."
    ],
    tech: ["React 18", "Vite", "Tailwind CSS", "Manifest V3", "Google Calendar API", "RFC 5545 (.ics)", "Canvas Confetti"],
    metrics: { primary: "100%", label: "Trial Protection", secondary: "0 Jitter", secLabel: "1-Click Calendar Kill-Switch" }
  },
  {
    id: "pantrypanic",
    title: "PantryPanic",
    tagline: "Anti-Food-Waste Emergency Recipe Rescue Engine",
    category: "Sustainability & Health",
    status: "Prototype Ready • Functional MVP",
    statusColor: "amber",
    icon: "UtensilsCrossed",
    problem: "Transforms expiring fridge ingredients into rapid 10-minute, single-pan rescue meals before food spoils—preventing household waste and curbing expensive, impulsive late-night food deliveries (Swiggy/Zomato/DoorDash).",
    highlights: [
      "Algorithmic recipe matching powered by the Spoonacular Recipe API.",
      "Custom multi-ingredient selector prioritizing perishable groceries.",
      "Interactive 10-minute audio-assisted kitchen timer with Web Audio API chime.",
      "Estimated takeout money-saved counter celebrating sustainable home cooking."
    ],
    tech: ["Next.js 14 (App Router)", "React 18", "TypeScript", "Tailwind CSS", "Spoonacular API", "Web Audio API"],
    metrics: { primary: "10 Min", label: "Rescue Cook Time", secondary: "Single-Pan", secLabel: "Zero Sink Mess" }
  },
  {
    id: "groupprojectguard",
    title: "GroupProjectGuard",
    tagline: "Micro-Task Accountability & Fair Credit Grading Dashboard",
    category: "EdTech & Collaboration",
    status: "MVP Complete • Classroom Pilot Ready",
    statusColor: "purple",
    icon: "UsersCheck",
    problem: "Eliminates unfair credit distribution in university and school group assignments—where one student carries 90% of the workload at 3 AM while others vanish. Tracks weighted deliverables with verifiable evidence links, logs late-night effort multipliers, and generates professor-ready fair grade recalculation audits.",
    highlights: [
      "Verifiable proof-of-work logger with commit/doc links and timestamp validation.",
      "Late-night effort bonus weighting to reward deadline-crunch contributors fairly.",
      "Dynamic visual contribution pie charts and comparative equity distributions.",
      "Exportable professor-ready fair grading report backed by verifiable peer audit logs."
    ],
    tech: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Chart.js", "react-chartjs-2", "LocalStorage Engine"],
    metrics: { primary: "90/10", label: "Workload Audit", secondary: "1-Click", secLabel: "Professor Grade Report" }
  }
];

export const technicalSkills = [
  {
    category: "Full-Stack Development",
    icon: "Code2",
    description: "End-to-end modern web applications with scalable architecture",
    skills: [
      { name: "React.js / Next.js", level: "Advanced", tag: "Frontend" },
      { name: "Node.js & Express", level: "Intermediate", tag: "Backend" },
      { name: "MongoDB (MERN)", level: "Intermediate", tag: "Database" },
      { name: "TypeScript", level: "Proficient", tag: "Typed JS" },
      { name: "JavaScript (ES6+)", level: "Advanced", tag: "Core" },
      { name: "Python", level: "Intermediate", tag: "Scripting / Data" },
      { name: "HTML5 / CSS3 / Tailwind", level: "Advanced", tag: "Structure & Style" }
    ]
  },
  {
    category: "Engineering & Optimization",
    icon: "Cpu",
    description: "Quality assurance, site speed, and structured debugging",
    skills: [
      { name: "Application Testing", level: "Skilled", tag: "QA" },
      { name: "Debugger & DevTools", level: "Advanced", tag: "Diagnostics" },
      { name: "Website Optimization", level: "Advanced", tag: "Performance" },
      { name: "SEO Architecture", level: "Skilled", tag: "Search / CWV" },
      { name: "Responsive UI Design", level: "Advanced", tag: "Mobile-First" }
    ]
  },
  {
    category: "Financial & Data Analytics",
    icon: "TrendingUp",
    description: "Market fundamentals, macro indicators, and spreadsheet modeling",
    skills: [
      { name: "Financial Market Analysis", level: "Proficient", tag: "Equity" },
      { name: "Company Fundamentals", level: "Proficient", tag: "Valuation" },
      { name: "Macroeconomic Tracking", level: "Skilled", tag: "Global Trends" },
      { name: "Data Analysis", level: "Proficient", tag: "Insights" },
      { name: "Advanced Excel", level: "Advanced", tag: "Formulas & Pivot" }
    ]
  },
  {
    category: "Growth & Operations",
    icon: "Briefcase",
    description: "Digital outreach, lead engines, and institutional management",
    skills: [
      { name: "Email Marketing Suites", level: "Advanced", tag: "Campaigns" },
      { name: "Lead Generation", level: "Proficient", tag: "Growth" },
      { name: "Corporate Networking", level: "Skilled", tag: "B2B Outreach" },
      { name: "Operations Management", level: "Proficient", tag: "Workflow" },
      { name: "Professional Typing", level: "Fast & Accurate", tag: "Execution" }
    ]
  }
];

export const experiences = [
  {
    id: "edify",
    role: "Finance Research Analyst Intern",
    company: "Edify Equity",
    period: "June 2026 – July 2026",
    location: "Remote",
    badge: "Financial Intelligence",
    type: "Internship",
    description: "Conducted deep dives into stock market dynamics, macroeconomic trends, and company fundamentals to produce institutional executive reports.",
    highlights: [
      "Conducted deep dives into stock market trends, analyzed company fundamentals, and tracked macroeconomic indicators influencing global markets.",
      "Compiled weekly analytical insights and reported market dynamics, core financial news developments, and global economic movements.",
      "Assisted in preparing periodic financial data analyses and internal review presentations for senior leadership."
    ],
    tech: ["Financial Market Analysis", "Company Fundamentals", "Macroeconomics", "Advanced Excel", "Data Presentation"]
  },
  {
    id: "playtplus",
    role: "MERN Stack Developer Intern",
    company: "Playtplus Technologies Pvt. Ltd.",
    period: "June 2025 – August 2025",
    location: "Navi Mumbai, Maharashtra",
    badge: "Core Software Engineering",
    type: "Internship",
    description: "Architected and delivered scalable MERN stack components for live production web systems and enterprise corporate applications.",
    highlights: [
      "Gained hands-on experience with MERN stack technologies (MongoDB, Express.js, React, Node.js) to build scalable, high-performance web architecture.",
      "Successfully implemented core conceptual learnings into live production websites and corporate applications.",
      "Collaborated on API integrations, state management routines, and component modularity to ensure seamless user experience."
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JavaScript", "HTML/CSS", "REST APIs"]
  },
  {
    id: "adore",
    role: "Operations & Management Intern",
    company: "Adore (Simtrak)",
    period: "April 2025 – May 2025",
    location: "Remote",
    badge: "Social Impact & Ops",
    type: "Internship",
    description: "Engineered structured educational curricula for underprivileged students and managed corporate operational intelligence spreadsheets.",
    highlights: [
      "Acquired comprehensively deep domain insights regarding core corporate management framework structures.",
      "Designed and executed structured educational curriculums to teach underprivileged students across partnered NGOs.",
      "Maintained precise operational spreadsheets and spearheaded internal research-driven analytical projects."
    ],
    tech: ["Corporate Management", "Curriculum Design", "Operational Spreadsheets", "NGO Partnerships", "Analytical Research"]
  },
  {
    id: "tripleone",
    role: "Digital Marketing & Networking Intern",
    company: "Triple One Solution",
    period: "April 2025 – May 2025",
    location: "Remote",
    badge: "Award Winner • Top Intern",
    type: "Internship",
    description: "Awarded top-performing corporate intern of the month for high-yield outreach execution and enterprise lead generation.",
    highlights: [
      "Recognized officially as one of the top-performing corporate interns of the month for exemplary delivery execution.",
      "Strategized target-driven outreach campaigns using sophisticated professional email marketing suites.",
      "Studied corporate lead generation networks and enterprise digital networking models."
    ],
    tech: ["Email Marketing", "Lead Generation", "Enterprise Networking", "Campaign Strategy", "Performance Optimization"]
  },
  {
    id: "adamas-vol",
    role: "Student Volunteer & Academic Coordinator",
    company: "Adamas University",
    period: "2023 – 2026",
    location: "Kolkata, West Bengal",
    badge: "Institutional Leadership",
    type: "Volunteering",
    description: "Coordinated university-wide logistics, high-stakes institutional conferences, and managed confidential regulatory portfolios.",
    highlights: [
      "Managed complex organizational timelines, master calendars, and structured institutional schedules.",
      "Coordinated logistics to smoothly schedule executive assemblies, institutional meetings, and academic conferences.",
      "Prepared and distributed formalized meeting agendas, institutional minutes, and relevant documentation portfolios.",
      "Handled highly confidential files and institutional materials with complete regulatory discretion and structural organization."
    ],
    tech: ["Executive Scheduling", "Event Logistics", "Documentation Portfolios", "Confidential Records Management"]
  }
];

export const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Adamas University",
    location: "Kolkata, West Bengal",
    period: "2023 – 2027 (Expected)",
    badge: "Undergraduate Degree",
    details: "Rigorous computer science and software development curriculum spanning data structures, database architecture, web technologies, software engineering, and computer networks."
  },
  {
    degree: "Higher Secondary (Class XII) & Secondary (Class X)",
    institution: "Agrasain Boys' School",
    location: "Howrah, West Bengal",
    period: "Completed 2023",
    badge: "Foundational Schooling",
    details: "Strong foundational academic track record emphasizing mathematical reasoning, analytical sciences, and foundational digital literacy."
  }
];

export const hobbies = [
  {
    title: "Creative Photography",
    tagline: "Framing Light, Shadow & Perspective",
    description: "Exploring composition, dynamic range, and candid moments. A keen eye for visual balance that translates directly into aesthetic UI craft.",
    icon: "Camera",
    accent: "from-amber-500/20 to-orange-500/20",
    tags: ["Composition", "Street / Macro", "Lighting Balance"]
  },
  {
    title: "Endurance Swimming",
    tagline: "Focus, Rhythm & Discipline",
    description: "Competitive lap swimming reinforcing physical endurance, disciplined routines, and sustained mental focus.",
    icon: "Waves",
    accent: "from-cyan-500/20 to-blue-500/20",
    tags: ["Cardio Stamina", "Daily Discipline", "Mental Resilience"]
  },
  {
    title: "Secondary Language Learning",
    tagline: "Polyglot Exploration & Cultural Nuance",
    description: "Actively studying linguistic structures and multi-lingual communication across English, Hindi, Bengali, and Italian.",
    icon: "Globe2",
    accent: "from-violet-500/20 to-purple-500/20",
    tags: ["Cognitive Agility", "Cultural Nuance", "Italian (Beginner)"]
  }
];
