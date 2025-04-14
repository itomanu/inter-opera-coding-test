'use client'

import { ClientsField } from "@/components/ClientsField";
import { DealsField } from "@/components/DealsField";
import { DealsStatsContainer } from "@/components/DealsStatsCard";
import { SalesTable } from "@/components/SalesTable";
import { SkillsField } from "@/components/SkillsField";
import { fetchSales } from "@/services/api-service";
import { SalesRep } from "@/services/types";
import { ArrowUpDown, ChevronRight, RefreshCw, UserSearch } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sales, setSales] = useState<SalesRep[]>([])

  useEffect(() => { 
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    setError(null)

    try {
      const data: SalesRep[] = await fetchSales()
      setSales(data)
    } catch (err) {
      setError("Failed to load sales data.")
    } finally {
      setLoading(false)
    }
  }

  function refreshData() {
    if (!loading) {
      loadData()
    }
  }

  return (
    <div className={`${(error || loading) ? "h-full" : ""} flex flex-col p-3 gap-3 max-[450px]:max-w-[450px] sm:p-8 sm:gap-4`}>
      <div>
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <p className="font-light text-sm italic text-gray-600">Sales Representation</p>
      </div>

      {loading && (
        <div className="p-8 text-center flex justify-center items-center h-full">
          <RefreshCw className="animate-spin text-emerald-600"/>
        </div>
      )}

      {error && (
        <button className="h-full cursor-pointer group" onClick={() => refreshData()}>
          <div className="p-8 text-center flex flex-col gap-2 justify-center items-center h-full">
            <div className="transition-all group-hover:rotate-90">
              <RefreshCw className="text-emerald-600"/>
            </div>
            <div>
              {error}
            </div>
          </div>
        </button>
      )}

      {!loading && !error && (
        <>
          <DealsStatsContainer data={sales}/>
          <SalesTable data={sales}/>
        </>
      )}
    </div>
  );
}
