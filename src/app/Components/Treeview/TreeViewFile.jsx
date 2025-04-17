"use client";

import React, { useState } from "react";
import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import TreeView, { flattenTree } from "react-accessible-treeview";
import FileIcon from "./Iconsdata/FileIcon";

const folder = {
  name: "",
  children: [
    {
      name: "src",
      children: [{ name: "index.js" }, { name: "styles.css" }],
    },
    {
      name: "node_modules",
      children: [{ name: "react", children: [{ name: "index.js" }] }],
    },
    { name: ".gitignore" },
    { name: "package.json" },
    { name: "README.md" },
    { name: "server.py" },
  ],
};

const data = flattenTree(folder);

function FileTree() {
  const [contextMenu, setContextMenu] = useState(null);

  const handleRightClick = (event, element) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      element,
    });
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex p-6">
      <div className="w-[350px] bg-gray-800 p-4 rounded-lg shadow-lg overflow-hidden">
        <div className="max-h-[500px] overflow-y-auto">
          <TreeView
            data={data}
            aria-label="directory tree"
            togglableSelect
            clickAction="EXCLUSIVE_SELECT"
            multiSelect
            nodeRenderer={({ element, isBranch, isExpanded, getNodeProps, level }) => (
              <div
                {...getNodeProps()}
                onContextMenu={(e) => handleRightClick(e, element)}
                className="flex items-center space-x-2 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-700 overflow-hidden"
                style={{ paddingLeft: `${level * 16}px` }}
              >
                {isBranch ? <FolderIcon isOpen={isExpanded} /> : <FileIcon filename={element.name} />}
                <span className="truncate w-[250px]">{element.name}</span>
              </div>
            )}
          />
        </div>
      </div>

      {contextMenu && (
        <div
          className="absolute bg-gray-700 text-white p-2 rounded shadow-lg"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <p className="cursor-pointer hover:bg-gray-600 px-2 py-1">New File</p>
          <p className="cursor-pointer hover:bg-gray-600 px-2 py-1">New Folder</p>
          <p className="cursor-pointer hover:bg-gray-600 px-2 py-1">Rename</p>
          <p className="cursor-pointer hover:bg-gray-600 px-2 py-1">Delete</p>
        </div>
      )}
    </div>
  );
}

const FolderIcon = ({ isOpen }) =>
  isOpen ? <FaRegFolderOpen className="text-yellow-400" /> : <FaRegFolder className="text-yellow-400" />;

export default FileTree;
