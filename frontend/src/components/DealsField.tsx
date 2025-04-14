import { Deal, DealStatus } from "@/services/types"
import { Hourglass, TrendingDown, TrendingUp } from "lucide-react"
import { DealStats } from "./DealsStatsCard"
import { formatCurrency } from "@/lib/utils"

export type DealsFieldProps = {
  data: Deal[]
}

function calculateSalesDealStats(data: Deal[]): DealStats {
  let stats: DealStats = {
    won: 0,
    lost: 0,
    inProgress: 0,
  }

  for (const deal of data) {
    switch (deal.status) {
      case DealStatus.ClosedWon:
        stats.won += deal.value
        break
      case DealStatus.ClosedLost:
        stats.lost += deal.value
        break
      case DealStatus.InProgress:
        stats.inProgress += deal.value
        break
      default:
        console.warn("Unknown status:", deal.status)
    }
  }

  return stats
}

export function DealsField({
  data
}: DealsFieldProps) {
  const stats = calculateSalesDealStats(data)

  return (
    <div className="flex flex-col gap-1 items-end">
      <DealsFieldItem
        text={formatCurrency(stats.won)}
        type={DealStatus.ClosedWon}
      />
      <DealsFieldItem
        text={formatCurrency(stats.lost)}
        type={DealStatus.ClosedLost}
      />
      <DealsFieldItem
        text={formatCurrency(stats.inProgress)}
        type={DealStatus.InProgress}
      />
    </div>
  )
}

export type DealsFieldItemProps = {
  text: string,
  type: DealStatus
}

type DealsFieldItemVariant = {
  icon: React.ReactNode
  color: string
}

export function DealsFieldItem({
  text, type
}: DealsFieldItemProps) {
  const variant: Record<DealStatus, DealsFieldItemVariant> = {
    [DealStatus.ClosedWon]: {
      icon: <TrendingUp size={15} />,
      color: "text-emerald-600"
    },
    [DealStatus.ClosedLost]: {
      icon: <TrendingDown size={15} />,
      color: "text-red-700"
    },
    [DealStatus.InProgress]: {
      icon: <Hourglass size={15} />,
      color: "text-indigo-500"
    }
  }

  return (
    <div className={`flex flex-row items-center gap-1 ${variant[type].color} font-medium`}>
      {variant[type].icon} {text}
    </div>
  )
}
