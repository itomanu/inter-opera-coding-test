import ReactMarkdown from "react-markdown"

export type MessageProps = {
  type: "question" | "answer" | "error"
  text: string
}

export function MessageBubble({
  type, text
}: MessageProps) {
  const isQuestion = type === "question"
  const isError = type === "error"

  return (
    <div
      className={`mb-2 ${isQuestion ? "text-right" : "text-left"}`
      }>
      <div className={`inline-block px-4 py-2 rounded-lg ${isQuestion
        ? "bg-emerald-200 text-emerald-800"
        : isError ? "bg-red-200 text-red-800" : "bg-gray-200 text-black"
        }`}>
        {!isQuestion && (
          <ReactMarkdown>{text}</ReactMarkdown>
        )}
        {isQuestion && (text)}
      </div>
    </div>
  )
}

export type LoadingBubbleProps = {
  text: string
}

export function LoadingBubble({
  text
}: LoadingBubbleProps) {
  return (
    <div className="text-left mb-2">
      <div className="inline-block px-4 py-2 rounded-lg bg-gray-200 text-gray-600 animate-pulse italic">
        {text}
      </div>
    </div>
  )
}
