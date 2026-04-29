import {
  CheckCircle2,
  Cpu,
  Globe,
  MapPinned,
  Radio,
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
  Partners: "partners",
  Blog: "updates",
  Tracker: "tracker",
  Team: "team",
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
      "A multisensory assistive vest combining spatial sensing, haptic feedback, and connected monitoring for safer navigation.",
    email: "team@navisense.example",
    linkedin: "",
    acknowledgements: "Instituto Superior Tecnico - Student Innovation Project",
  },
  nav: ["About", "Team", "Partners", "Tracker", "Blog", "Contact"],
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
      desc: "Short description or role in the project.",
      logo: "PN",
    },
    {
      name: "Bengala Magica",
      type: "Technical Partner",
      desc: "Short description or role in the project.",
      logo: "TP",
    },
    {
      name: "Partner Name",
      type: "Community Partner",
      desc: "Short description or role in the project.",
      logo: "CP",
    },
    {
      name: "Partner Name",
      type: "Support Partner",
      desc: "Short description or role in the project.",
      logo: "SP",
    },
  ],
  updates: [
    {
      title: "Bengala Magica Partnership Initiated",
      date: "2026-03-14",
      category: "Partnerships",
      summary: "We began our partnership discussions with Bengala Magica.",
      content:
        "We successfully contacted and organized a meeting with the Bengala Magica association. We look forward to seeing the results of this collaboration. On the downside, we still have not been able to successfully contact any firefighters for collaboration.",
      author: "Francisco",
      reportPdfUrl: "reports/bengala-magica-partnership.pdf",
      reportAvailable: false,
    },
    {
      title: "Supabase Integration for Shared Data",
      date: "2026-03-14",
      category: "Design",
      summary:
        "We chose Supabase as a simple, effective solution for sharing data between the website and app, meeting all our project requirements.",
      content:
        "After discussing with Daniel, I searched for a simple solution to create and manage a shared database for both the website and my app. I discovered Supabase, which meets all our needs: it allows easy database setup through its web interface and provides an HTTPS API for communication and management. This means we can use standard GET and POST requests for data exchange. The free tier is more than sufficient for our requirements, making it an ideal choice for our project.",
      author: "Frederico",
      reportPdfUrl: "reports/supabase-integration.pdf",
      reportAvailable: false,
    },
    {
      title: "Website and Blog Launch",
      date: "2026-02-10",
      category: "Design",
      summary:
        "Today we launch our website. At the moment, it is quite simple, containing only the general structure for future development.",
      content:
        "We designed our website to be the landing page for the project, featuring sections for project presentation, overall specifications, and team introduction. We have also created a blog system so visitors can follow the chronological development of the project. Additionally, we integrated Google Analytics to help our team monitor website access frequency. The website still feels raw, but the foundation is now in place.",
      author: "Daniel",
      reportPdfUrl: "reports/website-launch.pdf",
      reportAvailable: false,
    },
    {
      title: "Prototype Development Started",
      date: "2026-03-03",
      category: "Development",
      summary:
        "First hardware and integration work for the vest architecture began.",
      content:
        "We started putting together the actual prototype! We began by selecting sensors based on functionality and available budget. We also started planning the data flow throughout the system, focusing more on vest-to-app communication.",
      author: "Francisco",
      reportPdfUrl: "reports/prototype-development.pdf",
      reportAvailable: false,
    },
    {
      title: "Website Improvements and System Requirements",
      date: "2026-03-09",
      category: "Development",
      summary:
        "The website design was updated to be more engaging and interesting. We began effective dashboard development and improved the overall project based on insights gained from a seminar.",
      content:
        "After comparing our website to real-world projects, I decided to update its visual appeal for greater engagement. Frederico and I discussed the communication between the website and the app, agreeing on using a shared database. We also reached out to organizations focused on visual impairment for feedback, and attempted to contact firefighters to improve the NAVISense vest performance aspect, though we have not received a response yet.",
      author: "Daniel",
      reportPdfUrl: "reports/website-improvements.pdf",
      reportAvailable: false,
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
      status: "In Progress",
      due: "2026-04-12",
      progress: 62,
    },
    {
      title: "Prototype Testing",
      owner: "Validation",
      priority: "High",
      status: "In Progress",
      due: "2026-05-05",
      progress: 34,
    },
    {
      title: "Poster Design",
      owner: "Tiago",
      priority: "Medium",
      status: "To Do",
      due: "2026-05-18",
      progress: 10,
    },
    {
      title: "Demonstration Video",
      owner: "David",
      priority: "Medium",
      status: "Delayed",
      due: "2026-05-25",
      progress: 20,
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
      state: "current",
      desc: "Prototype development, subsystem integration, and communications setup.",
    },
    {
      phase: "Phase 03",
      title: "Validate",
      period: "April-May",
      state: "upcoming",
      desc: "Range testing, latency measurements, reliability checks, and system refinement.",
    },
    {
      phase: "Phase 04",
      title: "Showcase",
      period: "May-June",
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
      email: "francisco@example.com",
      linkedin: "#",
    },
    {
      name: "Raquel Barroso",
      role: "Vest Design, Sensor Choice and Sensor Position",
      initials: "RB",
      cv: "#",
      email: "raquel@example.com",
      linkedin: "#",
    },
    {
      name: "Daniel Khom'yak",
      role: "Website Design, Dashboard Design and Dashboard Elements",
      initials: "DK",
      cv: "#",
      email: "daniel@example.com",
      linkedin: "#",
    },
    {
      name: "David Reimer",
      role: "Demonstration Video, Data Transmission and Data Acquisition",
      initials: "DR",
      cv: "#",
      email: "david@example.com",
      linkedin: "#",
    },
    {
      name: "Tiago Pinto",
      role: "Pitch Deck, Vest Design and Poster Design",
      initials: "TP",
      cv: "#",
      email: "tiago@example.com",
      linkedin: "#",
    },
    {
      name: "Frederico Pinto",
      role: "Dashboard Programming, Dashboard Design and Dashboard Elements",
      initials: "FP",
      cv: "#",
      email: "frederico@example.com",
      linkedin: "#",
    },
  ],
};
