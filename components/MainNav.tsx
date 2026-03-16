"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Menu, X, ChevronRight } from "lucide-react"

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Teaching",
    href: "/teaching",
    subItems: [
      { label: "Overview", href: "/teaching/overview" },
      {
        label: "Curriculum",
        href: "https://www.iiitdm.ac.in/students/existing-students/curriculum-info",
        target: "_blank",
      },
      {
        label: "Time Table",
        href: "https://www.iiitdm.ac.in/students/existing-students/time-table",
        target: "_blank",
      },
      { label: "Lecture Notes", href: "/teaching/lecture-notes" },
      { label: "Best Projects", href: "/teaching/best-projects" },
    ],
  },
  {
    label: "People",
    href: "/people",
    subItems: [
      { label: "Faculty", href: "/people/faculty" },
      { label: "Staff", href: "/people/staff" },
      {
        label: "Research Scholars",
        href: "https://www.iiitdm.ac.in/people/research-scholars/cse",
        target: "_blank",
      },
      {
        label: "Alumni",
        href: "/people/alumni",
        subItems: [
          { label: "In Abroad", href: "/people/alumni/abroad" },
          { label: "In India", href: "/people/alumni/india" },
        ],
      },
    ],
  },
  {
    label: "Research",
    href: "/research",
    subItems: [
      { label: "Overview", href: "/research/overview" },
      { label: "Sponsored Research", href: "/research/sponsored" },
      { label: "Ph.D Awarded", href: "/research/phd-awarded" },
      { label: "Publication", href: "/research/publication" },
    ],
  },
  {
    label: "Outreach",
    href: "/outreach",
    subItems: [{ label: "Workshop", href: "/outreach/workshop" }],
  },
  { label: "Industrial Consultancy", href: "/industrial-consultancy" },
  {
    label: "Clubs",
    href: "/clubs",
    subItems: [
      {
        label: "CS Club",
        href: "https://www.cse.iiitdm.ac.in/csclub.html",
        target: "_blank",
      },
      {
        label: "Developers Club",
        href: "https://www.devclub.iiitdm.ac.in",
        target: "_blank",
      },
    ],
  },
  { label: "CSE Moodle", href: "http://172.16.1.173/moodle/", target: "_blank" },
]

type NavSubItem = {
  label: string
  href: string
  target?: string
  subItems?: NavSubItem[]
}

type NavItemType = {
  label: string
  href: string
  target?: string
  subItems?: NavSubItem[]
}

export default function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null)
  const subDropdownTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
        setActiveSubDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)

      if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current)
      if (subDropdownTimerRef.current) clearTimeout(subDropdownTimerRef.current)
    }
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setActiveDropdown(null)
    setActiveSubDropdown(null)
  }, [pathname])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    return () => {
      if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current)
      if (subDropdownTimerRef.current) clearTimeout(subDropdownTimerRef.current)
    }
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
    setActiveDropdown(null)
    setActiveSubDropdown(null)
  }

  const handleDropdownToggle = (label: string) => {
    setActiveSubDropdown(null)
    setActiveDropdown((prev) => (prev === label ? null : label))
  }

  const handleSubDropdownToggle = (label: string) => {
    setActiveSubDropdown((prev) => (prev === label ? null : label))
  }

  const isActivePath = (href: string) => {
    if (!href.startsWith("/")) return false
    if (href === "/") return pathname === "/"
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const getLinkProps = (target?: string) => {
    if (target === "_blank") {
      return {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    }
    return {}
  }

  const DesktopNavItem = ({ item }: { item: NavItemType }) => {
    const hasSubItems = !!item.subItems?.length
    const isActive = isActivePath(item.href)
    const isOpen = activeDropdown === item.label

    const handleMouseEnter = () => {
      if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current)
      setActiveDropdown(item.label)
    }

    const handleMouseLeave = () => {
      dropdownTimerRef.current = setTimeout(() => {
        setActiveDropdown(null)
        setActiveSubDropdown(null)
      }, 120)
    }

    return (
      <li
        className="nav-item relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {hasSubItems ? (
          <>
            <button
              type="button"
              className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                isActive
                  ? "text-white bg-[#003366]"
                  : "text-[#003366] hover:text-[#6495ED] hover:bg-blue-50"
              }`}
            >
              <span>{item.label}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <ul className="nav-dropdown active">
                {item.subItems?.map((subItem) =>
                  subItem.subItems ? (
                    <DesktopSubNavItem key={subItem.label} item={subItem} />
                  ) : (
                    <li key={subItem.label}>
                      <Link
                        href={subItem.href}
                        {...getLinkProps(subItem.target)}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          isActivePath(subItem.href)
                            ? "text-white bg-[#003366]"
                            : "text-[#003366] hover:bg-blue-50 hover:text-[#6495ED]"
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            )}
          </>
        ) : (
          <Link
            href={item.href}
            {...getLinkProps(item.target)}
            className={`block px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
              isActive
                ? "text-white bg-[#003366]"
                : "text-[#003366] hover:text-[#6495ED] hover:bg-blue-50"
            }`}
          >
            {item.label}
          </Link>
        )}
      </li>
    )
  }

  const DesktopSubNavItem = ({ item }: { item: NavSubItem }) => {
    const hasSubItems = !!item.subItems?.length
    const isActive = isActivePath(item.href)
    const isOpen = activeSubDropdown === item.label

    const handleMouseEnter = () => {
      if (subDropdownTimerRef.current) clearTimeout(subDropdownTimerRef.current)
      setActiveSubDropdown(item.label)
    }

    const handleMouseLeave = () => {
      subDropdownTimerRef.current = setTimeout(() => {
        setActiveSubDropdown(null)
      }, 120)
    }

    return (
      <li
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {hasSubItems ? (
          <>
            <button
              type="button"
              className={`flex items-center justify-between w-full px-4 py-2 text-sm transition-colors ${
                isActive
                  ? "text-white bg-[#003366]"
                  : "text-[#003366] hover:bg-blue-50 hover:text-[#6495ED]"
              }`}
            >
              <span>{item.label}</span>
              <ChevronRight className="h-4 w-4" />
            </button>

            {isOpen && (
              <ul className="nav-subdropdown">
                {item.subItems?.map((subItem) => (
                  <li key={subItem.label}>
                    <Link
                      href={subItem.href}
                      {...getLinkProps(subItem.target)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        isActivePath(subItem.href)
                          ? "text-white bg-[#003366]"
                          : "text-[#003366] hover:bg-blue-50 hover:text-[#6495ED]"
                      }`}
                    >
                      {subItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <Link
            href={item.href}
            {...getLinkProps(item.target)}
            className={`block px-4 py-2 text-sm transition-colors ${
              isActive
                ? "text-white bg-[#003366]"
                : "text-[#003366] hover:bg-blue-50 hover:text-[#6495ED]"
            }`}
          >
            {item.label}
          </Link>
        )}
      </li>
    )
  }

  const MobileSubNavItem = ({ item }: { item: NavSubItem }) => {
    const hasSubItems = !!item.subItems?.length
    const isActive = isActivePath(item.href)
    const isOpen = activeSubDropdown === item.label

    return (
      <li className="w-full">
        {hasSubItems ? (
          <>
            <button
              type="button"
              onClick={() => handleSubDropdownToggle(item.label)}
              className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-md ${
                isActive ? "text-blue-700 bg-blue-50" : "text-[#003366] hover:bg-blue-50"
              }`}
            >
              <span>{item.label}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -5, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -5, height: 0 }}
                  className="mt-1 ml-4 pl-2 border-l-2 border-blue-100 space-y-1 overflow-hidden"
                >
                  {item.subItems?.map((nestedItem) => (
                    <li key={nestedItem.label}>
                      <Link
                        href={nestedItem.href}
                        {...getLinkProps(nestedItem.target)}
                        className={`block px-4 py-2 text-sm rounded-md ${
                          isActivePath(nestedItem.href)
                            ? "text-blue-700 bg-blue-50"
                            : "text-[#003366] hover:bg-blue-50"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {nestedItem.label}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </>
        ) : (
          <Link
            href={item.href}
            {...getLinkProps(item.target)}
            className={`block px-4 py-2 text-sm rounded-md ${
              isActive ? "text-blue-700 bg-blue-50" : "text-[#003366] hover:bg-blue-50"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.label}
          </Link>
        )}
      </li>
    )
  }

  if (!isMounted) {
    return <div className="h-20" />
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 bg-white z-50 transition-all duration-300 ${
          isScrolled ? "shadow-lg" : "shadow-md"
        }`}
        ref={navRef}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-4 min-w-0">
              <Image
                src="/assets/image.png"
                alt="IIITDM Kancheepuram Logo"
                width={45}
                height={45}
                className="object-contain"
              />
              <div className="hidden md:block leading-tight">
                <h1 className="text-lg font-bold text-[#003366]">
                  IIITDM Kancheepuram
                </h1>
                <p className="text-xs text-gray-600">
                  Department of Computer Science & Engineering
                </p>
              </div>
            </Link>

            <div className="hidden lg:flex">
              <ul className="flex items-center space-x-2">
                {navItems.map((item) => (
                  <DesktopNavItem key={item.label} item={item} />
                ))}
              </ul>
            </div>

            <div className="lg:hidden">
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="text-[#003366] p-2 rounded-md hover:bg-blue-50 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden w-full overflow-hidden"
            >
              <div className="px-4 py-4 bg-white border-t border-gray-100 shadow-inner">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.label} className="w-full">
                      {item.subItems ? (
                        <div className="w-full">
                          <button
                            type="button"
                            onClick={() => handleDropdownToggle(item.label)}
                            className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-md ${
                              isActivePath(item.href)
                                ? "text-white bg-[#003366]"
                                : "text-[#003366] hover:bg-blue-50"
                            }`}
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${
                                activeDropdown === item.label ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {activeDropdown === item.label && (
                              <motion.ul
                                initial={{ opacity: 0, y: -10, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: "auto" }}
                                exit={{ opacity: 0, y: -10, height: 0 }}
                                className="mt-1 ml-4 pl-2 border-l-2 border-blue-200 space-y-1 overflow-hidden"
                              >
                                {item.subItems.map((subItem) =>
                                  subItem.subItems ? (
                                    <MobileSubNavItem key={subItem.label} item={subItem} />
                                  ) : (
                                    <li key={subItem.label}>
                                      <Link
                                        href={subItem.href}
                                        {...getLinkProps(subItem.target)}
                                        className={`block px-4 py-2 text-sm rounded-md ${
                                          isActivePath(subItem.href)
                                            ? "text-blue-700 bg-blue-50"
                                            : "text-[#003366] hover:bg-blue-50"
                                        }`}
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {subItem.label}
                                      </Link>
                                    </li>
                                  )
                                )}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          {...getLinkProps(item.target)}
                          className={`block px-4 py-3 text-sm font-medium rounded-md ${
                            isActivePath(item.href)
                              ? "text-white bg-[#003366]"
                              : "text-[#003366] hover:bg-blue-50"
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


      </nav>

      <div className="h-20" />
    </>
  )
}
