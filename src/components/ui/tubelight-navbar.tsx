"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  sectionId?: string
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  highlightLayoutId?: string
}

const normalizePath = (value: string) => {
  if (!value) return "/"
  const trimmed = value.replace(/\/+$/, "")
  return trimmed === "" ? "/" : trimmed
}

const getBasePath = (url: string) => {
  const [path] = url.split("#")
  return normalizePath(path || "/")
}

const isSamePageAnchor = (url: string) => url.startsWith("/#") || url.startsWith("#")

export function NavBar({ items, className, highlightLayoutId = "lumigrid-nav-lamp" }: NavBarProps) {
  const rawPathname = usePathname()
  const pathname = normalizePath(rawPathname)
  const [scrollActive, setScrollActive] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  const routeActive = useMemo(() => {
    const match = items.find((item) => getBasePath(item.url) === pathname)
    return match?.name ?? items[0]?.name ?? ""
  }, [items, pathname])

  const resolvedActive = pathname === "/" && scrollActive ? scrollActive : routeActive

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

useEffect(() => {
  if (pathname !== "/") return
  const sections = items.filter((item) => item.sectionId)
  if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          const match = sections.find((item) => item.sectionId === visible.target.id)
          if (match) setScrollActive(match.name)
        }
      },
      { threshold: 0.45, rootMargin: "-20% 0px -40% 0px" }
    )

    sections.forEach((item) => {
      const target = document.getElementById(item.sectionId!)
      if (target) observer.observe(target)
    })

    return () => observer.disconnect()
  }, [items, pathname])

  const handleAnchorClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
      if (!item.sectionId || pathname !== "/" || !isSamePageAnchor(item.url)) return

      const target = document.getElementById(item.sectionId)
      if (!target) return
      event.preventDefault()
      target.scrollIntoView({ behavior: "smooth", block: "start" })
      window.history.replaceState(null, "", `/#${item.sectionId}`)
      setScrollActive(item.name)
    },
    [pathname]
  )

  const navItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        isActive: resolvedActive === item.name
      })),
    [items, resolvedActive]
  )

  return (
    <div className={cn("flex items-center gap-3 rounded-full border border-border bg-background/70 px-1 py-1 shadow-2xl shadow-primary/10 backdrop-blur-xl z-50", className)}>
      {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.url}
              scroll={!item.sectionId}
              onClick={(event) => {
                if (item.sectionId) {
                  handleAnchorClick(event, item)
                } else {
                  if (pathname === "/") setScrollActive(null)
                }
              }}
              className={cn(
                "relative cursor-pointer rounded-full px-6 py-2 text-sm font-semibold transition-colors",
                "text-foreground/70 hover:text-primary",
                item.isActive && "text-primary"
              )}
            >
              <span className={cn("hidden md:inline", isMobile && "inline")}>{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {item.isActive && (
                <motion.div
                  layoutId={highlightLayoutId}
                  className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-primary">
                    <div className="absolute -top-2 -left-2 h-6 w-12 rounded-full bg-primary/30 blur-md" />
                    <div className="absolute -top-1 h-6 w-8 rounded-full bg-primary/25 blur-md" />
                    <div className="absolute left-2 h-4 w-4 rounded-full bg-primary/20 blur-sm" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
    </div>
  )
}
