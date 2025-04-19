import { useState } from 'react';
import {
  Folder,
  FileText,
  ChevronDown,
  ChevronRight,
  MoreVertical,
} from 'lucide-react';

const demoData = [
  {
    id: 'mca',
    name: 'Mca',
    isFolder: true,
    children: [
      {
        id: 'second-sem',
        name: 'Second semester',
        isFolder: true,
        children: [
          {
            id: 'cloud-1',
            name: 'Cloud 1',
            isFolder: true,
            children: [],
          },
          {
            id: 'cloud-2',
            name: 'Cloud 2',
            isFolder: true,
            children: [
              { id: 'unit-1', name: 'Unit 1', isFolder: false, children: [] },
              { id: 'unit-2', name: 'Unit 2', isFolder: false, children: [] },
            ],
          },
        ],
      },
    ],
  },
];

const TreeNode = ({ node, onRename, onAdd, onDelete, editingId, setEditingId, expandedNodes, toggleNode }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [name, setName] = useState(node.name);

  const isExpanded = expandedNodes[node.id] || false;

  const toggleMenu = (e) => {
    e.preventDefault();
    setShowMenu(true);
    document.addEventListener('click', closeMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
    document.removeEventListener('click', closeMenu);
  };

  const handleRename = () => {
    setEditingId(node.id);
    setShowMenu(false);
  };

  const handleRenameSubmit = (e) => {
    if (e.key === 'Enter') {
      onRename(node.id, name);
      setEditingId(null);
    }
  };

  const handleAddNote = () => {
    onAdd(node.id, false);
    setShowMenu(false);
  };

  const handleAddFolder = () => {
    onAdd(node.id, true);
    setShowMenu(false);
  };

  const handleDelete = () => {
    onDelete(node.id);
    setShowMenu(false);
  };

  return (
    <div className="pl-4 relative group">
      <div
        onContextMenu={toggleMenu}
        className="flex items-center gap-1 select-none hover:bg-gray-700 p-1 rounded"
      >
        {node.isFolder ? (
          <span onClick={() => toggleNode(node.id)} className="cursor-pointer">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        ) : (
          <span className="w-4" />
        )}
        {node.isFolder ? <Folder size={16} /> : <FileText size={16} />}
        {editingId === node.id ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleRenameSubmit}
            autoFocus
            className="bg-gray-800 text-white p-1 rounded text-sm border border-gray-600 w-40"
          />
        ) : (
          <span className="ml-1">{node.name}</span>
        )}
        <MoreVertical
          size={12}
          className="ml-auto invisible group-hover:visible cursor-pointer"
          onClick={toggleMenu}
        />
      </div>

      {showMenu && (
        <div className="absolute left-full top-0 ml-2 bg-gray-800 text-white p-2 rounded shadow z-10 text-sm space-y-1">
          <div className="hover:bg-gray-600 p-1 rounded cursor-pointer" onClick={handleAddNote}>New note</div>
          <div className="hover:bg-gray-600 p-1 rounded cursor-pointer" onClick={handleAddFolder}>New folder</div>
          <div className="hover:bg-gray-600 p-1 rounded cursor-pointer" onClick={handleDelete}>Delete</div>
          <div className="hover:bg-gray-600 p-1 rounded cursor-pointer" onClick={handleRename}>Rename</div>
        </div>
      )}

     

      {isExpanded && node.children?.length > 0 && (
        <div className="ml-2">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              editingId={editingId}
              setEditingId={setEditingId}
              onRename={onRename}
              onAdd={onAdd}
              onDelete={onDelete}
              expandedNodes={expandedNodes}
              toggleNode={toggleNode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function FolderTree() {
  const [data, setData] = useState(demoData);
  const [editingId, setEditingId] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState({});

  const toggleNode = (id) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const updateName = (id, newName, nodes = data) => {
    for (let node of nodes) {
      if (node.id === id) {
        node.name = newName;
        break;
      }
      if (node.children?.length) updateName(id, newName, node.children);
    }
    setData([...data]);
  };

  const addNode = (parentId, isFolder, nodes = data) => {
    for (let node of nodes) {
      if (node.id === parentId) {
        const newId = Date.now().toString();
        const newNode = {
          id: newId,
          name: isFolder ? 'New Folder' : 'New Note',
          isFolder,
          children: [],
        };
        node.children = node.children || [];
        node.children.push(newNode);
        setExpandedNodes((prev) => ({ ...prev, [node.id]: true }));
        break;
      }
      if (node.children?.length) addNode(parentId, isFolder, node.children);
    }
    setData([...data]);
  };

  const deleteNode = (id, nodes = data) => {
    const findAndDelete = (items) => {
      return items.filter((item) => {
        if (item.id === id) return false;
        if (item.children) item.children = findAndDelete(item.children);
        return true;
      });
    };
    setData(findAndDelete(data));
  };

  return (
    <div className="p-4 bg-black text-white h-screen overflow-auto w-[300px] text-sm">
      {data.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          editingId={editingId}
          setEditingId={setEditingId}
          onRename={updateName}
          onAdd={addNode}
          onDelete={deleteNode}
          expandedNodes={expandedNodes}
          toggleNode={toggleNode}
        />
      ))}
    </div>
  );
}
