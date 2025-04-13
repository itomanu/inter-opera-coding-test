'use client'

import { useState, useEffect, useRef } from "react"
import { LoadingBubble, MessageBubble, MessageProps } from "@/components/MessageBubble"
import { sendQuestion } from "./ai-service"

export default function AskBotPage() {
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const bottomRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSend = async () => {
    if (loading || input.trim() === "") return

    setMessages((prev) => [...prev, {
      type: "question",
      text: input
    }])
    setInput("")
    setLoading(true)

    try {
      const answer = await sendQuestion(input)
      const botMessage: MessageProps = { type: "answer", text: answer }
      setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      setMessages((prev) => [...prev, {
        type: "error",
        text: "‼️ Oops! Failed to get a response. Try again later.",
      }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend()
  }

  return (
    <div className="flex flex-col h-full max-h-screen p-8">
      <div className="pb-4">
        <h1 className="font-bold text-2xl">AskBot</h1>
        <p className="font-light text-sm italic text-gray-600">If you don't ask, you don't get.</p>
      </div>
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex flex-col flex-1 overflow-hidden bg-white rounded-sm shadow-sm">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length == 0 && <p className="text-center text-gray-400">No questions</p>}
            {messages.map((msg, index) => (
              <MessageBubble
                key={index}
                type={msg.type}
                text={msg.text} />
            ))}

            {loading && <LoadingBubble text="Bot is typing..." />}

            <div ref={bottomRef} />
          </div>
          <div className="p-4 flex items-center gap-2 border-t border-gray-200">
            <input
              ref={inputRef}
              type="text"
              className="flex-1 border rounded-sm px-4 py-2 outline-none border-gray-300 w-0"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={handleSend}
              className="cursor-pointer bg-emerald-500 text-white px-4 py-2 rounded-sm hover:bg-emerald-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
