import { useState } from "react";
import {
  VscChevronRight,
  VscChevronDown,
  VscFolderOpened,
  VscFolder,
  VscFileCode,
  VscNewFolder,
  VscNewFile,
  VscEdit,
  VscTrash,
} from "react-icons/vsc";
import Link from "next/link";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const Folder = ({
  handleInsertNode,
  handleDeleteNode,
  handleUpdateFolder,
  explorerData,
}) => {
  const [nodeName, setNodeName] = useState(
    explorerData?.name ? explorerData.name : ""
  );
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [updateInput, setUpdateInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolderButton = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({ visible: true, isFolder });
  };

  const handleUpdateFolderButton = (e, isFolder, nodeValue) => {
    setNodeName(nodeValue);
    e.stopPropagation();
    setUpdateInput({ visible: true, isFolder });
  };

  const handleDeleteFolder = (e, isFolder) => {
    e.stopPropagation();
    handleDeleteNode(explorerData.id);
  };

  const onAdd = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorerData.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const onUpdate = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleUpdateFolder(explorerData.id, e.target.value, true);
      setUpdateInput({ ...updateInput, visible: false });
    }
  };

  const handleChange = (event) => {
    setNodeName(event.target.value);
  };

  if (explorerData.isFolder) {
    return (
      <div className="ml-2 mt-1">
        <div
          className="flex items-center justify-between bg-black p-1 rounded cursor-pointer  dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 group border border-transparent hover:border-gray-300 dark:hover:border-gray-600"
          onClick={() => setExpand(!expand)}
        >
          <div className="flex items-center gap-1">
            {expand ? <VscChevronDown /> : <VscChevronRight />}
            {expand ? <VscFolderOpened /> : <VscFolder />}
            {updateInput.visible ? (
              <input
                type="text"
                value={nodeName}
                onChange={handleChange}
                autoFocus
                onBlur={() => setUpdateInput({ ...updateInput, visible: false })}
                onKeyDown={onUpdate}
                className="border rounded px-1 py-0.5 text-sm bg-white dark:bg-gray-900 text-black dark:text-white"
              />
            ) : (
              <label className="text-sm font-medium dark:text-white">
                {explorerData.name}
              </label>
            )}
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={(e) => handleDeleteFolder(e, true)} className="hover:text-red-500">
                  <VscTrash />
                </button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={(e) => handleUpdateFolderButton(e, true, explorerData.name)} className="hover:text-blue-400">
                  <VscEdit />
                </button>
              </TooltipTrigger>
              <TooltipContent>Rename</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={(e) => handleNewFolderButton(e, true)} className="hover:text-green-400">
                  <VscNewFolder />
                </button>
              </TooltipTrigger>
              <TooltipContent>New Folder</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={(e) => handleNewFolderButton(e, false)} className="hover:text-purple-400">
                  <VscNewFile />
                </button>
              </TooltipTrigger>
              <TooltipContent>New File</TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div
          className={`ml-4 transition-all duration-300 ease-in-out ${expand ? "block" : "hidden"}`}
        >
          {showInput.visible && (
            <div className="flex items-center gap-1 my-1">
              <span>{showInput.isFolder ? <VscFolder /> : <VscFileCode />}</span>
              <input
                type="text"
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={onAdd}
                className="border rounded px-1 py-0.5 text-sm bg-white dark:bg-gray-900 text-black dark:text-white"
              />
            </div>
          )}
          {explorerData.items.map((item, index) => (
            <Folder
              handleDeleteNode={handleDeleteNode}
              handleInsertNode={handleInsertNode}
              handleUpdateFolder={handleUpdateFolder}
              explorerData={item}
              key={index}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-between p-1 ml-2 mt-1 bg-black  dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded group border border-transparent hover:border-gray-300 dark:hover:border-gray-600">
        <div className="flex items-center gap-1">
          <VscFileCode />
          {updateInput.visible ? (
            <input
              type="text"
              value={nodeName}
              onChange={handleChange}
              autoFocus
              onBlur={() => setUpdateInput({ ...updateInput, visible: false })}
              onKeyDown={onUpdate}
              className="border rounded px-1 py-0.5 text-sm bg-white dark:bg-gray-900 text-black dark:text-white"
            />
          ) : (
            <Link href={`/Editor/${explorerData.id}`}>
              <label className="text-sm cursor-pointer dark:text-white hover:underline line-clamp-2">
                {explorerData.name}
              </label>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={(e) => handleDeleteFolder(e, false)} className="hover:text-red-500">
                <VscTrash />
              </button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={(e) => handleUpdateFolderButton(e, false, explorerData.name)} className="hover:text-blue-400">
                <VscEdit />
              </button>
            </TooltipTrigger>
            <TooltipContent>Rename</TooltipContent>
          </Tooltip>
        </div>
      </div>
    );
  }
};

export default Folder;
