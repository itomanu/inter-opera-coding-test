export function formatCurrency(
  value: number,
  locale: string = "en-US",
  currency: string = "USD",
  includeDecimals = false
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  }).format(value)
}

export function getRandomBackground(name: string) {
  const colors = [
    "bg-orange-300 text-orange-900",
    "bg-amber-300 text-amber-900",
    "bg-yellow-400 text-yellow-900",
    "bg-lime-400 text-lime-900",
    "bg-green-400 text-green-900",
    "bg-emerald-400 text-emerald-900",
    "bg-teal-400 text-teal-900",
    "bg-cyan-400 text-cyan-900",
    "bg-sky-400 text-sky-900",
    "bg-blue-400 text-blue-900",
    "bg-fuchsia-400 text-fuchsia-900",
    "bg-pink-400 text-pink-900",
    "bg-rose-400 text-rose-900",
  ]

  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % colors.length

  return colors[index]
}

export function sortData<T>(data: T[], key: keyof T, order: "asc" | "desc"): T[] {
  return [...data].sort((a, b) => {
    const aVal = String(a[key])
    const bVal = String(b[key])
    return order === "asc"
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal)
  })
}
