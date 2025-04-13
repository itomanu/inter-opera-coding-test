'use client'

import { useSidebar } from "@/context/SidebarContext"
import { SidebarClose, SidebarOpen } from "lucide-react"
import { usePathname } from "next/navigation"


export type SidebarProps = {
  children: React.ReactNode
}

export type SidebarItemProps = {
  icon: React.ReactNode,
  link: string
  text: string,
  active?: boolean
}

export function Sidebar({
  children
}: SidebarProps) {
  const { isExpanded, toggleSidebar } = useSidebar();

  return (
    <aside>
      <nav className="h-full flex flex-col bg-white shadow-sm border-r-gray-100 border-r-2">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="/greensales.svg"
            alt="logo"
            className={`overflow-hidden transition-all ${isExpanded ? "w-32" : "w-0"}`}
          />
          <button
            onClick={() => toggleSidebar()}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
          >
            {isExpanded ? <SidebarClose /> : <SidebarOpen />}
          </button>
        </div>

        <ul className="flex-1 px-3">{children}</ul>
      </nav>
    </aside>
  )
}

export function SidebarItem({
  icon, link, text, active
}: SidebarItemProps) {
  const { isExpanded } = useSidebar();
  const pathname = usePathname()

  return (
    <li>
      <a href={link} className={`
        relative flex items-center py-2 px-2 my-1 font-medium
        rounded-md cursor-pointer transition-colors group
        ${pathname == link
          ? "bg-emerald-200 text-emerald-800"
          : "hover:bg-emerald-50 text-gray-600"
        }`}>
        {icon}

        <span className={
          `overflow-hidden ${isExpanded ? "w-52 ml-3" : "w-0"}`
        }>{text}</span>
        {!isExpanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6
            bg-emerald-100 text-emerald-800 text-sm
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