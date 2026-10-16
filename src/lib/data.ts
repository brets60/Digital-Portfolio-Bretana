export interface DeveloperProfile {
  name: string;
  nickname: string;
  fullName: string;
  course: string;
  yearLevel: string;
  field: string;
  careerGoal: string;
  roles: string[];
  bio: string;
  aboutIntro: string;
  status: string;
  stats: { value: string; label: string }[];
  contact: {
    email: string;
    facebook: string;
    github: string;
    linkedin: string;
  };
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "all" | "ai" | "capstone" | "desktop" | "concepts";
  categoryLabel: string;
  description: string;
  techStack: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  description: string;
  tags: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  isCert?: boolean;
}

export interface CertificateItem {
  id: string;
  title: string;
  theme: string;
  issuer: string;
  subIssuer: string;
  recipient: string;
  date: string;
  location: string;
  image: string;
  signatories: string[];
  skills: string[];
}

export interface ReferenceItem {
  id: string;
  name: string;
  role: string;
  institution?: string;
  contact: string;
  type: "phone" | "email";
  relationship?: string;
}

export const DEVELOPER_PROFILE: DeveloperProfile = {
  name: "John Michael Bretaña",
  nickname: "Brets",
  fullName: "John Michael Bretaña",
  course: "BS in Information Technology",
  yearLevel: "Undergraduate / Tech Innovator",
  field: "Information Technology & AI Systems",
  careerGoal: "Software Developer / Full-Stack Engineer",
  roles: [
    "Software Developer",
    "Full-Stack Engineer",
    "AI Systems Builder",
    "IoT & Desktop Developer",
  ],
  bio: "I am a Software Developer and Systems Engineer passionate about full-stack engineering, AI applications, system architecture, database design, and hardware IoT integration. I enjoy building intelligent, practical technology solutions that solve real-world problems.",
  aboutIntro:
    "My name is John Michael Bretaña, also known as Brets. I am a Full-Stack Software Developer specializing in modern web ecosystems, generative AI systems, desktop applications, database architecture, and IoT hardware integration. I build modern, resilient applications that bridge software, intelligence, and physical hardware.",
  status: "Available for Projects",
  stats: [
    { value: "9+", label: "Projects Built" },
    { value: "6", label: "Antigravity AI Apps" },
    { value: "15+", label: "Technologies Mastered" },
    { value: "1", label: "Capstone Lead System" },
  ],
  contact: {
    email: "bretanajohnmichael@gmail.com",
    facebook: "John Michael Bretaña",
    github: "github.com/brets60",
    linkedin: "Coming Soon",
  },
};

export const personalInfo = {
  name: DEVELOPER_PROFILE.name,
  role: DEVELOPER_PROFILE.roles[0],
  status: DEVELOPER_PROFILE.status,
  degree: DEVELOPER_PROFILE.course,
  timezone: "UTC+8",
  location: "Maramag, Bukidnon",
  bio: DEVELOPER_PROFILE.bio,
  email: DEVELOPER_PROFILE.contact.email,
  github: `https://${DEVELOPER_PROFILE.contact.github}`,
  linkedin: DEVELOPER_PROFILE.contact.linkedin,
  twitter: "https://twitter.com",
  roles: DEVELOPER_PROFILE.roles,
  stats: DEVELOPER_PROFILE.stats,
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "flora-ai",
    title: "Flora AI — Botanical Vision & Plant Care Assistant",
    category: "ai",
    categoryLabel: "AI & Smart Apps",
    description:
      "Production-ready botanical intelligence app featuring Google Gemini Vision species identification, leaf disease pathology diagnosis, personalized digital garden organizer, and adaptive watering cadences.",
    techStack: ["Next.js", "Python Gradio", "Gemini Vision", "TypeScript", "Tailwind CSS"],
    image: "/projects/flora.png",
    githubUrl: "https://github.com/brets60",
  },
  {
    id: "agrimate-ai",
    title: "AgriMate AI — Smart Farming Assistant for Small-Scale Farmers",
    category: "ai",
    categoryLabel: "AI & Smart Apps",
    description:
      "Full-stack agricultural mobile ecosystem empowering farmers with multimodal AI crop disease diagnosis, weather-driven irrigation advisories, soil health management, and plot cycle tracking.",
    techStack: ["React Native", "Expo", "Node.js", "Express", "Supabase", "Gemini AI"],
    image: "/projects/agrimate.png",
    githubUrl: "https://github.com/brets60",
  },
  {
    id: "phishguard-ai",
    title: "PhishGuard AI — Real-Time Phishing & Fake Site Detector",
    category: "ai",
    categoryLabel: "AI & Smart Apps",
    description:
      "Cybersecurity defense application detecting brand impersonation, zero-day phishing domains, typosquatting, and malicious URLs in real time using heuristic analysis and AI threat inspection.",
    techStack: ["Next.js 14", "PWA", "TypeScript", "Tailwind CSS", "Security Heuristics"],
    image: "/projects/phishguard.png",
    githubUrl: "https://github.com/brets60",
  },
  {
    id: "techresolve-ai",
    title: "TechResolve AI — Intelligent IT Troubleshooting Assistant",
    category: "ai",
    categoryLabel: "AI & Smart Apps",
    description:
      "Step-by-step IT support and diagnostics platform providing interactive solutions for computer hardware, Windows battery health, Wi-Fi networks, and OS crashes in Beginner and Pro modes.",
    techStack: ["FastAPI", "Python", "React", "Tailwind CSS", "SQLite", "Gemini AI"],
    image: "/projects/techresolve.png",
    githubUrl: "https://github.com/brets60",
  },
  {
    id: "studymate-ai",
    title: "AI StudyMate — Intelligent Academic Tutor & Revision Ecosystem",
    category: "ai",
    categoryLabel: "AI & Smart Apps",
    description:
      "Comprehensive student productivity platform featuring 6 pedagogical AI tutoring modes, automatic lecture note summarization, flashcard spaced repetition, and exam practice generators.",
    techStack: ["Next.js 15", "TypeScript", "Prisma", "Gemini AI", "KaTeX", "Tailwind CSS"],
    image: "/projects/studymate.png",
    githubUrl: "https://github.com/brets60",
  },
  {
    id: "dawntactics-ai",
    title: "DawnTactics AI — Competitive Strategy & Reactive Itemization Engine",
    category: "ai",
    categoryLabel: "AI & Smart Apps",
    description:
      "MLBB competitive draft assistant featuring 5v5 live counter-picking, real-time damage and CC composition analytics, death-defying item swap visualizers, and emblem optimization.",
    techStack: ["React", "Vite", "TypeScript", "Tailwind CSS", "PWA", "Game Analytics"],
    image: "/projects/dawntactics.png",
    githubUrl: "https://github.com/brets60",
  },
  {
    id: "speed-detection",
    title: "Speed Detection and Warning System with Pedestrian Alarm and CCTV Monitoring",
    category: "capstone",
    categoryLabel: "Capstone & IoT",
    description:
      "A mission-critical intelligent traffic safety system utilizing CCTV video processing, computer vision vehicle velocity tracking, and automated acoustic-visual warning strobe alarms when speeding vehicles approach crosswalks.",
    techStack: ["Python", "OpenCV", "YOLOv8", "Arduino", "CCTV", "IoT Relay"],
    image: "/projects/speed-detection.png",
    githubUrl: "https://github.com/brets60",
  },
  {
    id: "laundry-system",
    title: "Laundry Pickup and Delivery Management System",
    category: "desktop",
    categoryLabel: "Desktop Applications",
    description:
      "A complete desktop management application built to simplify and automate customer order tracking, weight billing, status updates, and dispatch logistics for laundry operations.",
    techStack: ["Python", "CustomTkinter", "Tkinter", "SQLite", "Database"],
    image: "/projects/laundry.png",
    githubUrl: "https://github.com/brets60/Laundry-Pickup-and-Delivery-Management-System",
  },
  {
    id: "govassist",
    title: "BRETANA GovAssist",
    category: "concepts",
    categoryLabel: "Concepts & Proposals",
    description:
      "A dedicated software platform designed to streamline public service transactions, citizen document management, institutional service requests, and administrative reporting.",
    techStack: ["Web / Desktop", "Information System", "Public Service", "Database"],
    image: "/projects/govassist.png",
    githubUrl: "https://github.com/brets60",
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "desktop-dev",
    title: "Desktop Application Development",
    description: "Creating user-friendly desktop applications using Python, Tkinter, and CustomTkinter.",
    iconName: "Monitor",
  },
  {
    id: "web-dev",
    title: "Web Development",
    description: "Building clean, modern, and responsive websites using HTML, CSS, and JavaScript.",
    iconName: "Globe",
  },
  {
    id: "database-design",
    title: "Database Design",
    description: "Designing relational databases, tables, relationships, and SQL queries.",
    iconName: "Database",
  },
  {
    id: "system-dev",
    title: "System Development",
    description: "Developing information systems based on organizational and academic requirements.",
    iconName: "Settings",
  },
  {
    id: "ui-design",
    title: "UI Design",
    description: "Creating clean and intuitive user interfaces with modern layouts.",
    iconName: "Layout",
  },
  {
    id: "iot-projects",
    title: "Arduino / IoT Projects",
    description: "Integrating microcontrollers, sensors, RF modules, and camera modules.",
    iconName: "Cpu",
  },
  {
    id: "documentation",
    title: "System Documentation",
    description: "Creating technical documentation, system guides, and project manuals.",
    iconName: "FileText",
  },
  {
    id: "troubleshooting",
    title: "Technical Troubleshooting",
    description: "Troubleshooting hardware, software, and networking issues.",
    iconName: "Wrench",
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "capstone",
    title: "Capstone Project Development",
    description: "Designed and implemented a hardware and software-based speed detection, pedestrian warning, and CCTV monitoring system.",
    iconName: "Radio",
  },
  {
    id: "system-dev",
    title: "System Development",
    description: "Built desktop management applications using Python and CustomTkinter.",
    iconName: "Laptop",
  },
  {
    id: "arduino-hardware",
    title: "Hardware and Arduino Projects",
    description: "Worked with sensors, RF modules, buzzers, Arduino boards, and ESP32-CAM hardware.",
    iconName: "Cpu",
  },
  {
    id: "database-dev",
    title: "Database Development",
    description: "Designed relational database schemas, tables, queries, and data storage systems.",
    iconName: "Database",
  },
  {
    id: "software-dev",
    title: "Software Development",
    description: "Developed software applications using Python, HTML, CSS, and JavaScript.",
    iconName: "Code",
  },
  {
    id: "academic-it",
    title: "Academic IT Projects",
    description: "Participated in software development, documentation, system design, and laboratory projects.",
    iconName: "Layers",
  },
  {
    id: "prototype",
    title: "Prototype Development",
    description: "Constructed and tested rapid hardware/software prototypes for real-world academic use cases.",
    iconName: "Hammer",
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: "college",
    period: "Present",
    degree: "Bachelor of Science in Information Technology",
    institution: "Torres Capitol College, Inc.",
    description:
      "Pursuing a Bachelor of Science in Information Technology with specialized coursework in software development, AI systems, relational databases, hardware integration, and web engineering.",
    tags: [
      "Software Development",
      "AI Applications",
      "Database Systems",
      "Hardware Integration",
      "Web Development",
    ],
  },
  {
    id: "shs",
    period: "Senior High School",
    degree: "Senior High School — TVL / ICT Track",
    institution: "Bukidnon National School of Home Industries",
    description:
      "Senior High School education completed at Bukidnon National School of Home Industries with foundational training in Information and Communications Technology, computer operations, and technical skills.",
    tags: ["TVL-ICT", "Computer Systems", "Technical Foundations"],
  },
  {
    id: "secondary",
    period: "Junior High School",
    degree: "Secondary Education (Junior High School)",
    institution: "Bukidnon National School of Home Industries",
    description:
      "Secondary education completed at Bukidnon National School of Home Industries providing core academic foundations, collaborative project experience, and technical-vocational explorations.",
    tags: ["Secondary Education", "Academics", "Vocational Training"],
  },
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "academic",
    title: "Academic Achievement",
    subtitle: "Add academic honors or distinctions here.",
    iconName: "Award",
  },
  {
    id: "project",
    title: "Project Achievement",
    subtitle: "Add capstone milestones or project recognitions here.",
    iconName: "Trophy",
  },
  {
    id: "certifications",
    title: "Certification",
    subtitle: "Official technical certifications and workshop credentials.",
    iconName: "Medal",
    isCert: true,
  },
  {
    id: "presentation",
    title: "Presentation",
    subtitle: "Add project presentations or defense milestones here.",
    iconName: "Presentation",
  },
  {
    id: "training",
    title: "Training / Seminar",
    subtitle: "Add technical workshops, seminars, or webinars here.",
    iconName: "BookOpen",
    isCert: true,
  },
];

export const CERTIFICATES: CertificateItem[] = [
  {
    id: "cert-1",
    title: "BSIT Seminar-Workshop 2026: Certificate of Participation",
    theme: "CODE + COMMUNICATE: IT HARD SKILLS AND SOFT SKILLS THAT INDUSTRY DEMANDS",
    issuer: "Torres Capitol College, Inc.",
    subIssuer: "BSIT Department (Formerly: Philippine Countryville College, Inc.)",
    recipient: "BRETAÑA, JOHN MICHAEL D.",
    date: "April 29, 2026",
    location: "TCC Covered Court, Panadtalan, Maramag, Bukidnon",
    image: "/certificates/certificate-1.webp",
    signatories: [
      "April Jean D. Villas (BSIT Program Head)",
      "Feelin Torres-Jumamil, DM, RN (College President)",
    ],
    skills: ["Industry Hard Skills", "Soft Skills", "Technical Communication", "BSIT Readiness"],
  },
  {
    id: "cert-2",
    title: "ICT Days 2026: Certificate of Participation",
    theme: "Create. Compete. Celebrate.",
    issuer: "Torres Capitol College, Inc.",
    subIssuer: "School of Information Technology",
    recipient: "BRETAÑA, JOHN MICHAEL D.",
    date: "February 24, 25, and 26, 2026",
    location: "Torres Capitol College, Inc., Maramag, Bukidnon",
    image: "/certificates/certificate-2.webp",
    signatories: [
      "April Jean D. Villas (BSIT Program Head)",
      "Feelin Torres-Jumamil, DM, RN (College President)",
    ],
    skills: ["ICT Innovation", "Competitive Programming", "Excellence in IT"],
  },
  {
    id: "cert-3",
    title: "BSIT Seminar-Workshop: Digital Danger Zone",
    theme: "Digital Danger Zone: Protecting Yourself in the Age of Digital Deception",
    issuer: "Philippine Countryville College, Inc.",
    subIssuer: "In coordination with DICT Region 10",
    recipient: "John Michael D. Bretana",
    date: "Seminar-Workshop",
    location: "College Library, 2nd Floor, Admin Bldg., PCCI, Maramag, Bukidnon",
    image: "/certificates/certificate-3.webp",
    signatories: [
      "Keren Happuch Lacadin (Project Lead - DICT Region 10)",
      "April Jean D. Villas (BSIT Program Head)",
      "Feelin T. Jumamil, DM, MAN, RN (VP for Administration)",
      "Gordon M. Torres, EDL (College President)",
      "Fe A. Torres, PhD (Executive Vice President)",
    ],
    skills: ["Cybersecurity", "DICT Region 10 Standards", "Digital Safety & Privacy"],
  },
];

export const certificates = CERTIFICATES;
export const projects = PROJECTS;
export const techSkills: any[] = [];

export const REFERENCES: ReferenceItem[] = [
  {
    id: "ref-1",
    name: "Jessiemae C. Jusayan",
    role: "Character Reference",
    relationship: "Professional & Personal Reference",
    contact: "09971365037",
    type: "phone",
  },
  {
    id: "ref-2",
    name: "David Mark Ybañez",
    role: "Character Reference",
    relationship: "Professional Reference",
    contact: "090264662436",
    type: "phone",
  },
  {
    id: "ref-3",
    name: "April Jean Villas",
    role: "BSIT Program Head",
    institution: "Torres Capitol College, Inc.",
    relationship: "Academic Department Head & Mentor",
    contact: "09760237827",
    type: "phone",
  },
  {
    id: "ref-4",
    name: "Wilfredo Villas",
    role: "Academic Reference",
    relationship: "Academic & Character Mentor",
    contact: "sirvils12345@gmail.com",
    type: "email",
  },
];


