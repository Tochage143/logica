import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"

export default function Page() {
  return (
    <div className="flex flex-col gap-2 p-4  h-screen">
      <h1 className="text-3xl font-bold">Simple Editor</h1>
      <p className="text-gray-500">This is a simple editor with basic features.</p>
      <div className="flex-1 overflow-hidden">
        <SimpleEditor />
      </div>
    </div>
  );
}