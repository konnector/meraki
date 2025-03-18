import { MessageLoading } from "@/components/ui/message-loading"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-center space-y-4">
        <div className="h-12 w-12 text-black mx-auto">
          <MessageLoading />
        </div>
        <p className="text-sm text-gray-600">Loading spreadsheet...</p>
      </div>
    </div>
  )
} 