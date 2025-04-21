import FileTree from "@components/FileTree/FileTree";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-black text-white overflow-hidden gap-2">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-800 border-r text-gray-600 px-4 py-2">
        <FileTree />
      </aside>

      {/* This have the editor  */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
