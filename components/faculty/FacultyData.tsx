import {
  BookMarked,
  Cpu,
  Network,
  Database,
  BrainCircuit,
  Lock,
  ImageIcon,
  Wifi,
  Zap,
  Cloud,
  LineChart,
  Eye,
  Fingerprint,
  Calendar,
  FileText,
  User,
} from "lucide-react"
import React from "react"

export interface Faculty {
  id: number;
  name: string;
  position: string;
  image: string;
  interests: string[];
  email: string;
  phone: string;
  office: string;
  education: { degree: string; university: string; year: string }[];
  publications: number;
  projects: number;
  students: number;
  courses: string[];
  socialLinks: { linkedin: string; github: string; website: string };
  interestIcons: { icon: string; component: any }[];
  stream: string;
  pic: string | null;
}

export let facultyData: Faculty[] = [];
const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

export const fetchFacultyData = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/faculty`, {
      cache: "no-store" // ensures fresh data if needed
    });

    if (!response.ok) throw new Error("Failed to fetch faculty data");

    const rawData = await response.json();
    if (!rawData.status) throw new Error("API returned error status");

    facultyData = transformFacultyData(rawData.faculty || []);
    return facultyData;

  } catch (error) {
    console.error("Error fetching faculty data:", error);
    return [];
  }
};
// Fetch and transform faculty data
//export const fetchFacultyData = async () => {
//  try {
  //  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
   // const response = await fetch(`${baseUrl}/api/faculty`);
   // if (!response.ok) throw new Error("Failed to fetch faculty data");
   // const rawData = await response.json();
    //if (!rawData.status) throw new Error("API returned error status");
    //facultyData = transformFacultyData(rawData.faculty || []);
    //return facultyData;
  //} catch (error) {
    //console.error("Error fetching faculty data:", error);
    //return [];
  //}
//};

const transformFacultyData = (rawFaculty: any[]): Faculty[] => {
  return rawFaculty.map((item: any, index: number) => {
    // Parse research interests from schoolName1 (which contains interests)
    const parsedCourses = item.schoolName1
      ? item.schoolName1.split("\r\n").map((i: string) => i.trim()).filter(Boolean)
      : [];
      
    // Special handling for Dr. Noor Mahammad - remove "Visit" from research interests
    let cleanedInterests = parsedCourses;
    if (item.nickname && (
        item.nickname.toLowerCase().includes("noor mahammad") || 
        item.nickname.toLowerCase().includes("dr. noor") || 
        item.nickname.toLowerCase().includes("dr noor")
      )) {
      cleanedInterests = parsedCourses.map((interest: string) => 
        interest.replace(/\bVisit\b/g, "").trim()
      );
    }

    return {
      id: index + 1,
      name: item.nickname || "Unknown",
      position: item.desig || "Faculty",
      image: item.localimg ? `http://mis.iiitdm.ac.in/Profile/images/Profile/${item.localimg}` : "/placeholder.svg?height=300&width=300",
      interests: cleanedInterests,
      email: item.email || "unknown@example.com",
      phone: item.schoolFrom || "+91-XXXXXXXXXX",
      office: item.schoolTo || "Unknown Room",
      education: [
        { degree: "Ph.D", university: item.dschoolName || "Unknown", year: "----" },
        { degree: "M.Tech", university: "Unknown", year: "----" },
        { degree: "B.Tech", university: "Unknown", year: "----" },
      ],
      publications: 0,
      projects: 0,
      students: 0,
      courses: cleanedInterests,
      socialLinks: {
        linkedin: "https://linkedin.com/in/",
        github: "https://github.com/",
        website: "https://example.com/",
      },
      interestIcons: [
        { icon: "lock", component: Lock },
        { icon: "file", component: FileText },
        { icon: "book", component: BookMarked },
      ],
      stream: item.stream || "Unknown",
      pic: item.pic || null,
    };
  });
};

(async () => {
  await fetchFacultyData();
})();

export const researchAreas = [
  { name: "All Areas", value: "all", icon: null },
  { name: "Machine Learning & AI", value: "Machine Learning", icon: BrainCircuit },
  { name: "Computer Vision & Image Processing", value: "Image Processing", icon: Eye },
  { name: "Networks & IoT", value: "Networks", icon: Network },
  { name: "Security & Cryptography", value: "Security", icon: Lock },
  { name: "Data Science & Analytics", value: "Data", icon: Database },
  { name: "Computer Architecture", value: "Computer Architecture", icon: Cpu },
  { name: "Algorithms & Theory", value: "Algorithms", icon: FileText },
  { name: "Human-Computer Interaction", value: "Human Computer Interaction", icon: User },
  { name: "Cloud Computing", value: "Cloud Computing", icon: Cloud },
];

export const positions = [
  { name: "All Positions", value: "all" },
  { name: "Professor", value: "Professor" },
  { name: "Associate Professor", value: "Associate Professor" },
  { name: "Assistant Professor", value: "Assistant Professor" },
  { name: "Adjunct Faculty", value: "Adjunct Faculty" },
  { name: "Professor of Practice", value: "Professor of Practice" },
];

export const getIconByKey = (key: string | undefined | null, className = "w-5 h-5") => {
  if (!key || typeof key !== 'string') {
    return <FileText className={className} />;
  }

  switch (key.toLowerCase()) {
    case "lock":
      return <Lock className={className} />;
    case "file":
      return <FileText className={className} />;
    case "book":
      return <BookMarked className={className} />;
    case "cpu":
      return <Cpu className={className} />;
    case "database":
      return <Database className={className} />;
    case "brain":
      return <BrainCircuit className={className} />;
    case "image":
      return <ImageIcon className={className} />;
    case "network":
      return <Network className={className} />;
    case "wifi":
      return <Wifi className={className} />;
    case "calendar":
      return <Calendar className={className} />;
    case "zap":
      return <Zap className={className} />;
    case "chart":
      return <LineChart className={className} />;
    case "user":
      return <User className={className} />;
    case "cloud":
      return <Cloud className={className} />;
    case "eye":
      return <Eye className={className} />;
    case "fingerprint":
      return <Fingerprint className={className} />;
    default:
      return <FileText className={className} />;
  }
};

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}