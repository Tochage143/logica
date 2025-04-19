export type FileType = 'file' | 'folder';

export interface FileSystemItem {
  id: string;
  name: string;
  type: FileType;
  content?: string;
  children?: FileSystemItem[];
  isExpanded?: boolean;
  parentId?: string | null;
  path?: string;
  dateCreated?: string;
  dateModified?: string;
}

export interface EditorState {
  selectedFile: FileSystemItem | null;
  wordCount: number;
  characterCount: number;
}

export interface ContextMenuState {
  isOpen: boolean;
  x: number;
  y: number;
  fileItem: FileSystemItem | null;
}