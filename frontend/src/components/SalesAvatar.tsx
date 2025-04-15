import { getPravatarURL } from "@/lib/utils"

export type SalesAvatarProps = {
  name: string
  size?: number
}

export function SalesAvatar({
  name, size = 50
}: SalesAvatarProps) {
  return (
    <div className={`min-h-[${size}px] min-w-[${size}px] overflow-hidden rounded-md`}>
      <img
        width={size}
        height={size}
        src={getPravatarURL(name)}
        className={`h-[${size}px] w-[${size}px] rounded-md`}
        alt={name}
      />
    </div>        
  )
}
