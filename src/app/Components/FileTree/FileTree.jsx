"use client";

import { useState, useEffect } from "react";
import Folder from "./Folder";
import useTraverseTree from "./use-traverse-tree";

function FileTree() {
  const [explorerData, setExplorerData] = useState(null);
  const { insertNode, deleteNode, updateNode } = useTraverseTree();
  const [isLoading, setIsLoading] = useState(true);

  const fetchFolderData = async () => {
    try {
      const res = await fetch("/api/files");
      const data = await res.json();
      setExplorerData(data.folderData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching folder data:", error);
    }
  };

  useEffect(() => {
    fetchFolderData();
  }, []);

  const handleInsertNode = async (folderId, itemName, isFolder) => {
    const finalItem = insertNode(explorerData, folderId, itemName, isFolder);

    try {
      const res = await fetch("/api/files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: itemName,
          type: isFolder ? "folder" : "file",
          parentId: folderId === "1" ? null : folderId,
        }),
      });

      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.error("Error inserting node:", error);
    }

    return finalItem;
  };

  const handleDeleteNode = async (fileId) => {
    const updatedTree = deleteNode(explorerData, fileId);
    setExplorerData(updatedTree);
    try {
      const res = await fetch(`/api/files/${fileId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");
    } catch (error) {
      console.error("Error deleting node:", error);
    }
  };

  const handleUpdateFolder = async (id, updatedValue, isFolder) => {
    const updatedTree = updateNode(explorerData, id, updatedValue, isFolder);
    setExplorerData(updatedTree);
    try {
      const res = await fetch(`/api/files/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: updatedValue,
        }),
      });

      if (!res.ok) throw new Error("Failed to update");
    } catch (error) {
      console.error("Error updating node:", error);
    }
  };

  if (isLoading) return <div>Loading file system...</div>;

  return (
    <div className="h-full max-h-screen overflow-y-auto p-2 rounded-md shadow-md">
      <Folder
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleUpdateFolder={handleUpdateFolder}
        explorerData={explorerData}
      />
    </div>
  );
}

export default FileTree;
