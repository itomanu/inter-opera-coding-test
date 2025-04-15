import { X } from "lucide-react"
import { useEffect, useRef } from "react"

export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Modal({
  isOpen, onClose, children
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 shadow-md">
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-lg p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer"
          onClick={() => onClose()}
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  )
}
