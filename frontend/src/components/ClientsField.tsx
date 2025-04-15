import { getRandomBackground } from "@/lib/utils"
import { Client } from "@/services/types"

export type ClientsFieldProps = {
  data: Client[]
}

export function ClientsField({
  data
}: ClientsFieldProps) {
  const MAX_ITEM = 3

  return (
    <div className="flex items-center">
      <>
        {data.slice(0, MAX_ITEM - 1).map((client, index) => (
          <ClientItem
            key={index}
            overlap={index != 0}
            background="random"
            text={client.name.split(" ").map(s => s.charAt(0)).join("")} />
        ))}
        {data.length > MAX_ITEM && (
          <ClientItem
            overlap
            text={`+${data.length - (MAX_ITEM - 1)}`} />
        )}
        {data.length === MAX_ITEM && (
          <ClientItem
            overlap
            background="random"
            text={data[MAX_ITEM - 1].name.split(" ").map(s => s.charAt(0)).join("")} />
        )}
      </>
    </div>
  )
}

export type ClientItemProps = {
  text: string
  overlap?: boolean
  background?: string | undefined
}

export function ClientItem({
  text, overlap, background
}: ClientItemProps) {
  const ml = overlap ? "-ml-4" : "-ml-0"
  const bg = !background
    ? "bg-gray-300 text-gray-600"
    : background == "random"
      ? getRandomBackground(text)
      : background

  return (
    <div className={`${ml} ${bg} w-10 h-10 rounded-full text-sm flex items-center justify-center font-medium border-2 border-white`}>
      {text}
    </div>
  )
}
