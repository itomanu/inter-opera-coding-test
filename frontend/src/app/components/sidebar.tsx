'use client'

import { SidebarClose, SidebarOpen } from "lucide-react"
import { usePathname } from "next/navigation"
import { createContext, useContext, useState } from "react"

export type SidebarProps = {
  children: React.ReactNode
}

export type SidebarItemProps = {
  icon: React.ReactNode,
  link: string
  text: string,
  active?: boolean
}

const SidebarContext = createContext(true)

export function Sidebar({
  children
}: SidebarProps) {
  const [expanded, setExpanded] = useState(true)

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="/greensales.svg"
            alt="logo"
            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
          />
          <button
            onClick={() => setExpanded(curr => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
          >
            {expanded ? <SidebarClose /> : <SidebarOpen />}
          </button>
        </div>

        <SidebarContext.Provider value={expanded}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  )
}

export function SidebarItem({
  icon, link, text, active
}: SidebarItemProps) {
  const expanded = useContext(SidebarContext)
  const pathname = usePathname()

  return (
    <li>
      <a href={link} className={`
        relative flex items-center py-2 px-2 my-1 font-medium
        rounded-md cursor-pointer transition-colors group
        ${pathname == link
          ? "bg-green-200 text-green-800"
          : "hover:bg-green-50 text-gray-600"
        }`}>
        {icon}

        <span className={
          `overflow-hidden ${expanded ? "w-52 ml-3" : "w-0"}`
        }>{text}</span>
        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6
            bg-green-100 text-green-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
          >
            {text}
          </div>
        )}

      </a>
    </li>
  )
}