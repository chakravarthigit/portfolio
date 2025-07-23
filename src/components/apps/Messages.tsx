import React, { useState } from "react";

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  status?: "online" | "offline" | "away";
  lastMessage?: string;
  lastMessageTime?: string;
  unread?: number;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status?: "sent" | "delivered" | "read";
  isMe?: boolean;
}

interface Conversation {
  id: string;
  participants: Contact[];
  messages: Message[];
}

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string>("1");
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample contacts
  const contacts: Contact[] = [
    {
      id: "1",
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      status: "online",
      lastMessage: "See you tomorrow at the meeting!",
      lastMessageTime: "10:42 AM",
      unread: 2
    },
    {
      id: "2",
      name: "Sara Williams",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      status: "online",
      lastMessage: "That sounds like a great idea.",
      lastMessageTime: "Yesterday",
      unread: 0
    },
    {
      id: "3",
      name: "Mike Chen",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      status: "away",
      lastMessage: "Did you finish the project?",
      lastMessageTime: "Yesterday",
      unread: 0
    },
    {
      id: "4",
      name: "Jessica Taylor",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      status: "offline",
      lastMessage: "Happy birthday! 🎂🎉",
      lastMessageTime: "Sunday",
      unread: 0
    },
    {
      id: "5",
      name: "David Wilson",
      avatar: "https://randomuser.me/api/portraits/men/29.jpg",
      status: "online",
      lastMessage: "Let me know when you're free",
      lastMessageTime: "May 27",
      unread: 0
    }
  ];
  
  // Sample conversations
  const conversations: Conversation[] = [
    {
      id: "1",
      participants: [contacts[0]],
      messages: [
        {
          id: "1",
          senderId: "1",
          text: "Hey there! How's your project coming along?",
          timestamp: "10:30 AM",
          status: "read"
        },
        {
          id: "2",
          senderId: "current-user",
          text: "It's going well! I've just finished the first phase.",
          timestamp: "10:35 AM",
          status: "read",
          isMe: true
        },
        {
          id: "3",
          senderId: "1",
          text: "That's great to hear! Are we still on for tomorrow's meeting?",
          timestamp: "10:38 AM",
          status: "read"
        },
        {
          id: "4",
          senderId: "current-user",
          text: "Absolutely, I've prepared all the materials we'll need.",
          timestamp: "10:40 AM",
          status: "read",
          isMe: true
        },
        {
          id: "5",
          senderId: "1",
          text: "Perfect! See you tomorrow at the meeting!",
          timestamp: "10:42 AM",
          status: "delivered"
        }
      ]
    },
    {
      id: "2",
      participants: [contacts[1]],
      messages: [
        {
          id: "1",
          senderId: "current-user",
          text: "I was thinking about redesigning the homepage. What do you think?",
          timestamp: "Yesterday, 3:15 PM",
          status: "read",
          isMe: true
        },
        {
          id: "2",
          senderId: "2",
          text: "That sounds like a great idea.",
          timestamp: "Yesterday, 3:20 PM",
          status: "read"
        }
      ]
    },
    {
      id: "3",
      participants: [contacts[2]],
      messages: [
        {
          id: "1",
          senderId: "3",
          text: "How's the progress on the database migration?",
          timestamp: "Yesterday, 11:05 AM",
          status: "read"
        },
        {
          id: "2",
          senderId: "current-user",
          text: "I've completed about 75% of it. Should be done by tomorrow.",
          timestamp: "Yesterday, 11:10 AM",
          status: "read",
          isMe: true
        },
        {
          id: "3",
          senderId: "3",
          text: "Did you finish the project?",
          timestamp: "Yesterday, 4:30 PM",
          status: "delivered"
        }
      ]
    },
    {
      id: "4",
      participants: [contacts[3]],
      messages: [
        {
          id: "1",
          senderId: "4",
          text: "Happy birthday! 🎂🎉",
          timestamp: "Sunday, 9:00 AM",
          status: "read"
        },
        {
          id: "2",
          senderId: "current-user",
          text: "Thank you so much! 😊",
          timestamp: "Sunday, 9:15 AM",
          status: "read",
          isMe: true
        }
      ]
    },
    {
      id: "5",
      participants: [contacts[4]],
      messages: [
        {
          id: "1",
          senderId: "current-user",
          text: "Do you have time for a quick call this week?",
          timestamp: "May 27, 2:10 PM",
          status: "read",
          isMe: true
        },
        {
          id: "2",
          senderId: "5",
          text: "Let me know when you're free",
          timestamp: "May 27, 2:30 PM",
          status: "read"
        }
      ]
    }
  ];
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (contact.lastMessage && contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const getSelectedConversation = () => {
    return conversations.find(conv => conv.id === selectedConversation);
  };
  
  const getContact = (contactId: string) => {
    return contacts.find(contact => contact.id === contactId);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageText.trim()) return;
    
    // In a real app, this would update state
    console.log(`Sending message to conversation ${selectedConversation}: ${messageText}`);
    setMessageText("");
  };
  
  return (
    <div className="messages-container h-full flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Main content */}
      <div className="messages-content flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="messages-sidebar w-72 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Search bar */}
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full bg-gray-100 dark:bg-gray-800 rounded-md px-8 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
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
          
          {/* Conversations list */}
          <div className="flex-1 overflow-y-auto">
            {filteredContacts.map(contact => (
              <div 
                key={contact.id}
                className={`p-3 border-b border-gray-200 dark:border-gray-700 cursor-pointer ${
                  selectedConversation === contact.id ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
                onClick={() => setSelectedConversation(contact.id)}
              >
                <div className="flex items-start">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700">
                      {contact.avatar ? (
                        <img 
                          src={contact.avatar} 
                          alt={contact.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 font-semibold text-lg">
                          {contact.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    {contact.status && (
                      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${
                        contact.status === 'online' ? 'bg-green-500' : 
                        contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                      }`} />
                    )}
                  </div>
                  
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium truncate">{contact.name}</span>
                      <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {contact.lastMessage}
                      </p>
                      {contact.unread && contact.unread > 0 && (
                        <span className="ml-2 flex-shrink-0 bg-blue-500 text-white text-xs font-medium rounded-full h-5 min-w-5 flex items-center justify-center px-1">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* New conversation button */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium flex items-center justify-center">
              <span className="i-heroicons-pencil-square mr-2" />
              <span>New Message</span>
            </button>
          </div>
        </div>
        
        {/* Conversation */}
        <div className="conversation-area flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Conversation header */}
              <div className="conversation-header p-3 border-b border-gray-200 dark:border-gray-700 flex items-center">
                {getSelectedConversation()?.participants.map(participant => (
                  <div key={participant.id} className="flex items-center">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700">
                        {participant.avatar ? (
                          <img 
                            src={participant.avatar} 
                            alt={participant.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500 font-semibold">
                            {participant.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      {participant.status && (
                        <div className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white dark:border-gray-900 ${
                          participant.status === 'online' ? 'bg-green-500' : 
                          participant.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`} />
                      )}
                    </div>
                    
                    <div className="ml-2">
                      <div className="font-medium">{participant.name}</div>
                      <div className="text-xs text-gray-500">
                        {participant.status === 'online' ? 'Active now' : 
                          participant.status === 'away' ? 'Away' : 'Offline'}
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="ml-auto flex items-center space-x-2">
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <span className="i-heroicons-phone" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <span className="i-heroicons-video-camera" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                    <span className="i-heroicons-information-circle" />
                  </button>
                </div>
              </div>
              
              {/* Messages */}
              <div className="messages-list flex-1 overflow-y-auto p-4 space-y-3">
                {getSelectedConversation()?.messages.map(message => {
                  const sender = message.isMe ? null : getContact(message.senderId);
                  
                  return (
                    <div 
                      key={message.id}
                      className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      {!message.isMe && (
                        <div className="flex-shrink-0 mr-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700">
                            {sender?.avatar ? (
                              <img 
                                src={sender.avatar} 
                                alt={sender.name} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-500 font-semibold">
                                {sender?.name.charAt(0)}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className={`max-w-xs lg:max-w-md ${message.isMe ? 'order-1' : 'order-2'}`}>
                        <div className={`p-3 rounded-2xl ${
                          message.isMe ? 
                            'bg-blue-500 text-white rounded-br-none' : 
                            'bg-gray-200 dark:bg-gray-800 rounded-bl-none'
                        }`}>
                          <p>{message.text}</p>
                        </div>
                        <div className={`mt-1 text-xs ${message.isMe ? 'text-right' : ''}`}>
                          <span className="text-gray-500">{message.timestamp}</span>
                          {message.isMe && message.status && (
                            <span className="ml-1">
                              {message.status === 'sent' ? (
                                <span className="i-heroicons-check text-gray-400" />
                              ) : message.status === 'delivered' ? (
                                <span className="i-heroicons-check text-gray-400" />
                              ) : (
                                <span className="i-heroicons-check text-blue-500" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Message input */}
              <div className="message-input p-3 border-t border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <button type="button" className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                    <span className="i-heroicons-photo" />
                  </button>
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      placeholder="iMessage" 
                      className="w-full bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                    />
                    <button type="button" className="absolute right-3 top-2 text-gray-400 hover:text-gray-600">
                      <span className="i-heroicons-face-smile" />
                    </button>
                  </div>
                  <button 
                    type="submit" 
                    className={`p-2 rounded-full ${
                      messageText.trim() ? 'text-blue-500 hover:text-blue-600' : 'text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!messageText.trim()}
                  >
                    <span className="i-heroicons-paper-airplane" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="i-heroicons-chat-bubble-left-right text-6xl mb-4 mx-auto" />
                <h3 className="text-xl font-medium mb-2">No Conversation Selected</h3>
                <p className="text-sm max-w-md">Select a conversation from the list or start a new one</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
