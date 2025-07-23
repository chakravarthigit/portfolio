import React, { useState } from "react";

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  starred: boolean;
  category?: string;
}

interface Folder {
  id: string;
  name: string;
  icon: string;
  count?: number;
}

const Mail = () => {
  const [selectedFolder, setSelectedFolder] = useState("inbox");
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const folders: Folder[] = [
    { id: "inbox", name: "Inbox", icon: "i-heroicons-inbox", count: 3 },
    { id: "drafts", name: "Drafts", icon: "i-heroicons-document-text" },
    { id: "sent", name: "Sent", icon: "i-heroicons-paper-airplane" },
    { id: "junk", name: "Junk", icon: "i-heroicons-exclamation-circle" },
    { id: "trash", name: "Trash", icon: "i-heroicons-trash" },
    { id: "archive", name: "Archive", icon: "i-heroicons-archive-box" }
  ];

  const emails: Email[] = [
    {
      id: "1",
      from: "Apple",
      subject: "Your Apple ID receipt",
      preview: "Thank you for your purchase. Your receipt is attached to this email.",
      date: "May 28",
      read: false,
      starred: true,
      category: "Promotions"
    },
    {
      id: "2",
      from: "GitHub",
      subject: "Security alert for your repository",
      preview: "We've detected a vulnerability in one of your dependencies.",
      date: "May 27",
      read: true,
      starred: false
    },
    {
      id: "3",
      from: "LinkedIn",
      subject: "Jobs for you: Full-Stack Developer",
      preview: "Based on your profile, we think these jobs might interest you.",
      date: "May 25",
      read: true,
      starred: false,
      category: "Social"
    },
    {
      id: "4",
      from: "Spotify",
      subject: "Your weekly mixtape is ready",
      preview: "Check out your personalized playlist with new music we think you'll love.",
      date: "May 23",
      read: false,
      starred: true,
      category: "Updates"
    },
    {
      id: "5",
      from: "Chakravarthi Guduru",
      subject: "Project update: Portfolio website",
      preview: "I've made some changes to the portfolio website. Please review when you get a chance.",
      date: "May 20",
      read: true,
      starred: true
    }
  ];
  
  const filteredEmails = emails.filter(email => 
    email.from.toLowerCase().includes(searchQuery.toLowerCase()) || 
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getSelectedEmail = () => {
    return emails.find(email => email.id === selectedEmail);
  };
  
  return (
    <div className="mail-container h-full flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Toolbar */}
      <div className="mail-toolbar h-12 flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <button className="toolbar-btn w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800">
            <span className="i-heroicons-trash" />
          </button>
          <button className="toolbar-btn w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800">
            <span className="i-heroicons-archive-box" />
          </button>
          <button className="toolbar-btn w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800">
            <span className="i-heroicons-folder" />
          </button>
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1" />
          <button className="toolbar-btn w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800">
            <span className="i-heroicons-reply" />
          </button>
          <button className="toolbar-btn w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800">
            <span className="i-heroicons-arrow-path" />
          </button>
        </div>
        
        <div className="ml-auto flex items-center space-x-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-gray-100 dark:bg-gray-800 rounded-md px-8 py-1 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <button className="toolbar-btn w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800">
            <span className="i-heroicons-cog-6-tooth" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="mail-sidebar w-48 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-1.5 px-4 w-full flex items-center justify-center">
              <span className="i-heroicons-pencil-square mr-2" />
              <span>Compose</span>
            </button>
          </div>
          <div className="px-2">
            {folders.map(folder => (
              <div 
                key={folder.id}
                className={`p-2 rounded-md flex items-center cursor-pointer ${
                  selectedFolder === folder.id ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setSelectedFolder(folder.id)}
              >
                <span className={`${folder.icon} mr-2`} />
                <span className="flex-1">{folder.name}</span>
                {folder.count && (
                  <span className="text-xs font-semibold">{folder.count}</span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 px-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Categories</h3>
            <div className="flex flex-col space-y-1">
              <div className="p-1.5 flex items-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer">
                <span className="w-3 h-3 rounded-full bg-red-400 mr-2" />
                <span>Important</span>
              </div>
              <div className="p-1.5 flex items-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer">
                <span className="w-3 h-3 rounded-full bg-blue-400 mr-2" />
                <span>Social</span>
              </div>
              <div className="p-1.5 flex items-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer">
                <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2" />
                <span>Promotions</span>
              </div>
              <div className="p-1.5 flex items-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer">
                <span className="w-3 h-3 rounded-full bg-green-400 mr-2" />
                <span>Updates</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Email List */}
        <div className="mail-list w-72 overflow-y-auto border-r border-gray-200 dark:border-gray-700">
          <div className="mail-list-header p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between">
            <h2 className="text-sm font-semibold">{selectedFolder.charAt(0).toUpperCase() + selectedFolder.slice(1)}</h2>
            <div className="text-xs text-gray-500">
              {filteredEmails.length} message{filteredEmails.length !== 1 ? 's' : ''}
            </div>
          </div>
          <div className="mail-list-items">
            {filteredEmails.map(email => (
              <div 
                key={email.id}
                className={`py-3 px-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer ${
                  selectedEmail === email.id ? 'bg-blue-50 dark:bg-blue-900/30' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                } ${!email.read ? 'font-semibold' : ''}`}
                onClick={() => setSelectedEmail(email.id)}
              >
                <div className="flex items-center mb-1">
                  <span className={`mr-2 ${email.starred ? 'text-yellow-400 i-heroicons-star-solid' : 'text-gray-400 i-heroicons-star'}`} />
                  <span className="text-sm truncate">{email.from}</span>
                  <span className="ml-auto text-xs text-gray-500">{email.date}</span>
                </div>
                <div className="text-sm font-medium mb-1 truncate">{email.subject}</div>
                <div className="text-xs text-gray-500 truncate">{email.preview}</div>
                {email.category && (
                  <div className="mt-1.5">
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      email.category === 'Social' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' :
                      email.category === 'Promotions' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' :
                      'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                    }`}>
                      {email.category}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Email Content */}
        <div className="mail-content flex-1 overflow-y-auto p-6">
          {selectedEmail ? (
            <div className="email-view">
              <div className="email-header mb-6">
                <h1 className="text-2xl font-semibold mb-4">{getSelectedEmail()?.subject}</h1>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-semibold">
                    {getSelectedEmail()?.from.charAt(0)}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-baseline">
                      <span className="font-semibold">{getSelectedEmail()?.from}</span>
                      <span className="ml-auto text-sm text-gray-500">{getSelectedEmail()?.date}, 2025</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      To: <span className="text-blue-600 dark:text-blue-400">chakravarthiguduru@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="email-body">
                <p className="mb-4">Hello,</p>
                <p className="mb-4">{getSelectedEmail()?.preview}</p>
                <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, eu porttitor nisl nunc egestas nisi.</p>
                <p className="mb-4">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vivamus suscipit tortor eget felis porttitor volutpat.</p>
                <p className="mb-4">Best regards,<br />{getSelectedEmail()?.from}</p>
              </div>
              
              <div className="email-attachments mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold mb-3">Attachments (2)</h3>
                <div className="flex space-x-4">
                  <div className="attachment p-3 border border-gray-200 dark:border-gray-700 rounded-md w-48">
                    <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center mb-2">
                      <span className="i-heroicons-document text-4xl text-gray-400" />
                    </div>
                    <div className="text-sm font-medium truncate">Document.pdf</div>
                    <div className="text-xs text-gray-500">1.2 MB</div>
                  </div>
                  <div className="attachment p-3 border border-gray-200 dark:border-gray-700 rounded-md w-48">
                    <div className="h-24 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center mb-2">
                      <span className="i-heroicons-photo text-4xl text-gray-400" />
                    </div>
                    <div className="text-sm font-medium truncate">Image.jpg</div>
                    <div className="text-xs text-gray-500">850 KB</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="i-heroicons-envelope text-6xl mb-4 mx-auto" />
                <h3 className="text-xl font-medium mb-2">Select an email to read</h3>
                <p className="text-sm max-w-md">Click on any message from the list to view its contents</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mail;
