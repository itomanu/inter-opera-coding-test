export type SkillsFieldProps = {
  data: string[]
}

export function SkillsField({
  data
}: SkillsFieldProps) {
  const MAX_ITEM = 3

  return (
    <div className="flex flex-wrap gap-2">
      <>
        {
          data.slice(0, MAX_ITEM - 1).map((skill, i) => (
            <SkillItem key={i} text={skill} />
          ))
        }
        {data.length > MAX_ITEM && (
          <SkillItem text={`+${data.length - (MAX_ITEM - 1)}`} />
        )}
        {data.length === MAX_ITEM && (
          <SkillItem text={data[MAX_ITEM - 1]} />
        )}
      </>
    </div>
  )
}

export type SkillItemProps = {
  text: string
}

export function SkillItem({
  text
}: SkillItemProps) {
  return (
    <span className="bg-gray-100 rounded-full px-2 whitespace-nowrap overflow-hidden text-ellipsis">
      {text}
    </span>
  )
}
