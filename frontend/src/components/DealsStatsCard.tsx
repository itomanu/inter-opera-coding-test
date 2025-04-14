import { formatCurrency } from "@/lib/utils"
import { DealStatus, SalesRep } from "@/services/types"
import { Hourglass, TrendingDown, TrendingUp } from "lucide-react"

export type MetricCardProps = {
  title: string
  text: string
  type: DealStatus
}

type DealsStatsCardVariant = {
  icon: React.ReactNode
  background: string
  color: string
}

export function DealsStatsCard({
  title, text, type
}: MetricCardProps) {
  const variant: Record<DealStatus, DealsStatsCardVariant> = {
    [DealStatus.ClosedWon]: {
      icon: <TrendingUp className="text-emerald-600" size={15} />,
      background: "bg-emerald-50",
      color: "text-emerald-600"
    },
    [DealStatus.ClosedLost]: {
      icon: <TrendingDown className="text-red-700" size={15} />,
      background: "bg-red-50",
      color: "text-red-700"
    },
    [DealStatus.InProgress]: {
      icon: <Hourglass className="text-indigo-500" size={15} />,
      background: "bg-indigo-50",
      color: "text-indigo-500"
    },
  }

  return (
    <div className="flex-1 flex flex-col bg-white rounded-sm p-4 gap-0 border-gray-200 border items-end sm:p-6 sm:gap-2">
      <div className="flex justify-center items-center gap-2">
        <div className={`${variant[type].background} w-6 h-6 rounded-lg flex justify-center items-center`}>
          {variant[type].icon}
        </div>
        <p className={`text-gray-500 text-xs sm:text-sm`}>{title}</p>
      </div>
      <p className={`font-bold text-lg ${variant[type].color} sm:text-3xl`}>{text}</p>
    </div>
  )
}

export type DealStats = {
  won: number
  lost: number
  inProgress: number
}

type DealsStatsContainerProps = {
  data: SalesRep[]
}

function calculateTotalDealStats(data: SalesRep[]): DealStats {
  let stats: DealStats = {
    won: 0,
    lost: 0,
    inProgress: 0,
  }

  for (const rep of data) {
    for (const deal of rep.deals) {
      switch (deal.status) {
        case DealStatus.ClosedWon:
          stats.won+=deal.value
          break
        case DealStatus.ClosedLost:
          stats.lost+=deal.value
          break
        case DealStatus.InProgress:
          stats.inProgress+=deal.value
          break
        default:
          console.warn("Unknown status:", deal.status)
      }
    }
  }

  return stats
}

export function DealsStatsContainer({
  data
}: DealsStatsContainerProps) {
  const stats = calculateTotalDealStats(data)

  return (
    <div className="flex gap-3 max-[1000px]:flex-wrap sm:flex-row sm:gap-4">
      <DealsStatsCard
        title="Total Deals Won"
        text={`${formatCurrency(stats.won)}`}
        type={DealStatus.ClosedWon} />
      <DealsStatsCard
        title="Total Deals Won"
        text={`${formatCurrency(stats.lost)}`}
        type={DealStatus.ClosedLost} />
      <DealsStatsCard
        title="Total Deals Won"
        text={`${formatCurrency(stats.inProgress)}`}
        type={DealStatus.InProgress} />
    </div>
  )
}
