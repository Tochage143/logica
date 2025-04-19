"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  File,
  Folder,
  Edit2,
  Trash2,
  Copy,
  PenSquare
} from 'lucide-react';
import { useFileSystemStore } from '../../store/fileSystemStore';

const ContextMenu: React.FC = () => {
  const {
    contextMenu,
    closeContextMenu,
    renameItem,
    deleteItem,
    createNewFile,
    createNewFolder
  } = useFileSystemStore();

  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState('');
  const renameInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isFolder = contextMenu.fileItem?.type === 'folder';

  // Focus input on rename
  useEffect(() => {
    if (isRenaming && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [isRenaming]);

  // ESC to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeContextMenu();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Outside click to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        closeContextMenu();
        setIsRenaming(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRenameClick = () => {
    if (!contextMenu.fileItem) return;
    setNewName(contextMenu.fileItem.name);
    setIsRenaming(true);
  };

  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contextMenu.fileItem || !newName.trim()) return;
    renameItem(contextMenu.fileItem.id, newName.trim());
    setIsRenaming(false);
    closeContextMenu();
  };

  const handleDeleteClick = () => {
    if (!contextMenu.fileItem) return;
    deleteItem(contextMenu.fileItem.id);
    closeContextMenu();
  };

  const handleNewItem = (type: 'file' | 'folder') => {
    if (!contextMenu.fileItem) return;
    const parentId =
      contextMenu.fileItem.type === 'folder'
        ? contextMenu.fileItem.id
        : contextMenu.fileItem.parentId;

    type === 'file' ? createNewFile(parentId) : createNewFolder(parentId);
    closeContextMenu();
  };

  if (!contextMenu.isOpen || !contextMenu.fileItem) return null;

  const menuStyle = {
    top: Math.min(contextMenu.y, window.innerHeight - 180) + "px",
    left: Math.min(contextMenu.x, window.innerWidth - 200) + "px"
  };

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-gray-800 border border-gray-700 rounded shadow-lg py-1 min-w-48"
      style={menuStyle}
    >
      {isRenaming ? (
        <form onSubmit={handleRenameSubmit} className="px-2 py-1">
          <input
            ref={renameInputRef}
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={() => {
              setIsRenaming(false);
              closeContextMenu();
            }}
            className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white"
          />
        </form>
      ) : (
        <>
          <div className="text-gray-400 text-xs font-medium px-3 py-1 border-b border-gray-700">
            {contextMenu.fileItem.name}
          </div>

          <MenuButton icon={<Edit2 size={14} />} text="Rename" onClick={handleRenameClick} />
          <MenuButton icon={<Trash2 size={14} />} text="Delete" onClick={handleDeleteClick} />

          <Divider />

          <MenuButton
            icon={<File size={14} />}
            text={`New File ${isFolder ? 'Here' : ''}`}
            onClick={() => handleNewItem('file')}
          />
          <MenuButton
            icon={<Folder size={14} />}
            text={`New Folder ${isFolder ? 'Here' : ''}`}
            onClick={() => handleNewItem('folder')}
          />

          <Divider />

          <MenuButton icon={<Copy size={14} />} text="Copy" onClick={() => {}} />
          <MenuButton icon={<PenSquare size={14} />} text="Edit in New Window" onClick={() => {}} />
        </>
      )}
    </div>
  );
};

const MenuButton = ({
  icon,
  text,
  onClick
}: {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}) => (
  <button
    className="flex items-center w-full px-3 py-1.5 text-sm text-gray-200 hover:bg-gray-700"
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{text}</span>
  </button>
);

const Divider = () => (
  <div className="border-t border-gray-700 my-1" />
);

export default ContextMenu;
