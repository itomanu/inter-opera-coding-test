import { getPravatarURL } from "@/lib/utils"

export type SalesAvatarProps = {
  name: string
  size?: number
}

export function SalesAvatar({
  name, size = 50
}: SalesAvatarProps) {
  return (
    <img
      width={size}
      height={size}
      src={getPravatarURL(name)}
      className="rounded-md"
      alt={name}
    />
  )
}
