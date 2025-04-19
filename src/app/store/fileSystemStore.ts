import { create } from 'zustand';
import { FileSystemItem, ContextMenuState } from '../types';
import { demoData } from '../data/demoData';
import { format } from 'date-fns';

interface FileSystemState {
  files: FileSystemItem[];
  selectedFile: FileSystemItem | null;
  contextMenu: ContextMenuState;
  
  // Actions
  setFiles: (files: FileSystemItem[]) => void;
  selectFile: (file: FileSystemItem | null) => void;
  updateFileContent: (id: string, content: string) => void;
  toggleFolder: (id: string) => void;
  createNewFile: (parentId: string | null) => void;
  createNewFolder: (parentId: string | null) => void;
  renameItem: (id: string, newName: string) => void;
  deleteItem: (id: string) => void;
  
  // Context Menu
  openContextMenu: (x: number, y: number, fileItem: FileSystemItem) => void;
  closeContextMenu: () => void;
}

export const useFileSystemStore = create<FileSystemState>((set, get) => ({
  files: demoData,
  selectedFile: null,
  contextMenu: {
    isOpen: false,
    x: 0,
    y: 0,
    fileItem: null
  },
  
  setFiles: (files) => set({ files }),
  
  selectFile: (file) => set({ selectedFile: file }),
  
  updateFileContent: (id, content) => {
    const { files } = get();
    const updateContent = (items: FileSystemItem[]): FileSystemItem[] => {
      return items.map(item => {
        if (item.id === id) {
          return { 
            ...item, 
            content,
            dateModified: format(new Date(), 'dd-MM-yyyy HH:mm:ss')
          };
        }
        if (item.children) {
          return { ...item, children: updateContent(item.children) };
        }
        return item;
      });
    };
    
    set({ 
      files: updateContent(files),
      selectedFile: get().selectedFile ? { ...get().selectedFile, content } : null
    });
  },
  
  toggleFolder: (id) => {
    const { files } = get();
    const toggleFolderExpansion = (items: FileSystemItem[]): FileSystemItem[] => {
      return items.map(item => {
        if (item.id === id) {
          return { ...item, isExpanded: !item.isExpanded };
        }
        if (item.children) {
          return { ...item, children: toggleFolderExpansion(item.children) };
        }
        return item;
      });
    };
    
    set({ files: toggleFolderExpansion(files) });
  },
  
  createNewFile: (parentId) => {
    const { files } = get();
    const now = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
    const newFile: FileSystemItem = {
      id: crypto.randomUUID(),
      name: 'New File.md',
      type: 'file',
      content: '',
      parentId,
      dateCreated: now,
      dateModified: now
    };
    
    const addNewFile = (items: FileSystemItem[]): FileSystemItem[] => {
      // If parent is null, add to root
      if (parentId === null) {
        return [...items, newFile];
      }
      
      return items.map(item => {
        if (item.id === parentId) {
          return { 
            ...item, 
            children: item.children ? [...item.children, newFile] : [newFile],
            isExpanded: true
          };
        }
        if (item.children) {
          return { ...item, children: addNewFile(item.children) };
        }
        return item;
      });
    };
    
    set({ files: addNewFile(files) });
  },
  
  createNewFolder: (parentId) => {
    const { files } = get();
    const now = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
    const newFolder: FileSystemItem = {
      id: crypto.randomUUID(),
      name: 'New Folder',
      type: 'folder',
      children: [],
      isExpanded: true,
      parentId,
      dateCreated: now,
      dateModified: now
    };
    
    const addNewFolder = (items: FileSystemItem[]): FileSystemItem[] => {
      // If parent is null, add to root
      if (parentId === null) {
        return [...items, newFolder];
      }
      
      return items.map(item => {
        if (item.id === parentId) {
          return { 
            ...item, 
            children: item.children ? [...item.children, newFolder] : [newFolder],
            isExpanded: true
          };
        }
        if (item.children) {
          return { ...item, children: addNewFolder(item.children) };
        }
        return item;
      });
    };
    
    set({ files: addNewFolder(files) });
  },
  
  renameItem: (id, newName) => {
    const { files } = get();
    const renameFileOrFolder = (items: FileSystemItem[]): FileSystemItem[] => {
      return items.map(item => {
        if (item.id === id) {
          return { ...item, name: newName };
        }
        if (item.children) {
          return { ...item, children: renameFileOrFolder(item.children) };
        }
        return item;
      });
    };
    
    const updatedFiles = renameFileOrFolder(files);
    const findUpdatedItem = (items: FileSystemItem[]): FileSystemItem | null => {
      for (const item of items) {
        if (item.id === id) return item;
        if (item.children) {
          const found = findUpdatedItem(item.children);
          if (found) return found;
        }
      }
      return null;
    };
    
    const updatedSelectedFile = get().selectedFile?.id === id 
      ? findUpdatedItem(updatedFiles) 
      : get().selectedFile;
    
    set({ 
      files: updatedFiles,
      selectedFile: updatedSelectedFile
    });
  },
  
  deleteItem: (id) => {
    const { files, selectedFile } = get();
    const deleteFileOrFolder = (items: FileSystemItem[]): FileSystemItem[] => {
      return items.filter(item => {
        if (item.id === id) {
          return false;
        }
        if (item.children) {
          item.children = deleteFileOrFolder(item.children);
        }
        return true;
      });
    };
    
    set({ 
      files: deleteFileOrFolder(files),
      selectedFile: selectedFile?.id === id ? null : selectedFile
    });
  },
  
  openContextMenu: (x, y, fileItem) => set({ 
    contextMenu: { isOpen: true, x, y, fileItem } 
  }),
  
  closeContextMenu: () => set({ 
    contextMenu: { isOpen: false, x: 0, y: 0, fileItem: null } 
  })
}));


