import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '~/stores';

// Import Finder component and openFolderInFinder function
import Finder, { openFolderInFinder } from '~/components/apps/Finder';

interface FolderData {
  id: string;
  name: string;
  icon: string;
  initialX: number;
  initialY: number;
  contents?: {
    name: string;
    type: 'file' | 'folder';
    size?: string;
    modified?: string;
    icon?: string;
  }[];
}

interface DesktopFoldersProps {
  folders: FolderData[];
  openApp: (id: string) => void;
}

const DesktopFolder: React.FC<{
  folder: FolderData;
  openApp: (id: string) => void;
}> = ({ folder, openApp }) => {
  const [position, setPosition] = useState({ x: folder.initialX, y: folder.initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Function to handle folder opening
  const handleFolderOpen = () => {
    // Set folder contents in Finder and open it
    if (folder.contents) {
      openFolderInFinder(folder.name, folder.contents);
    }
    
    // Open the Finder app
    openApp('finder');
  };

  return (
    <motion.div
      className="desktop-folder"
      style={{
        position: 'absolute',
        width: 90,
        height: 90,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isDragging ? 'grabbing' : (isHovered ? 'pointer' : 'default'),
        zIndex: isDragging ? 10 : 1,
      }}
      initial={{ x: folder.initialX, y: folder.initialY }}
      animate={{
        x: position.x,
        y: position.y,
        scale: isDragging ? 1.05 : isHovered ? 1.03 : 1,
      }}
      drag
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(e, info) => {
        setIsDragging(false);
        setPosition({
          x: position.x + info.offset.x,
          y: position.y + info.offset.y,
        });
      }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDoubleClick={handleFolderOpen}
    >
      <div 
        className="folder-icon mb-1 relative flex items-center justify-center"
        style={{
          filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
          transition: 'all 0.2s ease'
        }}
      >
        <img 
          src={folder.icon} 
          alt={folder.name} 
          width={60}
          height={60}
          draggable={false}
          className="select-none pointer-events-none"
        />
        
        {/* Hover effect */}
        {isHovered && (
          <motion.div 
            className="absolute inset-0 bg-white rounded-md" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
          />
        )}
      </div>
      
      <div 
        className={`folder-name text-center text-xs px-1.5 py-0.5 rounded-md ${
          isDragging || isHovered ? 'bg-blue-500 text-white' : 'text-white'
        }`}
        style={{
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          textShadow: '0 1px 2px rgba(0,0,0,0.5)',
          backdropFilter: isDragging || isHovered ? 'none' : 'blur(2px)',
          backgroundColor: isDragging || isHovered ? 'rgba(59, 130, 246, 0.9)' : 'rgba(0, 0, 0, 0.3)',
          transition: 'all 0.2s ease'
        }}
      >
        {folder.name}
      </div>
    </motion.div>
  );
};

const DesktopFolders: React.FC<DesktopFoldersProps> = ({ folders, openApp }) => {
  return (
    <div className="desktop-folders absolute inset-0 z-10 pointer-events-none">
      <div className="folders-container pointer-events-auto">
        {folders.map((folder) => (
          <DesktopFolder 
            key={folder.id} 
            folder={folder} 
            openApp={openApp}
          />
        ))}
      </div>
    </div>
  );
};

export default DesktopFolders;
