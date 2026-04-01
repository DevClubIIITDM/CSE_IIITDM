"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  GraduationCap,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Cpu,
  Database,
  Network,
  Code,
  BotIcon as Robot,
  Cloud,
  CircuitBoardIcon as Circuit,
  Laptop,
  MicroscopeIcon as Microchip,
  Users,
  Award,
} from "lucide-react"
import NewsTicker from "@/components/NewsTicker"
import Header from "@/components/Header"
import SidebarNews from "@/components/SidebarNews"
import HeroSection from "@/components/HeroSection"
import ProgramsOffered from "@/components/ProgramsOffered"
import Laboratories from "@/components/Laboratories"
import DepartmentStats from "@/components/DepartmentStats"
import PastRecruiters from "@/components/PastRecruiters"
import Footer from "@/components/Footer"

// ... (keep the rest of your imports and data)

const programs = [
  {
    id: 1,
    name: "B.Tech in CSE",
    icon: <GraduationCap className="w-8 h-8" />,
    description: "A four-year undergraduate program focusing on core computer science and engineering principles.",
    highlights: ["Algorithm Design", "Software Engineering", "Data Structures", "Machine Learning Basics"],
  },
  {
    id: 2,
    name: "B.Tech in CSE with Major in AI",
    icon: <Robot className="w-8 h-8" />,
    description: "Specialized undergraduate program with a focus on Artificial Intelligence and its applications.",
    highlights: ["Deep Learning", "Natural Language Processing", "Computer Vision", "AI Ethics"],
  },
  {
    id: 5,
    name: "Dual Degree (B.Tech + M.Tech in CSE)",
    icon: <Code className="w-8 h-8" />,
    description: "Integrated program offering both B.Tech and M.Tech degrees in Computer Science and Engineering.",
    highlights: ["Extended Research Project", "Industry Internship", "Specialization Tracks", "Integrated Curriculum"],
  },
  {
    id: 3,
    name: "M.Tech in CSE (Data Science and AI)",
    icon: <Database className="w-8 h-8" />,
    description: "Advanced postgraduate program specializing in Data Science and Artificial Intelligence.",
    highlights: ["Big Data Analytics", "Advanced Machine Learning", "Data Visualization", "AI in Business"],
  },
  {
    id: 4,
    name: "Ph.D in Computer Science",
    icon: <BookOpen className="w-8 h-8" />,
    description: "Doctoral program for advanced research in various computer science domains.",
    highlights: ["Research Methodology", "Advanced Topics in CS", "Thesis Writing", "Academic Publishing"],
  },
  
]

const laboratories = [
  {
    id: 1,
    name: "AI and Machine Learning Lab",
    icon: <Robot className="w-8 h-8" />,
    description: "Cutting-edge facility for AI and ML research and development.",
    equipment: ["GPU Clusters", "Neural Network Simulators", "Data Annotation Tools", "AI Development Frameworks"],
    image: "/lab-ai-ml.jpg",
  },
  {
    id: 2,
    name: "Cloud Computing and Big Data Lab",
    icon: <Cloud className="w-8 h-8" />,
    description: "Advanced lab for cloud technologies and big data processing.",
    equipment: ["Cloud Servers", "Hadoop Cluster", "Data Visualization Tools", "Distributed Computing Platforms"],
    image: "/lab-cloud-bigdata.jpg",
  },
  {
    id: 3,
    name: "Cybersecurity and Network Lab",
    icon: <Network className="w-8 h-8" />,
    description: "Specialized lab for network security and cybersecurity research.",
    equipment: ["Network Simulators", "Penetration Testing Tools", "Firewall Systems", "Encryption Hardware"],
    image: "/lab-cybersecurity.jpg",
  },
  {
    id: 4,
    name: "IoT and Embedded Systems Lab",
    icon: <Cpu className="w-8 h-8" />,
    description: "State-of-the-art facility for IoT and embedded systems development.",
    equipment: ["IoT Development Kits", "Sensor Arrays", "Microcontroller Platforms", "Wireless Communication Modules"],
    image: "/lab-iot-embedded.jpg",
  },
  {
    id: 5,
    name: "Digital and Analog Circuits Design",
    icon: <Circuit className="w-8 h-8" />,
    description: "State-of-the-art facility for designing and testing digital and analog circuits.",
    equipment: ["Oscilloscopes", "Function Generators", "Logic Analyzers", "PCB Prototyping Machines"],
    image: "/lab-digital-analog.jpg",
  },
  {
    id: 6,
    name: "Object Oriented Algorithm Design and Analysis",
    icon: <Laptop className="w-8 h-8" />,
    description: "Advanced computing lab for algorithm design and analysis using object-oriented principles.",
    equipment: ["High-performance Workstations", "Algorithm Visualization Tools", "Version Control Systems"],
    image: "/lab-algorithm.jpg",
  },
  {
    id: 7,
    name: "Database Systems",
    icon: <Database className="w-8 h-8" />,
    description: "Cutting-edge database lab for exploring various database management systems and technologies.",
    equipment: ["Database Servers", "Data Modeling Tools", "Big Data Processing Clusters"],
    image: "/lab-database.jpg",
  },
  {
    id: 8,
    name: "Computer Networking",
    icon: <Network className="w-8 h-8" />,
    description: "Modern networking lab for hands-on experience with various network protocols and architectures.",
    equipment: ["Routers", "Switches", "Network Analyzers", "Firewall Systems"],
    image: "/lab-networking.jpg",
  },
  {
    id: 9,
    name: "VLSI System Design",
    icon: <Microchip className="w-8 h-8" />,
    description: "Advanced lab for designing and simulating Very Large Scale Integration (VLSI) systems.",
    equipment: ["FPGA Development Boards", "IC Design Software", "Chip Fabrication Equipment"],
    image: "/lab-vlsi.jpg",
  },
  {
    id: 10,
    name: "Embedded Systems",
    icon: <Cpu className="w-8 h-8" />,
    description: "Specialized lab for developing and testing embedded systems and IoT devices.",
    equipment: ["Microcontroller Kits", "Embedded Systems Debuggers", "IoT Sensors and Actuators"],
    image: "/lab-embedded.jpg",
  },
]

const heroImages = [
  "/lovable-uploads/6bb5de35-b3ef-4db7-8b53-ae22f4ff4fa1.png",
  "/path-to-your-second-image.jpg",
  "/path-to-your-third-image.jpg",
]

export default function Home() {
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [selectedLab, setSelectedLab] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="">
      <Header />

      <main >
        <HeroSection />
        <NewsTicker />

        {/* Main Content and Sidebar */}
        <section className="py-16 bg-gradient-to-br from-white to-[#f5f8ff]">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:w-2/3 space-y-8">
                {/* Welcome to CSE Card */}
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-[#B0B0B0]/30">
                  <CardHeader className="bg-gradient-to-r from-[#003366] to-[#6495ED]">
                    <CardTitle className="text-2xl font-bold text-white">
                      Welcome to Computer Science and Engineering
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="prose max-w-none">
                      <motion.p
                        className="mb-4 group-hover: transition-colors duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        Computer Science and Engineering stream started in 2009. IIITDM Kancheepuram's Computer Science
                        and Engineering curriculum is modeled on the ACM (Association for Computing Machinery)
                        recommendations and is the first of its kind engineering program offered in India.
                      </motion.p>
                      <motion.p
                        className="mb-4 group-hover: transition-colors duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        This program is aimed at producing engineers equipped with skills required for efficient
                        hardware-software interaction. In addition to courses offered by the conventional Computer
                        Science curriculum, this novel program offers core courses such as Embedded Systems,
                        Human-Computer Interaction, Signals and Systems, Product Design etc., that equip the students
                        with both computing and electronics engineering skills that are very much required for the
                        successful creation of products requiring hardware - software interactions.
                      </motion.p>
                      <motion.p
                        className="group-hover: transition-colors duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        Our graduates would find wide scope in VLSI, Embedded Systems and Electronics Product
                        Manufacturing related industries in addition to application development avenues and higher
                        studies that are open to conventional Computer Science engineers.
                      </motion.p>
                    </div>
                   
                  </CardContent>
                </Card>

                {/* Intake in CSE Department Card */}
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-[#B0B0B0]/30">
                  <CardHeader className="bg-gradient-to-r from-[#003366] to-[#6495ED]">
                    <CardTitle className="text-2xl font-bold text-white">Intake in CSE Department</CardTitle>
                    <CardDescription className="text-white/80">Academic Year 2025-2026</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      <IntakeItem
                        icon={<GraduationCap className="w-6 h-6" />}
                        program="B.Tech in CSE"
                        total={97}
                        breakdown={[
                          { label: "JEE main based", value: 85 },
                          { label: "DASA", value: 12 },
                        ]}
                      />
                      <IntakeItem
                        icon={<Award className="w-6 h-6" />}
                        program="B.Tech in CSE with Major in AI"
                        total={52}
                        breakdown={[
                          { label: "JEE main based", value: 46 },
                          { label: "DASA", value: 6 },
                        ]}
                      />
                      <IntakeItem
                        icon={<BookOpen className="w-6 h-6" />}
                        program="M.Tech in CSE (Data Science and AI)"
                        total={21}
                        breakdown={[
                          { label: "GATE based", value: 20 },
                          { label: "DASA", value: 1 },
                        ]}
                      />
                      <IntakeItem 
                      icon={<Code className="w-6 h-6" />}
                      program="Dual Degree in CSE"
                      total={74}
                      breakdown={[
                          { label: "JEE based", value: 68 },
                          { label: "DASA", value: 6 },  
                        ]}
                      />
                      <IntakeItem 
                      icon={<Users className="w-6 h-6" />} 
                      program="Ph.D" total={3} 
                      />
                    </ul>
                    <Button
                      variant="outline"
                      className="mt-6 border-[#003366] text-[#003366] hover:bg-[#f5f8ff] hover:border-[#6495ED] hover:text-[#6495ED] transition-colors duration-300 shadow-sm hover:shadow-md"
                    >
                      View All Programs
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Sidebar */}
              <div className="lg:w-1/3">
                <div className="sticky top-24">
                  <SidebarNews />
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProgramsOffered />
        <Laboratories />
        <PastRecruiters />
        <DepartmentStats />

        <AnimatePresence>
          {selectedProgram && (
            <Dialog open={!!selectedProgram} onOpenChange={() => setSelectedProgram(null)}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold flex items-center text-[#003366]">
                    {selectedProgram.icon}
                    <span className="ml-2">{selectedProgram.name}</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <DialogDescription className="text-lg text-gray-700">{selectedProgram.description}</DialogDescription>
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-[#003366]">Program Highlights:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {selectedProgram.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <ChevronRight className="w-5 h-5 mr-2 text-[#003366]" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {selectedLab && (
            <Dialog open={!!selectedLab} onOpenChange={() => setSelectedLab(null)}>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold flex items-center text-[#003366]">
                    {selectedLab.icon}
                    <span className="ml-2">{selectedLab.name}</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Image
                      src={selectedLab.image || "/placeholder.svg"}
                      alt={selectedLab.name}
                      width={500}
                      height={300}
                      className="rounded-lg shadow-md object-cover"
                    />
                  </div>
                  <div>
                    <DialogDescription className="text-lg text-gray-700 mb-4">
                      {selectedLab.description}
                    </DialogDescription>
                    <h4 className="text-xl font-semibold mb-2 text-[#003366]">Equipment:</h4>
                    <ul className="space-y-2">
                      {selectedLab.equipment.map((item, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <ChevronRight className="w-5 h-5 mr-2 text-[#003366]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

function StatCard({ icon, value, label }) {
  return (
    <Card className="bg-white/10 border-none text-white hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader>
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">{icon}</div>
      </CardHeader>
      <CardContent className="text-center">
        <CardTitle className="text-4xl font-bold mb-2">{value}</CardTitle>
        <CardDescription className="text-lg text-blue-100">{label}</CardDescription>
      </CardContent>
    </Card>
  )
}

function IntakeItem({ icon, program, total, breakdown }) {
  return (
    <motion.li
      className="flex items-start space-x-4 p-3 rounded-lg hover:bg-[#f5f8ff] transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex-shrink-0 w-10 h-10 bg-[#f5f8ff] rounded-full flex items-center justify-center text-[#003366]">
        {icon}
      </div>
      <div className="flex-grow">
        <h4 className="font-semibold text-lg text-gray-800">{program}</h4>
        {breakdown && (
          <div className="mt-1 text-sm text-gray-600">
            {breakdown.map((item, index) => (
              <span key={index} className="mr-2">
                {item.label}: {item.value}
                {index < breakdown.length - 1 && " |"}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex-shrink-0 text-2xl font-bold text-[#003366]">{total}</div>
    </motion.li>
  )
}

function AnnouncementCard({ title, date, description }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="bg-gradient-to-r from-[#6495ED] to-[#003366]">
        <CardTitle className="text-xl font-bold text-white">{title}</CardTitle>
        <CardDescription className="text-blue-100">{date}</CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-gray-600">{description}</p>
        <Button variant="link" className="mt-4 text-[#003366] hover:text-[#6495ED] p-0 transition-colors duration-300">
          Read more
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

