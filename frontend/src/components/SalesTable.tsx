import { SalesRep } from "@/services/types"
import { ArrowDownUp, ArrowUpDown, ChevronRight } from "lucide-react"
import { SkillsField } from "./SkillsField"
import { DealsField } from "./DealsField"
import { ClientsField } from "./ClientsField"
import { useMemo, useState } from "react"
import { sortData } from "@/lib/utils"

export type SalesTableProps = {
  data: SalesRep[]
}

export function SalesTable({
  data
}: SalesTableProps) {
  const [sortKey, setSortKey] = useState<keyof SalesRep | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const dataSorted = useMemo(() => {
    if (!sortKey) return data
  
    return sortData(data, sortKey, sortOrder)
  }, [data, sortKey, sortOrder])

  function handleSort(key: keyof SalesRep) {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
    if (sortKey != key) {
      setSortKey(key)
    }
  }

  return (
    <div className="flex flex-col bg-white rounded-sm gap-2 border-gray-200 border">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-gray-100 border-y">
            <tr className="bg-gray-100">
              <TableHead
                firstHead
                name="Sales"
                sortAsc={sortOrder == "asc"}
                sortActive={sortKey == "name"}
                onSort={() => handleSort("name")} />
              <TableHead
                name="Region"
                sortAsc={sortOrder == "asc"}
                sortActive={sortKey == "region"}
                onSort={() => handleSort("region")} />
              <TableHead name="Skills" sortAsc />
              <TableHead name="Deals" sortAsc />
              <TableHead name="Client" sortAsc />
              <TableHead name="" lastHead sortAsc />
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {dataSorted.map((item) => (
              <tr key={item.id} className="group hover:cursor-pointer">
                <td className="pl-6 p-3 group-hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="min-h-[50px] min-w-[50px] overflow-hidden rounded-md">
                      <img
                        width={50}
                        height={50}
                        src={`https://i.pravatar.cc/50?u=${item.id}-${item.name}`}
                        className="h-[50px] w-[50px] rounded-md"
                        alt={item.name}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">
                        {item.name}
                      </p>
                      <span className="text-gray-500 text-sm">
                        {item.role}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-gray-500 text-sm group-hover:bg-gray-50">
                  {item.region}
                </td>
                <td className="p-3 text-gray-500 text-sm group-hover:bg-gray-50">
                  <SkillsField data={item.skills} />
                </td>
                <td className="p-3 text-sm group-hover:bg-gray-50">
                  <DealsField data={item.deals} />
                </td>
                <td className="p-3 group-hover:bg-gray-50">
                  <ClientsField data={item.clients} />
                </td>
                <td className="p-3 text-gray-500 text-sm group-hover:bg-gray-50">
                  <ChevronRight className="text-gray-500" size={18} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export type TableHeadProps = {
  firstHead?: boolean | undefined
  lastHead?: boolean | undefined
  onSort?: () => void | undefined
  name: string
  sortAsc?: boolean | undefined
  sortActive?: boolean | undefined
}

export function TableHead({
  firstHead, lastHead, name, sortAsc, onSort, sortActive
}: TableHeadProps) {
  const padding = firstHead ? "pl-6" : lastHead ? "pr-6" : ""
  const cursor = onSort ? "cursor-pointer" : ""

  return (
    <th
      className={`${padding} ${cursor} p-3 font-medium text-gray-400 text-start text-xs`}
      onClick={() => {
        if (onSort) {
          onSort()
        }
      }}
    >
      <div className="uppercase flex items-center gap-1">
        {name}
        {sortActive && (
          <>
            {sortAsc && <ArrowUpDown className="text-gray-500" size={15} />}
            {!sortAsc && <ArrowDownUp className="text-gray-500" size={15} />}
          </>
        )}
      </div>
    </th>
  )
}