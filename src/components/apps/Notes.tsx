import React, { useState } from "react";

interface Note {
  id: string;
  title: string;
  content: string;
  created: string;
  updated: string;
  folder: string;
  pinned?: boolean;
  locked?: boolean;
}

interface Folder {
  id: string;
  name: string;
  count: number;
  isSmartFolder?: boolean;
}

const Notes = () => {
  const [selectedFolder, setSelectedFolder] = useState("notes");
  const [selectedNote, setSelectedNote] = useState<string | null>("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentContent, setCurrentContent] = useState("");
  
  // Sample folders
  const folders: Folder[] = [
    { id: "notes", name: "Notes", count: 15 },
    { id: "recent", name: "Recently Deleted", count: 2, isSmartFolder: true },
    { id: "personal", name: "Personal", count: 8 },
    { id: "work", name: "Work", count: 5 },
    { id: "ideas", name: "Ideas", count: 2 }
  ];
  
  // Sample notes
  const notes: Note[] = [
    {
      id: "1",
      title: "Project Ideas",
      content: "# Project Ideas\n\n## AI-Powered Recipe Generator\nCreate an app that suggests recipes based on ingredients you have at home.\n\n## Blockchain Voting System\nSecure and transparent voting system using blockchain technology.\n\n## Augmented Reality Shopping\nAR app that lets users visualize products in their home before buying.",
      created: "May 30, 2025",
      updated: "May 30, 2025",
      folder: "notes",
      pinned: true
    },
    {
      id: "2",
      title: "Meeting Notes - Product Team",
      content: "# Meeting Notes: Product Team\n\nDate: May 28, 2025\nAttendees: Alex, Jamie, Taylor, Jordan\n\n## Agenda\n1. Q3 roadmap review\n2. Feature prioritization\n3. User feedback analysis\n\n## Decisions\n- Postpone the analytics dashboard to Q4\n- Prioritize mobile app redesign\n- Schedule user testing for new checkout flow",
      created: "May 28, 2025",
      updated: "May 29, 2025",
      folder: "work"
    },
    {
      id: "3",
      title: "Books to Read",
      content: "# Reading List\n\n- Atomic Habits by James Clear\n- Deep Work by Cal Newport\n- Project Hail Mary by Andy Weir\n- The Psychology of Money by Morgan Housel\n- The Midnight Library by Matt Haig\n\n## Currently Reading\nKlara and the Sun by Kazuo Ishiguro",
      created: "May 25, 2025",
      updated: "May 26, 2025",
      folder: "personal"
    },
    {
      id: "4",
      title: "Vacation Planning",
      content: "# Summer Vacation Ideas\n\n## Japan Trip\n- Tokyo: 4 days\n- Kyoto: 3 days\n- Osaka: 2 days\n\n## Budget\n- Flights: $1,200\n- Accommodation: $1,500\n- Food & Activities: $1,000\n- Transportation: $300\n\n## Packing List\n- Passport\n- JR Pass\n- Portable Wi-Fi\n- Universal adapter\n- Comfortable walking shoes",
      created: "May 22, 2025",
      updated: "May 24, 2025",
      folder: "personal"
    },
    {
      id: "5",
      title: "Weekly Goals",
      content: "# Weekly Goals: May 29 - June 4\n\n## Work\n- Complete prototype for new feature\n- Review pull requests\n- Prepare presentation for stakeholders\n\n## Personal\n- Gym: 3x this week\n- Finish reading 'Atomic Habits'\n- Call parents\n\n## Learning\n- Complete React advanced patterns course\n- Start TypeScript tutorial",
      created: "May 29, 2025",
      updated: "May 29, 2025",
      folder: "personal",
      pinned: true
    }
  ];
  
  const filteredNotes = notes.filter(note => 
    (selectedFolder === "notes" || note.folder === selectedFolder) &&
    (searchQuery === "" || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      note.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const getSelectedNote = () => {
    return notes.find(note => note.id === selectedNote);
  };
  
  const handleNoteSelect = (noteId: string) => {
    const note = notes.find(note => note.id === noteId);
    setSelectedNote(noteId);
    setCurrentContent(note?.content || "");
    setIsEditing(false);
  };
  
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentContent(e.target.value);
  };
  
  return (
    <div className="notes-container h-full flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Toolbar */}
      <div className="notes-toolbar h-12 flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <button className="toolbar-btn w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800">
            <span className="i-heroicons-plus" />
          </button>
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1" />
          <button 
            className={`toolbar-btn w-8 h-8 rounded-md flex items-center justify-center ${isEditing ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onClick={handleEditToggle}
          >
            <span className="i-heroicons-pencil-square" />
          </button>
          <button className="toolbar-btn w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800">
            <span className="i-heroicons-trash" />
          </button>
          <button className="toolbar-btn w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800">
            <span className="i-heroicons-folder" />
          </button>
        </div>
        
        <div className="ml-auto flex items-center space-x-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-gray-100 dark:bg-gray-800 rounded-md px-8 py-1.5 text-sm w-48 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-2 top-1.5 text-gray-400 i-heroicons-magnifying-glass" />
            {searchQuery && (
              <button 
                className="absolute right-2 top-1.5 text-gray-400 i-heroicons-x-mark"
                onClick={() => setSearchQuery("")}
              />
            )}
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="notes-sidebar w-48 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="folders p-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Folders</h3>
            <div className="space-y-1">
              {folders.map(folder => (
                <div 
                  key={folder.id}
                  className={`p-1.5 rounded flex items-center justify-between text-sm cursor-pointer ${
                    selectedFolder === folder.id ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setSelectedFolder(folder.id)}
                >
                  <div className="flex items-center">
                    <span className={`${folder.isSmartFolder ? 'i-heroicons-clock' : 'i-heroicons-folder'} mr-2 ${
                      folder.isSmartFolder ? 'text-gray-500' : 'text-yellow-500'
                    }`} />
                    <span className="truncate">{folder.name}</span>
                  </div>
                  <span className="text-xs text-gray-500">{folder.count}</span>
                </div>
              ))}
              <div className="p-1.5 rounded flex items-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-blue-600 dark:text-blue-400">
                <span className="i-heroicons-plus mr-2" />
                <span>New Folder</span>
              </div>
            </div>
          </div>
          
          <div className="tags p-3">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tags</h3>
            <div className="space-y-1">
              <div className="p-1.5 rounded flex items-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                <span>Important</span>
              </div>
              <div className="p-1.5 rounded flex items-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                <span>Work</span>
              </div>
              <div className="p-1.5 rounded flex items-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                <span>Ideas</span>
              </div>
              <div className="p-1.5 rounded flex items-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-blue-600 dark:text-blue-400">
                <span className="i-heroicons-plus mr-2" />
                <span>New Tag</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Notes List */}
        <div className="notes-list w-60 overflow-y-auto border-r border-gray-200 dark:border-gray-700">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-sm font-medium">{folders.find(f => f.id === selectedFolder)?.name || "All Notes"}</h2>
            <div className="text-xs text-gray-500">
              {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''}
            </div>
          </div>
          <div className="notes-list-items">
            {filteredNotes.map(note => (
              <div 
                key={note.id}
                className={`p-3 border-b border-gray-200 dark:border-gray-700 cursor-pointer ${
                  selectedNote === note.id ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
                onClick={() => handleNoteSelect(note.id)}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium truncate">{note.title}</h3>
                  {note.pinned && (
                    <span className="i-heroicons-pin text-yellow-600 dark:text-yellow-500" />
                  )}
                </div>
                <div className="text-xs text-gray-500 mb-1">{note.updated}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {note.content.replace(/^#+ .*$/m, '').trim()}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Note Content */}
        <div className="note-content flex-1 overflow-hidden flex flex-col">
          {selectedNote ? (
            <>
              <div className="note-header p-3 border-b border-gray-200 dark:border-gray-700">
                <h1 className="text-lg font-medium">{getSelectedNote()?.title}</h1>
                <div className="text-xs text-gray-500">
                  Edited {getSelectedNote()?.updated}
                </div>
              </div>
              
              {isEditing ? (
                <textarea 
                  className="flex-1 p-4 resize-none focus:outline-none bg-white dark:bg-gray-900"
                  value={currentContent}
                  onChange={handleContentChange}
                />
              ) : (
                <div className="note-markdown flex-1 p-4 overflow-y-auto">
                  {currentContent.split('\n').map((line, i) => {
                    if (line.startsWith('# ')) {
                      return <h1 key={i} className="text-2xl font-bold mt-4 mb-2">{line.substring(2)}</h1>;
                    } else if (line.startsWith('## ')) {
                      return <h2 key={i} className="text-xl font-semibold mt-3 mb-2">{line.substring(3)}</h2>;
                    } else if (line.startsWith('### ')) {
                      return <h3 key={i} className="text-lg font-medium mt-3 mb-1">{line.substring(4)}</h3>;
                    } else if (line.startsWith('- ')) {
                      return <div key={i} className="flex ml-2 mb-1"><span className="mr-2">•</span>{line.substring(2)}</div>;
                    } else if (line === '') {
                      return <div key={i} className="h-4" />;
                    } else {
                      return <p key={i} className="mb-2">{line}</p>;
                    }
                  })}
                </div>
              )}
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="i-heroicons-document-text text-6xl mb-4 mx-auto" />
                <h3 className="text-xl font-medium mb-2">No Note Selected</h3>
                <p className="text-sm max-w-md">Select a note from the list or create a new one</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
