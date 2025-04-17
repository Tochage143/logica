import TreeViewFile from "../Components/Treeview/TreeViewFile";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row h-full">
      <TreeViewFile />
      {children}
    </div>
  );
}
