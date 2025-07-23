import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "~/stores";
import bear from "~/configs/bear";

interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder" | "app";
  icon?: string;
  size?: string;
  modified?: string;
  preview?: string;
  path?: string;
  link?: string;
  contents?: FileItem[];
}

interface SidebarItem {
  id: string;
  name: string;
  icon: string;
  path: string;
  type: "favorites" | "icloud" | "locations";
}

// Global state for desktop folder integration
const activeFolder = {
  name: "",
  contents: [] as FileItem[]
};

export const openFolderInFinder = (name: string, contents: any[]) => {
  activeFolder.name = name;
  activeFolder.contents = contents.map(item => ({
    ...item,
    id: `${name}-${item.name}-${Math.random().toString(36).substring(2, 9)}`,
    type: item.type as "file" | "folder" | "app",
    icon: item.icon || (item.type === "folder" 
      ? "i-heroicons-folder" 
      : "i-heroicons-document")
  }));
};

const Finder = () => {
  const [currentView, setCurrentView] = useState<"icons" | "list" | "columns">("icons");
  const [selectedLocation, setSelectedLocation] = useState("desktop");
  const [currentFolder, setCurrentFolder] = useState("Desktop");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pathHistory, setPathHistory] = useState<string[]>(["Desktop"]);
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const dark = useStore(state => state.dark);

  // Sidebar items
  const sidebarItems: SidebarItem[] = [
    { id: "desktop", name: "Desktop", icon: "i-heroicons-computer-desktop", path: "~/Desktop", type: "favorites" },
    { id: "documents", name: "Documents", icon: "i-heroicons-document-duplicate", path: "~/Documents", type: "favorites" },
    { id: "downloads", name: "Downloads", icon: "i-heroicons-arrow-down-tray", path: "~/Downloads", type: "favorites" },
    { id: "pictures", name: "Pictures", icon: "i-heroicons-photo", path: "~/Pictures", type: "favorites" },
    { id: "projects", name: "Projects", icon: "i-heroicons-folder", path: "~/Projects", type: "favorites" },
  ];

  // Default desktop items
  const desktopItems: FileItem[] = [
    {
      id: "documents-folder",
      name: "Documents",
      type: "folder",
      icon: "i-heroicons-document-duplicate",
      size: "--",
      modified: "Today",
      path: "~/Documents"
    },
    {
      id: "downloads-folder", 
      name: "Downloads",
      type: "folder",
      icon: "i-heroicons-arrow-down-tray",
      size: "--",
      modified: "Today",
      path: "~/Downloads"
    },
    {
      id: "projects-folder",
      name: "Projects", 
      type: "folder",
      icon: "i-heroicons-folder",
      size: "--",
      modified: "Recent",
      path: "~/Projects"
    },
    {
      id: "pictures-folder",
      name: "Pictures",
      type: "folder", 
      icon: "i-heroicons-photo",
      size: "--",
      modified: "Yesterday",
      path: "~/Pictures"
    }
  ];

  // Initialize with desktop items
  useEffect(() => {
    if (activeFolder.name) {
      setCurrentFolder(activeFolder.name);
      setFiles(activeFolder.contents);
      setSelectedLocation("desktop");
      return () => {
        activeFolder.name = "";
        activeFolder.contents = [];
      };
    } else {
      setFiles(desktopItems);
    }
  }, []);

  const navigateToLocation = (locationId: string) => {
    setSelectedLocation(locationId);
    const location = sidebarItems.find(item => item.id === locationId);
    if (location) {
      setCurrentFolder(location.name);
      
      if (locationId === "projects") {
        // Load projects from bear.tsx
        const projectsData = bear.find(section => section.id === "project");
        if (projectsData) {
          const projectFiles: FileItem[] = projectsData.md.map(project => ({
            id: project.id,
            name: project.title,
            type: "file",
            icon: project.icon || "i-heroicons-document",
            size: "1.2 MB",
            modified: "Recent",
            preview: `img/projects/${project.id.toLowerCase().replace(/\s+/g, '-')}.png`,
            link: project.link,
            path: `~/Projects/${project.title}`
          }));
          setFiles(projectFiles);
        }
      } else if (locationId === "desktop") {
        setFiles(desktopItems);
      } else if (locationId === "documents") {
        // Load documents from public/finder/documents
        const documentFiles: FileItem[] = [
          {
            id: "leetcode-pdf",
            name: "leetcode.pdf",
            type: "file",
            icon: "i-heroicons-document",
            size: "1.4 MB",
            modified: "Today",
            preview: "finder/documents/leetcode.pdf",
            path: "~/Documents/leetcode.pdf"
          },
          {
            id: "rail-pdf",
            name: "rail.pdf",
            type: "file",
            icon: "i-heroicons-document",
            size: "405 KB",
            modified: "Yesterday",
            preview: "finder/documents/rail.pdf",
            path: "~/Documents/rail.pdf"
          }
        ];
        setFiles(documentFiles);
      } else if (locationId === "pictures") {
        // Load pictures from public/finder/pictures
        const pictureFiles: FileItem[] = [
          {
            id: "picture-1",
            name: "1.jpg",
            type: "file",
            icon: "i-heroicons-photo",
            size: "233 KB",
            modified: "Today",
            preview: "finder/pictures/1.jpg",
            path: "~/Pictures/1.jpg"
          },
          {
            id: "picture-2",
            name: "2.jpg",
            type: "file",
            icon: "i-heroicons-photo",
            size: "177 KB",
            modified: "Today",
            preview: "finder/pictures/2.jpg",
            path: "~/Pictures/2.jpg"
          },
          {
            id: "picture-3",
            name: "3.jpg",
            type: "file",
            icon: "i-heroicons-photo",
            size: "461 KB",
            modified: "Yesterday",
            preview: "finder/pictures/3.jpg",
            path: "~/Pictures/3.jpg"
          },
          {
            id: "picture-4",
            name: "4.jpg",
            type: "file",
            icon: "i-heroicons-photo",
            size: "258 KB",
            modified: "Yesterday",
            preview: "finder/pictures/4.jpg",
            path: "~/Pictures/4.jpg"
          },
          {
            id: "picture-5",
            name: "5.jpg",
            type: "file",
            icon: "i-heroicons-photo",
            size: "14.1 MB",
            modified: "2 days ago",
            preview: "finder/pictures/5.jpg",
            path: "~/Pictures/5.jpg"
          }
        ];
        setFiles(pictureFiles);
      } else if (locationId === "downloads") {
        // Load downloads from public/finder/downloads
        const downloadFiles: FileItem[] = [
          {
            id: "batman-trailer",
            name: "Hugging Face.png", 
            type: "file",
            icon: "i-heroicons-film",
            size: "9.2 MB",
            modified: "Today",
            preview: "finder/downloads/Hugging Face.png",
            path: "~/Downloads/Hugging Face.png"
          }
        ];
        setFiles(downloadFiles);
      } else {
        // For other locations, show empty or sample files
        setFiles([]);
      }
      
      // Update path history
      const newHistory = pathHistory.slice(0, currentPathIndex + 1);
      setPathHistory([...newHistory, location.name]);
      setCurrentPathIndex(newHistory.length);
    }
  };

  const openItem = (itemId: string) => {
    const item = files.find(f => f.id === itemId);
    if (item) {
      if (item.type === "folder") {
        if (item.name === "Projects") {
          navigateToLocation("projects");
        } else if (item.name === "Documents") {
          navigateToLocation("documents");
        } else if (item.name === "Pictures") {
          navigateToLocation("pictures");
        } else if (item.name === "Downloads") {
          navigateToLocation("downloads");
        } else {
          // Handle other folders
          setCurrentFolder(item.name);
          setFiles([]); // Empty for now
        }
      } else if (item.type === "file" && item.link) {
        window.open(item.link, '_blank');
      } else if (item.type === "file" && item.preview) {
        // For files with previews (PDFs, images), open them in a new tab
        window.open(item.preview, '_blank');
      }
    }
  };

  const navigateBack = () => {
    if (currentPathIndex > 0) {
      setCurrentPathIndex(currentPathIndex - 1);
      const previousPath = pathHistory[currentPathIndex - 1];
      setCurrentFolder(previousPath);
      
      if (previousPath === "Desktop") {
        setFiles(desktopItems);
        setSelectedLocation("desktop");
      } else if (previousPath === "Projects") {
        navigateToLocation("projects");
      }
    }
  };

  const navigateForward = () => {
    if (currentPathIndex < pathHistory.length - 1) {
      setCurrentPathIndex(currentPathIndex + 1);
      const nextPath = pathHistory[currentPathIndex + 1];
      setCurrentFolder(nextPath);
      
      if (nextPath === "Desktop") {
        setFiles(desktopItems);
        setSelectedLocation("desktop");
      } else if (nextPath === "Projects") {
        navigateToLocation("projects");
      }
    }
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderIconView = () => (
    <div className="p-4 grid grid-cols-6 lg:grid-cols-8 gap-4">
      {filteredFiles.map(file => (
        <motion.div
          key={file.id}
          className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition-colors ${
            selectedItem === file.id 
              ? 'bg-blue-500/20 dark:bg-blue-600/30' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          onClick={() => setSelectedItem(file.id)}
          onDoubleClick={() => openItem(file.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-16 h-16 flex items-center justify-center mb-2">
            {file.preview ? (
              <img 
                src={file.preview} 
                alt={file.name}
                className="w-full h-full object-cover rounded"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <span className={`${file.icon} text-4xl ${
              file.type === 'folder' ? 'text-blue-500' : 
              file.type === 'app' ? 'text-purple-500' : 'text-gray-600'
            } ${file.preview ? 'hidden' : ''}`} />
          </div>
          <span className="text-xs text-center truncate w-full">{file.name}</span>
        </motion.div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="flex flex-col">
      <div className="grid grid-cols-12 gap-4 p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400">
        <div className="col-span-6">Name</div>
        <div className="col-span-2">Date Modified</div>
        <div className="col-span-2">Size</div>
        <div className="col-span-2">Kind</div>
      </div>
      <div className="flex-1">
        {filteredFiles.map(file => (
          <motion.div
            key={file.id}
            className={`grid grid-cols-12 gap-4 p-3 border-b border-gray-100 dark:border-gray-800 cursor-pointer transition-colors ${
              selectedItem === file.id 
                ? 'bg-blue-500/20 dark:bg-blue-600/30' 
                : 'hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
            onClick={() => setSelectedItem(file.id)}
            onDoubleClick={() => openItem(file.id)}
            whileHover={{ backgroundColor: dark ? "rgba(55, 65, 81, 0.5)" : "rgba(249, 250, 251, 0.8)" }}
          >
            <div className="col-span-6 flex items-center">
              <span className={`${file.icon} mr-3 ${
                file.type === 'folder' ? 'text-blue-500' : 
                file.type === 'app' ? 'text-purple-500' : 'text-gray-600'
              }`} />
              <span className="truncate text-sm">{file.name}</span>
            </div>
            <div className="col-span-2 text-sm text-gray-600 dark:text-gray-400">{file.modified || "--"}</div>
            <div className="col-span-2 text-sm text-gray-600 dark:text-gray-400">{file.size || "--"}</div>
            <div className="col-span-2 text-sm text-gray-600 dark:text-gray-400 capitalize">{file.type}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="finder-window h-full flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Toolbar */}
      <div className="toolbar h-12 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
        <div className="flex items-center space-x-2">
          <button 
            onClick={navigateBack}
            disabled={currentPathIndex === 0}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="i-heroicons-chevron-left text-lg" />
          </button>
          <button 
            onClick={navigateForward}
            disabled={currentPathIndex >= pathHistory.length - 1}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="i-heroicons-chevron-right text-lg" />
          </button>
        </div>
        
        <div className="flex-1 flex justify-center">
          <div className="flex items-center space-x-1 bg-white dark:bg-gray-700 rounded-lg px-3 py-1 border border-gray-300 dark:border-gray-600">
            <span className="i-heroicons-magnifying-glass text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm w-64"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <button 
            onClick={() => setCurrentView("icons")}
            className={`p-1.5 rounded ${currentView === "icons" ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            <span className="i-heroicons-squares-2x2" />
          </button>
          <button 
            onClick={() => setCurrentView("list")}
            className={`p-1.5 rounded ${currentView === "list" ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            <span className="i-heroicons-list-bullet" />
          </button>
        </div>
      </div>

      {/* Path bar */}
      <div className="path-bar h-8 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 text-sm text-gray-600 dark:text-gray-400">
        <span className="i-heroicons-home mr-2" />
        <span>{currentFolder}</span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="sidebar w-48 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-3">
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Favorites</h3>
              <div className="space-y-1">
                {sidebarItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => navigateToLocation(item.id)}
                    className={`w-full flex items-center p-2 rounded text-sm transition-colors ${
                      selectedLocation === item.id 
                        ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' 
                        : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className={`${item.icon} mr-3`} />
                    <span className="truncate">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {currentView === "icons" && renderIconView()}
              {currentView === "list" && renderListView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Status bar */}
      <div className="status-bar h-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 text-xs text-gray-500 dark:text-gray-400">
        <span>{filteredFiles.length} items</span>
        <span>Available: 256 GB</span>
      </div>
    </div>
  );
};

export default Finder;
