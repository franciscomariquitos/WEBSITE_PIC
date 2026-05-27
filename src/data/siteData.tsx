import {
  Activity,
  CheckCircle2,
  Cpu,
  Globe,
  MapPinned,
  Radio,
  ShieldAlert,
  Smartphone,
  Sparkles,
} from "lucide-react";

export const colors = {
  bg: "#020326",
  bg2: "#050816",
  blue: "#031B70",
  indigo: "#2F2C8F",
  cyan: "#1C7CC7",
  cyan2: "#5FA9E8",
  text: "#E0E4E9",
  muted: "#A8B0BE",
  border: "rgba(255,255,255,0.10)",
};

export const sectionIds = {
  About: "about",
  "How it works": "ecosystem",
  Tracker: "tracker",
  Partners: "partners",
  Team: "team",
  Blog: "updates",
  Contact: "contact",
};

export const siteData = {
  project: {
    name: "NAVISense Vest",
    heroLines: [
      "NAVISense Vest:",
      "Intelligent Multisensory",
      "Assistive Vest for Safe",
      "Navigation and Awareness",
    ],
    subtitle:
      "A connected assistive vest that senses the environment, guides movement through haptic feedback, and links critical status to NaviCare monitoring.",
    email: "",
    linkedin: "",
    acknowledgements: "Instituto Superior Tecnico - Student Innovation Project",
  },
  nav: ["About", "How it works", "Tracker", "Partners", "Team", "Blog", "Contact"],
  ecosystem: [
    {
      icon: Radio,
      title: "Vest senses the environment",
      desc: "Depth sensing and embedded electronics interpret nearby obstacles and movement context.",
    },
    {
      icon: Activity,
      title: "Haptic feedback guides movement",
      desc: "Directional vibration cues help the user react without relying on visual information.",
    },
    {
      icon: Smartphone,
      title: "Android app bridges location/status",
      desc: "The phone contributes location and passes vest state into the shared data layer.",
    },
    {
      icon: ShieldAlert,
      title: "NaviCare monitors critical states",
      desc: "The dashboard surfaces connection, location, and emergency state for remote awareness.",
    },
  ],
  about: {
    problem:
      "People with visual impairments and reduced mobility often navigate complex environments with too little feedback, increasing collisions, disorientation, and loss of autonomy.",
    importance:
      "NAVISense addresses this gap with a wearable system focused on safer movement, better situational awareness, and more confidence in everyday mobility.",
    vision:
      "The long-term vision extends beyond accessibility into industrial safety, emergency response, and remote monitoring.",
    beneficiaries: [
      {
        title: "Visual Impairment",
        desc: "Obstacle awareness and greater day-to-day independence.",
      },
      {
        title: "Older Adults",
        desc: "Better orientation, confidence, and reduced fall risk.",
      },
      {
        title: "Industrial Safety",
        desc: "Support in low-visibility or hazardous work settings.",
      },
      {
        title: "Emergency Teams",
        desc: "Improved spatial awareness in urgent field operations.",
      },
    ],
  },
  features: [
    {
      icon: Radio,
      title: "Depth Sensing",
      desc: "Nearby-object detection and spatial distance estimation for real-time awareness.",
    },
    {
      icon: Sparkles,
      title: "Haptic Feedback",
      desc: "Vibration-based directional cues that inform the user without overloading attention.",
    },
    {
      icon: MapPinned,
      title: "GPS Tracking",
      desc: "Real-time localization and route-awareness capabilities for monitored navigation.",
    },
    {
      icon: Cpu,
      title: "Embedded Processing",
      desc: "ESP32, Raspberry Pi, and auxiliary electronics for sensing, control, and communications.",
    },
    {
      icon: Globe,
      title: "Connected Monitoring",
      desc: "Vest-to-phone-to-dashboard architecture for remote visibility and live updates.",
    },
    {
      icon: CheckCircle2,
      title: "Validation Focus",
      desc: "Structured testing around accuracy, latency, reliability, power, and overall system stability.",
    },
  ],
  innovationPoints: [
    "Low-cost multisensory wearable architecture",
    "Remote live dashboard and telemetry potential",
    "Expandable use cases across accessibility and safety",
    "Practical engineering focus on latency, power, and reliability",
  ],
  partners: [
    {
      name: "Instituto Superior Tecnico",
      type: "Institutional Partner",
      desc: "Academic context, project structure, and presentation support for the development path.",
      logo: "IST",
    },
    {
      name: "Bengala Magica",
      type: "Technical Partner",
      desc: "Accessibility-focused perspective and feedback grounded in real mobility needs.",
      logo: "BM",
    },
  ],
  updates: [
    {
      title: "Hello world - The Brainstorming",
      date: "2026-02-15",
      category: "Planning",
      summary:
        "Our team refined the initial idea into a clearer prototype concept, defined the main objectives, received feedback from Professor Francisco Alegria, assigned team roles, and began researching the components and materials needed for development.",
      content:
        "This first stage helped transform the initial NAVISense concept into a more concrete development plan. We met as a team to discuss what the project could become, sketching the first ideas for the prototype and identifying which functionalities mattered most.\n\nWe also discussed how those ideas could be achieved with the technology available to us, from sensors and communication links to the general structure of the system. Roles were assigned to each team member, but we agreed that the project should remain collaborative, with everyone able to contribute beyond their assigned area.\n\nBeyond the functional side, we also started defining how NAVISense should be presented. We identified the pitch deck, website, and poster as key communication materials, and agreed that they should share the same visual identity so the project would feel coherent both technically and visually.",
      author: "Team NAVISense",
      reportPdfUrl: "reports/PIC_reports.pdf",
      reportAvailable: true,
    },
    {
      title: "Partnerships & Technical Development",
      date: "2026-02-22",
      category: "Partnerships",
      summary:
        "The team established a clearer project timeline with key milestones for development and testing. We also began building the project website, continued refining the prototype architecture, and started preparing the project proposal.",
      content:
        "With the first concept defined, we started organizing the next development steps around key milestones, including prototype work, testing, website and dashboard development, and proposal preparation. This gave the project a clearer rhythm: each team member now had more concrete tasks and objectives, helping us connect technical planning with communication, outreach, and documentation.",
      author: "Francisco",
      reportPdfUrl: "reports/PIC_reports.pdf",
      reportAvailable: true,
    },
    {
      title: "Project Proposal",
      date: "2026-03-01",
      category: "Planning",
      summary:
        "The team finalized and submitted the project proposal. We also reviewed and consolidated the research conducted by different team members, which helped clarify several technical aspects and potential design directions for the prototype.",
      content:
        "The proposal submission brought together the research carried out by the group and turned it into a more structured project direction. While preparing it, we revisited some aspects of the initial idea and refined the objectives so they better matched the work we wanted to develop. This helped us define clearer technical goals, prototype constraints, and possible design paths for the following stages.",
      author: "Tiago",
      reportPdfUrl: "reports/PIC_reports.pdf",
      reportAvailable: true,
    },
    {
      title: "Website Launch",
      date: "2026-03-03",
      category: "Design",
      summary:
        "We successfully launched the project website and blog, establishing the base platform to present the project and share development updates.",
      content:
        "The website launch created a public space for NAVISense, bringing together the project presentation, team information, blog updates, and access to the project proposal. At this stage, the website was still in an early version: a bit rushed visually, but already functional for the basic needs of the project.\n\nBesides presenting the project, the website also gave us a way to monitor public interest through Google Analytics, helping us understand the visit flow and how people were reaching the page. We also discussed that, in the future, the website could become more than a landing page. It could act as a functional node in the NAVISense system, connecting the public presentation of the project with real system data and monitoring features.",
      author: "Daniel",
      reportPdfUrl: "reports/PIC_reports.pdf",
      reportAvailable: true,
    },
    {
      title: "Bengala Magica Partnership Initiated",
      date: "2026-03-14",
      category: "Partnerships",
      summary:
        "The team had a meeting with Bengala Magica, during which we received valuable feedback and suggestions that helped us further improve and refine our prototype.",
      content:
        "The discussion with Bengala Magica brought an accessibility-focused perspective into the project. Their feedback was especially important because it showed us that our initial direction needed to change. At first, we imagined NAVISense as a possible replacement for existing solutions used by visually impaired people, assuming that many alternatives were avoided mainly because they were too expensive.\n\nDuring the discussion, we understood that the issue was more complex. Similar products were often rejected not only because of cost, but because they were not practical enough for everyday use. Even with advanced features, they could not fully replace the simplicity, reliability, and familiarity of a cane.\n\nThis led us to an important conclusion: NAVISense should not try to replace existing tools, but work as an additional support system. From that point on, we started thinking of the vest as something that could complement the user's current navigation methods rather than compete with them.",
      author: "Francisco",
      reportPdfUrl: "reports/PIC_reports.pdf",
      reportAvailable: true,
    },
    {
      title: "First version of the mobile app launched",
      date: "2026-03-17",
      category: "Development",
      summary:
        "The team launched the first version of the mobile app designed to connect to the NAVISense Vest and send data across other devices.",
      content:
        "This first mobile app version marked an important step in the communication flow between the vest and the rest of the system. It established the base for sending data from the NAVISense Vest to other connected devices and services.\n\nAt this stage, our understanding of what the app should monitor was still evolving, but we were already certain that location and biometric data would be essential. These features could support faster response from an assisting person or team, both for users who may require direct help and for performance-focused contexts such as firefighters or other emergency workers.\n\nMe and Daniel also discussed the possibility of connecting the app to the website in the future, creating a clearer communication path between the user and the monitoring side of the system. We agreed that the app should be operated by the vest user, while monitoring should remain inherently remote.",
      author: "Frederico",
      reportPdfUrl: "reports/PIC_reports.pdf",
      reportAvailable: true,
    },
    {
      title: "Prototype Materials Selection and BOM Finalization",
      date: "2026-03-24",
      category: "Prototype",
      summary:
        "The team selected the materials for the prototype and finalized the Bill of Materials, defining the main components required for the next development stage.",
      content:
        "By closing the materials selection and Bill of Materials, we established the main hardware requirements for the prototype. This helped align sensor choice, vest design, and upcoming construction work.\n\nOur main goal was to find a balance between quality, reliability, and cost. Even though we had learned that cost was not the only reason similar solutions struggled to be adopted, we still believed that NAVISense should remain as accessible as possible. For us, the prototype needed to be technically useful without becoming a product that only a small group of people could realistically afford.",
      author: "Raquel",
      reportPdfUrl: "reports/PIC_reports.pdf",
      reportAvailable: true,
    },
    {
      title: "Intermediate Project Presentation",
      date: "2026-03-31",
      category: "Presentation",
      summary:
        "The team prepared and submitted the intermediate project presentation, summarizing the work developed and the progress achieved up to that stage of the project.",
      content:
        "The intermediate presentation was used to communicate the project's progress, explain the decisions already made, and organize the next phase of work. During its preparation, we reviewed what still needed to be improved before moving into the final development stage, especially as the first materials were close to arriving.\n\nThis was also an important management moment for us. Since efficient prototype development depends on timing, coordination, and clear priorities, preparing the presentation helped us better understand what needed to be ready before construction could properly begin.",
      author: "Tiago",
      reportPdfUrl: "reports/PIC_reports.pdf",
      reportAvailable: true,
    },
    {
      title: "Website Migration to Vite",
      date: "2026-04-12",
      category: "Design",
      summary:
        "The project website was completely restructured, moving away from Hugo and into a custom Vite-based development workflow.",
      content:
        "This update marked a major change in the website's structure and development approach. Instead of continuing with Hugo, we decided to rebuild the website using Vite, which gave us more freedom to shape the interface, animations, components, and future integrations with the rest of the NAVISense system.\n\nThe main reason for this transition was that the website was no longer meant to be only a static project page. As our ideas evolved, we needed a more flexible environment where we could quickly test visual changes, adjust the layout, and develop interactive elements without feeling limited by the structure of the platform. Vite also made the development process smoother, allowing us to see changes almost immediately while working, instead of constantly rebuilding the application.",
      author: "Daniel",
      reportPdfUrl: "reports/PIC_reports.pdf",
      reportAvailable: true,
    },
    {
      title: "Arrival of Initial Components and Prototype Construction Start",
      date: "2026-04-21",
      category: "Prototype",
      summary:
        "The first project components and materials were received, marking the beginning of the prototype construction and hardware integration phase.",
      content:
        "Receiving the first components allowed the team to move from planning into physical construction. This stage began the practical integration of the selected materials, electronics, and vest structure.\n\nAlthough not all expected materials had arrived yet, this did not stop us from starting the basic elements needed for future vest construction and integration. Even with partial resources, the team was able to begin testing how the first components could fit into the physical structure of the prototype.",
      author: "Francisco",
      reportPdfUrl: "reports/PIC_reports.pdf",
      reportAvailable: true,
    },
    {
      title: "Project Presentation to other groups",
      date: "2026-04-30",
      category: "Presentation",
      summary:
        "The team prepared and delivered an intermediate project presentation to the other groups, showcasing the progress achieved up to that stage of the project.",
      content:
        "This presentation gave the team another opportunity to explain NAVISense, share the current prototype progress, and receive reactions from peers working on other projects. It also allowed us to compare our approach with other teams, discuss the choices and solutions we had made, and gather new ideas for future improvements.",
      author: "Tiago",
      reportPdfUrl: "reports/PIC_reports.pdf",
      reportAvailable: true,
    },
    {
      title: "Bluetooth, 4G and database integration",
      date: "2026-05-07",
      category: "Integration",
      summary:
        "The team integrated Bluetooth communication, 4G connectivity, and database support, enabling the prototype to transmit, store, and manage data.",
      content:
        "This integration connected several important technical layers of the system: local Bluetooth communication, 4G connectivity, and database support. Together, these elements allowed the prototype to move data through the NAVISense ecosystem more reliably.\n\nThe next logical step was to connect the website to this ecosystem as well. Our goal was for the website to read from the shared database, allowing it to display relevant information from the system and become part of the communication flow rather than remaining only a presentation page.",
      author: "Francisco and Frederico",
      reportPdfUrl: "reports/PIC_reports.pdf",
      reportAvailable: true,
    },
    {
      title: "NaviCare Development",
      date: "2026-05-15",
      category: "Development",
      summary:
        "The team developed NaviCare as the functional link between the website and the rest of the NAVISense system.",
      content:
        "NaviCare expanded the website beyond a project presentation platform by connecting it to the system's live data flow. This work created the base for monitoring vest status, location, and connectivity through the website, helping bridge the prototype, mobile app, database, and dashboard into one functional ecosystem.",
      author: "Daniel and Frederico",
      reportPdfUrl: "reports/PIC_reports.pdf",
      reportAvailable: true,
    },
  ],
  tracker: [
    {
      title: "Website and Blog Launch",
      owner: "Daniel",
      priority: "Medium",
      status: "Done",
      due: "2026-02-15",
      progress: 100,
    },
    {
      title: "Prototype Materials List",
      owner: "Team",
      priority: "High",
      status: "Done",
      due: "2026-03-01",
      progress: 100,
    },
    {
      title: "Prototype Development",
      owner: "Engineering",
      priority: "High",
      status: "Done",
      due: "2026-04-12",
      progress: 100,
    },
    {
      title: "Prototype Testing",
      owner: "Validation",
      priority: "High",
      status: "In Progress",
      due: "2026-05-24",
      progress: 72,
    },
    {
      title: "Poster Design",
      owner: "Tiago",
      priority: "Medium",
      status: "In Progress",
      due: "2026-05-24",
      progress: 55,
    },
    {
      title: "Demonstration Video",
      owner: "David",
      priority: "Medium",
      status: "In Progress",
      due: "2026-05-31",
      progress: 42,
    },
  ],
  roadmap: [
    {
      phase: "Phase 01",
      title: "Foundation",
      period: "February",
      state: "complete",
      desc: "Website, blog structure, materials planning, and initial framing.",
    },
    {
      phase: "Phase 02",
      title: "Build",
      period: "March-April",
      state: "complete",
      desc: "Prototype development, subsystem integration, and communications setup.",
    },
    {
      phase: "Phase 03",
      title: "Validate",
      period: "May",
      state: "current",
      desc: "Prototype testing, latency measurements, reliability checks, and system refinement.",
    },
    {
      phase: "Phase 04",
      title: "Showcase",
      period: "Late May-June",
      state: "upcoming",
      desc: "Poster, demonstration video, final validation, and public presentation.",
    },
  ],
  team: [
    {
      name: "Francisco Mariquitos",
      role: "4G Integration, Public Relations and Data Transmission",
      initials: "FM",
      cv: "#",
      email: "",
      linkedin: "#",
    },
    {
      name: "Raquel Barroso",
      role: "Vest Design, Sensor Choice and Sensor Position",
      initials: "RB",
      cv: "#",
      email: "",
      linkedin: "#",
    },
    {
      name: "Daniel Khom'yak",
      role: "Website Design, Dashboard Design and Dashboard Elements",
      initials: "DK",
      cv: "#",
      email: "",
      linkedin: "#",
    },
    {
      name: "David Reimer",
      role: "Demonstration Video, Data Transmission and Data Acquisition",
      initials: "DR",
      cv: "#",
      email: "",
      linkedin: "#",
    },
    {
      name: "Tiago Pinto",
      role: "Pitch Deck, Vest Design and Poster Design",
      initials: "TP",
      cv: "#",
      email: "",
      linkedin: "#",
    },
    {
      name: "Frederico Pinto",
      role: "Dashboard Programming, Dashboard Design and Dashboard Elements",
      initials: "FP",
      cv: "#",
      email: "",
      linkedin: "#",
    },
  ],
};
