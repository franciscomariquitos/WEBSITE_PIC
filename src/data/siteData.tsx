import {
  CheckCircle2,
  Cpu,
  Globe,
  MapPinned,
  Radio,
  Sparkles,
} from "lucide-react";


import blog_img1 from "../assets/blog_img_1.jpg";
import blog_img2 from "../assets/blog_img_2.jpg";
import blog_img3 from "../assets/blog_img_3.jpg"
import blog_img4 from "../assets/blog_img_4.png"

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
  Solution: "solution",
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
      "A wearable multisensory system designed to improve safe navigation, spatial awareness, and independent mobility through sensing, haptic feedback, and connected monitoring.",
    email: "team@navisense.example",
    acknowledgements: "Instituto Superior Técnico · Student Innovation Project",
  },
  nav: ["About", "Solution", "Team", "Partners", "Tracker", "Blog", "Contact"],
  about: {
    problem:
      "People with visual impairments and reduced mobility face persistent navigation challenges in complex environments, where limited environmental feedback can increase the risk of collisions, disorientation, and reduced autonomy.",
    importance:
      "NAVISense addresses this gap with a wearable assistance system designed to improve safety, situational awareness, and confidence in daily movement.",
    vision:
      "The long-term vision extends beyond accessibility into industrial safety, emergency response, and remote monitoring scenarios, positioning the vest as a scalable human-centered assistive platform.",
    beneficiaries: [
      { title: "Visual Impairment", desc: "Safer obstacle awareness and improved day-to-day independence." },
      { title: "Older Adults", desc: "Support for orientation, confidence, and fall-risk reduction." },
      { title: "Industrial Safety", desc: "Assistance in low-visibility or hazardous work settings." },
      { title: "Emergency Teams", desc: "Enhanced spatial awareness during urgent field operations." },
    ],
  },
  features: [
    { icon: Radio, title: "Depth Sensing", desc: "Nearby-object detection and spatial distance estimation for real-time awareness." },
    { icon: Sparkles, title: "Haptic Feedback", desc: "Vibration-based directional cues that inform the user without overloading attention." },
    { icon: MapPinned, title: "GPS Tracking", desc: "Real-time localization and route-awareness capabilities for monitored navigation." },
    { icon: Cpu, title: "Embedded Processing", desc: "ESP32, Raspberry Pi, and auxiliary electronics for sensing, control, and communications." },
    { icon: Globe, title: "Connected Monitoring", desc: "Vest-to-phone-to-dashboard architecture for remote visibility and live updates." },
    { icon: CheckCircle2, title: "Validation Focus", desc: "Structured testing around accuracy, latency, reliability, power, and overall system stability." },
  ],
  innovationPoints: [
    "Low-cost multisensory wearable architecture",
    "Remote live dashboard and telemetry potential",
    "Expandable use cases across accessibility and safety",
    "Practical engineering focus on latency, power, and reliability",
  ],
  partners: [
    { name: "Instituto Superior Técnico", type: "Institutional Partner", desc: "Short description or role in the project.", logo: "PN" },
    { name: "Bengala Mágica", type: "Technical Partner", desc: "Short description or role in the project.", logo: "TP" },
    { name: "Partner Name", type: "Community Partner", desc: "Short description or role in the project.", logo: "CP" },
    { name: "Partner Name", type: "Support Partner", desc: "Short description or role in the project.", logo: "SP" },
  ],

  //BLOG UPDATES
  updates: [
    {
      title: "Website and Blog Launch",
      date: "2026-02-10",
      category: "Design",
      summary: "Initial launch of the public-facing project website, branding system, and weekly update structure.",
      content: "We got the website live this week! Spent time setting up the whole visual identity and making sure everything aligns with our pitch deck. Also built a clean system for sharing weekly updates so you can follow our progress.",
    },
    {
      title: "Prototype Development Started",
      date: "2026-03-03",
      category: "Development",
      summary: "First hardware and integration work for the vest architecture began.",
      content: "Things are getting real! The team started putting together the actual prototype—picking sensors, figuring out how everything talks to each other, and planning out how data flows through the system. Exciting stuff.",
    },
    {
      title: "Website Improvements & System Requirements",
      date: "2026-03-09",
      category: "Development",
      summary:"The team reorganized the website, defined requirements, engaged with users, started the dashboard, and gained insights from a seminar.",
      content:"Been a productive week! We revamped the website, nailed down our system requirements, and reached out to some organizations focused on visual impairment to really understand what people need. Also kicked off work on the dashboard for monitoring everything. We picked up some solid insights at a seminar too.",
    },
    {
      title: "Testing Pipeline Definition",
      date: "2026-04-01",
      category: "Testing",
      summary: "Validation metrics were organized around sensing, communication, power, and reliability.",
      content: "We put together a solid testing plan this week. We're checking obstacle detection range, transmission speed, update frequency, packet loss, how hot things get, and basically making sure the whole system is solid and reliable.",
    },

  ],
  tracker: [
    { title: "Website and Blog Launch", owner: "Daniel", priority: "Medium", status: "Done", due: "2026-02-15", progress: 100 },
    { title: "Prototype Materials List", owner: "Team", priority: "High", status: "Done", due: "2026-03-01", progress: 100 },
    { title: "Prototype Development", owner: "Engineering", priority: "High", status: "In Progress", due: "2026-04-12", progress: 62 },
    { title: "Prototype Testing", owner: "Validation", priority: "High", status: "In Progress", due: "2026-05-05", progress: 34 },
    { title: "Poster Design", owner: "Tiago", priority: "Medium", status: "To Do", due: "2026-05-18", progress: 10 },
    { title: "Demonstration Video", owner: "David", priority: "Medium", status: "Delayed", due: "2026-05-25", progress: 20 },
  ],
  roadmap: [
    { phase: "Phase 01", title: "Foundation", period: "February", state: "complete", desc: "Website, blog structure, materials planning, and initial framing." },
    { phase: "Phase 02", title: "Build", period: "March–April", state: "current", desc: "Prototype development, subsystem integration, and communications setup." },
    { phase: "Phase 03", title: "Validate", period: "April–May", state: "upcoming", desc: "Range testing, latency measurements, reliability checks, and system refinement." },
    { phase: "Phase 04", title: "Showcase", period: "May–June", state: "upcoming", desc: "Poster, demonstration video, final validation, and public presentation." },
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
