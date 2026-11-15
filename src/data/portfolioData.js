export const personalInfo = {
  name: "Ashutosh Gautam",
  role: "Full-Stack Developer & Financial Data Analyst",
  subheading: "Building clean, fast web applications and translating financial market data into intuitive, human-centered experiences.",
  location: "West Bengal, India",
  email: "vyasashutosh551@gmail.com",
  phone: "+91 8482084419",
  phoneDisplay: "+91 84820 84419",
  status: "Open to Full-Stack Engineering & Analyst Roles",
  about: `I'm a full-stack developer (MERN) and data analyst based in West Bengal, India. I love building things that live on the internet — from practical tools that save people money on groceries to interactive financial dashboards. When I'm not writing code or analyzing market charts, you'll find me behind a camera lens capturing quiet street scenes in Kolkata or practicing Italian.`,
  languages: [
    { name: "English", level: "Fluent / Professional" },
    { name: "Hindi", level: "Native / Bilingual" },
    { name: "Bengali", level: "Working Proficiency" },
    { name: "Italian", level: "Elementary (A1)" }
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
    tagline: "Compare grocery prices across Blinkit, Zepto & Instamart in real time",
    category: "Consumer Utility",
    status: "Functional Prototype",
    statusColor: "emerald",
    icon: "Zap",
    problem: "I got tired of switching between 4 different quick-commerce apps just to find out which one had groceries cheaper and faster in my area. So I built QuickScan to pull live basket totals and delivery estimates into one clean view.",
    highlights: [
      "Compares real-time basket totals across Blinkit, Zepto, Swiggy Instamart, and BB Now.",
      "Instant calculator showing you the cheapest and fastest platform per order.",
      "Clean, mobile-first interface designed for quick everyday shopping."
    ],
    tech: ["React 19", "Vite", "Tailwind CSS", "Node.js", "Express.js", "REST APIs"],
    metrics: { primary: "150+", label: "Indexed Products", secondary: "4 Apps", secLabel: "Blinkit, Zepto, Instamart, BB Now" }
  },
  {
    id: "subtrap",
    title: "SubTrap",
    tagline: "Kill unwanted free-trial charges before your card gets billed",
    category: "Productivity & Security",
    status: "Functional MVP",
    statusColor: "blue",
    icon: "ShieldAlert",
    problem: "Free trial amnesia is real — we've all signed up for a trial, forgotten about it, and gotten hit with an unexpected recurring charge a week later. SubTrap gives you a 1-click Google Calendar reminder, direct links to buried cancellation pages, and guides to bypass sneaky retention traps.",
    highlights: [
      "1-click Google Calendar kill-switch reminders automatically added to your schedule.",
      "Direct shortcuts to cancel accounts without getting trapped in retention loops.",
      "Annual savings tracker celebrating money kept in your pocket."
    ],
    tech: ["React 19", "Vite", "Tailwind CSS", "Manifest V3", "Google Calendar API", "RFC 5545 (.ics)"],
    metrics: { primary: "100%", label: "Trial Protection", secondary: "1-Click", secLabel: "Calendar Kill-Switch" }
  },
  {
    id: "pantrypanic",
    title: "PantryPanic",
    tagline: "Turn expiring fridge ingredients into quick 10-minute meals",
    category: "Cooking & Sustainability",
    status: "Functional MVP",
    statusColor: "amber",
    icon: "UtensilsCrossed",
    problem: "Food waste happens when you forget what's sitting in the back of your fridge. PantryPanic lets you select ingredients you already have and immediately suggests 10-minute, single-pan rescue recipes before anything goes bad.",
    highlights: [
      "Instant recipe suggestions based purely on ingredients you already have at home.",
      "Prioritizes single-pan, 10-minute quick recipes with minimal kitchen cleanup.",
      "Built-in interactive cooking timer with audio alerts."
    ],
    tech: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Spoonacular API", "Web Audio"],
    metrics: { primary: "10 Min", label: "Rescue Cook Time", secondary: "Single-Pan", secLabel: "Zero Sink Mess" }
  },
  {
    id: "groupprojectguard",
    title: "GroupProjectGuard",
    tagline: "Fair credit and accountability for college group projects",
    category: "Collaboration & EdTech",
    status: "Classroom Ready",
    statusColor: "purple",
    icon: "UserCheck",
    problem: "Every student knows the pain of doing 90% of a group project while teammates vanish. GroupProjectGuard logs real task contributions, links proof of work, and generates a transparent breakdown so grades reflect who actually built the project.",
    highlights: [
      "Transparent task log with proof-of-work links, documents, and timestamps.",
      "Visual equity breakdown showing true team workload distribution.",
      "Exportable summary ready to share with professors or teammates."
    ],
    tech: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Chart.js", "LocalStorage"],
    metrics: { primary: "90/10", label: "Workload Audit", secondary: "1-Click", secLabel: "Fair Grade Report" }
  }
];

export const technicalSkills = [
  {
    category: "Full-Stack Web Development",
    icon: "Code2",
    description: "Building responsive, modern applications from front to back",
    skills: [
      { name: "React.js / Next.js", level: "Advanced", tag: "Frontend" },
      { name: "Node.js & Express", level: "Intermediate", tag: "Backend" },
      { name: "MongoDB (MERN)", level: "Intermediate", tag: "Database" },
      { name: "TypeScript", level: "Proficient", tag: "Typed JS" },
      { name: "JavaScript (ES6+)", level: "Advanced", tag: "Core" },
      { name: "Python", level: "Intermediate", tag: "Data & Scripts" },
      { name: "Tailwind CSS", level: "Advanced", tag: "Styling" }
    ]
  },
  {
    category: "Performance & Quality",
    icon: "Cpu",
    description: "Writing clean code that loads fast and looks polished",
    skills: [
      { name: "Structured Debugging", level: "Advanced", tag: "Diagnostics" },
      { name: "Chrome DevTools", level: "Advanced", tag: "Profiling" },
      { name: "Web Performance (CWV)", level: "Advanced", tag: "Speed" },
      { name: "Responsive Design", level: "Advanced", tag: "Mobile-First" },
      { name: "RESTful API Design", level: "Proficient", tag: "APIs" }
    ]
  },
  {
    category: "Financial & Data Analytics",
    icon: "TrendingUp",
    description: "Market fundamentals, macro indicators, and financial modeling",
    skills: [
      { name: "Stock Market Analysis", level: "Proficient", tag: "Equity" },
      { name: "Company Fundamentals", level: "Proficient", tag: "Valuation" },
      { name: "Macroeconomic Tracking", level: "Skilled", tag: "Global Trends" },
      { name: "Data Analysis", level: "Proficient", tag: "Insights" },
      { name: "Advanced Excel", level: "Advanced", tag: "Modeling" }
    ]
  },
  {
    category: "Outreach & Operations",
    icon: "Briefcase",
    description: "Campaign strategies, workflow management, and communication",
    skills: [
      { name: "Email Marketing Suites", level: "Advanced", tag: "Campaigns" },
      { name: "Lead Generation", level: "Proficient", tag: "Growth" },
      { name: "Professional Writing", level: "Proficient", tag: "Communication" },
      { name: "Operations Management", level: "Proficient", tag: "Workflow" },
      { name: "Touch Typing", level: "Fast & Accurate", tag: "Execution" }
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
    description: "Conducted fundamental equity analysis, company balance sheet audits, and weekly market digests for senior leadership.",
    highlights: [
      "Tracked global stock market indices, interest rate movements, and key macroeconomic trends.",
      "Analyzed company financial statements, P/E ratios, and return on equity (ROE) for valuation reports.",
      "Synthesized market news and industry shifts into weekly executive review presentations."
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
    description: "Worked on live production web apps, building React frontends, Express APIs, and MongoDB database models.",
    highlights: [
      "Built and deployed live production web features using React, Node.js, Express, and MongoDB.",
      "Connected REST APIs with client components, handling input validation and fluid state management.",
      "Tested and debugged layouts across desktop and mobile browsers to ensure smooth, responsive performance."
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
    description: "Created educational modules for underprivileged students and managed operational intelligence spreadsheets.",
    highlights: [
      "Designed practical learning curricula and taught underprivileged students across partner NGOs.",
      "Organized operational data in structured spreadsheets to streamline volunteer workflows.",
      "Collaborated with team leads to research and expand community outreach initiatives."
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
    description: "Awarded Intern of the Month for fast delivery and designing high-converting outreach pipelines.",
    highlights: [
      "Recognized as the top-performing intern of the month for high execution speed and delivery quality.",
      "Designed automated corporate outreach campaigns using modern email marketing tools.",
      "Analyzed engagement metrics to improve response rates and lead generation."
    ],
    tech: ["Email Marketing", "Lead Generation", "Enterprise Networking", "Campaign Strategy", "Performance Optimization"]
  },
  {
    id: "adamas-vol",
    role: "Student Volunteer & Academic Coordinator",
    company: "Adamas University",
    period: "2023 – 2026",
    location: "Kolkata, West Bengal",
    badge: "Campus Leadership",
    type: "Volunteering",
    description: "Organized department conferences, student logistics, and academic documentation.",
    highlights: [
      "Coordinated scheduling and logistics for academic seminars and campus events.",
      "Prepared agendas, documented meeting summaries, and distributed materials to faculty and students.",
      "Managed records with high attention to detail, reliability, and confidentiality."
    ],
    tech: ["Executive Scheduling", "Event Logistics", "Documentation", "Team Coordination"]
  }
];

export const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Adamas University",
    location: "Kolkata, West Bengal",
    period: "2023 – 2027 (Expected)",
    badge: "Undergraduate Degree",
    details: "Focusing on software development, data structures, web architecture, database design, and computer networks."
  },
  {
    degree: "Higher Secondary (Class XII) & Secondary (Class X)",
    institution: "Agrasain Boys' School",
    location: "Howrah, West Bengal",
    period: "Completed 2023",
    badge: "Foundational Schooling",
    details: "Foundational schooling emphasizing mathematics, science, and computer applications."
  }
];

export const hobbies = [
  {
    title: "Creative Photography",
    tagline: "Framing Light, Shadow & Everyday Life",
    description: "Capturing quiet candid moments at railway stations, mountain sunsets, and beach shorelines. Photography trains my eye for composition, visual balance, and detail — which directly influences how I design user interfaces.",
    icon: "Camera",
    accent: "from-amber-500/20 to-orange-500/20",
    tags: ["Composition", "Street Scenes", "Natural Light"]
  },
  {
    title: "Endurance & Swimming",
    tagline: "Rhythm, Focus & Daily Discipline",
    description: "Lap swimming and running help me reset, maintain high energy, and build mental endurance for long problem-solving sessions.",
    icon: "Waves",
    accent: "from-cyan-500/20 to-blue-500/20",
    tags: ["Stamina", "Daily Routine", "Mental Clarity"]
  },
  {
    title: "Language Learning",
    tagline: "Exploring Culture & Italian (A1)",
    description: "I enjoy exploring linguistics across English, Hindi, Bengali, and Italian. Studying a new language exercises the same pattern-recognition muscles as learning a new programming framework.",
    icon: "Globe2",
    accent: "from-violet-500/20 to-purple-500/20",
    tags: ["Italian (A1)", "Multilingual", "Cultural Curiosity"]
  }
];
