"use client";

import React, { useEffect, useRef } from "react";
import {
  FolderIcon,
  FileIcon,
  ChevronDown,
  ChevronRight,
  Plus,
} from "lucide-react";
import { useFileSystemStore } from "../../store/fileSystemStore";
import { FileSystemItem } from "../../types";
import ContextMenu from "./ContextMenu";

const FileTree: React.FC = () => {
  const {
    files,
    selectedFile,
    selectFile,
    toggleFolder,
    contextMenu,
    openContextMenu,
    closeContextMenu,
    createNewFile,
    createNewFolder,
  } = useFileSystemStore();

  const fileTreeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenu.isOpen &&
        fileTreeRef.current &&
        !fileTreeRef.current.contains(event.target as Node)
      ) {
        closeContextMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu.isOpen, closeContextMenu]);

  const handleContextMenu = (e: React.MouseEvent, item: FileSystemItem) => {
    e.preventDefault();
    openContextMenu(e.clientX, e.clientY, item);
  };

  const renderItem = (item: FileSystemItem) => {
    const isFolder = item.type === "folder";
    const isSelected = selectedFile?.id === item.id;

    return (
      <div key={item.id} className="select-none">
        <div
          className={`flex items-center px-2 py-1 cursor-pointer hover:bg-gray-700 ${
            isSelected ? "bg-gray-700" : ""
          }`}
          onClick={() => (isFolder ? toggleFolder(item.id) : selectFile(item))}
          onContextMenu={(e) => handleContextMenu(e, item)}
        >
          <div className="flex items-center w-full">
            {isFolder && (
              <span className="mr-1 text-gray-400">
                {item.isExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </span>
            )}
            <span className="mr-2 text-gray-400">
              {isFolder ? <FolderIcon size={16} /> : <FileIcon size={16} />}
            </span>
            <span className="truncate text-gray-200">{item.name}</span>
          </div>
        </div>

        {isFolder && item.isExpanded && item.children && (
          <div className="ml-4 border-l border-gray-700">
            {item.children.map((child) => renderItem(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={fileTreeRef}
      className="h-full bg-gray-800 text-white overflow-auto"
    >
      <div className="flex items-center justify-between p-2 border-b border-gray-700">
        <h3 className="font-medium">Files</h3>
        <div className="flex space-x-2">
          <button
            className="p-1 rounded hover:bg-gray-700 text-gray-400"
            onClick={() => createNewFile(null)}
            title="New File"
          >
            <FileIcon size={16} />
          </button>
          <button
            className="p-1 rounded hover:bg-gray-700 text-gray-400"
            onClick={() => createNewFolder(null)}
            title="New Folder"
          >
            <FolderIcon size={16} />
          </button>
          <button
            className="p-1 rounded hover:bg-gray-700 text-gray-400"
            title="More Options"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="pt-2">{files.map((item) => renderItem(item))}</div>

      {contextMenu.isOpen && <ContextMenu />}
    </div>
  );
};

export default FileTree;
