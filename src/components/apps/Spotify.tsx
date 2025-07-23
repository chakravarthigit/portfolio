import React, { useState, useEffect } from "react";
import { useStore } from "~/stores";
import { motion, AnimatePresence } from "framer-motion";

const Spotify = () => {
  const dark = useStore((state) => state.dark);
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Handle scroll shadow effect
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(e.currentTarget.scrollTop);
  };

  return (
    <div className="spotify-container h-full w-full bg-gradient-to-b from-[#121212] to-[#121212] text-white flex flex-col">
      {/* Header with blur effect on scroll */}
      <div className={`spotify-header sticky top-0 z-10 px-6 py-4 flex items-center justify-between transition-all duration-300 ${scrollPosition > 10 ? 'bg-[#121212]/95 backdrop-blur-md shadow-md' : ''}`}>
        <div className="flex items-center space-x-4">
          <div className="navigation-controls flex space-x-2">
            <motion.button 
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
              <span className="i-heroicons-chevron-left text-xl" />
            </motion.button>
            <motion.button 
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
              <span className="i-heroicons-chevron-right text-xl" />
            </motion.button>
          </div>
          <div className="search-box relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <span className="i-heroicons-magnifying-glass text-sm" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#242424] hover:bg-[#2a2a2a] focus:bg-[#2a2a2a] transition-colors rounded-full pl-9 pr-4 py-2 text-sm outline-none w-64 focus:ring-2 focus:ring-white/30"
            />
          </div>
        </div>
        <div className="user-profile flex items-center space-x-3">
          <motion.button 
            whileHover={{ backgroundColor: "rgba(30, 215, 96, 0.8)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#1ed760] text-black rounded-full px-4 py-1.5 text-sm font-bold">
            Upgrade
          </motion.button>
          <motion.div 
            whileHover={{ backgroundColor: "rgba(40, 40, 40, 0.8)" }}
            className="w-8 h-8 rounded-full bg-[#282828] flex items-center justify-center cursor-pointer">
            <span className="font-bold text-sm">CG</span>
          </motion.div>
        </div>
      </div>
      
      {/* Main content with smooth scrolling */}
      <div 
        className="spotify-content flex-1 overflow-auto px-6 py-4 hide-scrollbar" 
        onScroll={handleScroll}>
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold mb-6">My Tracks
        </motion.h1>
        
        <div className="spotify-embeds space-y-6">
          {/* Spotify Embeds with animations */}
          {[
            "https://open.spotify.com/embed/track/635LbaTSewlcNRMXrnwAdg?utm_source=generator",
            "https://open.spotify.com/embed/track/1mOCb1w5n62jLGHJqpGL2W?utm_source=generator",
            "https://open.spotify.com/embed/track/2LcXJP95e4HKydTZ2mYfrx?utm_source=generator",
            "https://open.spotify.com/embed/track/11lFSEnkj3810ojPLj53RO?utm_source=generator"
          ].map((trackUrl, index) => (
            <motion.div 
              key={`track-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="spotify-embed-container"
              onMouseEnter={() => setHoveredTrack(index)}
              onMouseLeave={() => setHoveredTrack(null)}
            >
              <motion.div 
                className="relative overflow-hidden rounded-xl"
                whileHover={{ scale: 1.005 }}
                transition={{ duration: 0.2 }}
              >
                <iframe 
                  style={{borderRadius: "12px"}} 
                  src={trackUrl}
                  width="100%" 
                  height="152" 
                  frameBorder="0" 
                  allowFullScreen 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  className="z-0"
                ></iframe>
                {hoveredTrack === index && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/10 pointer-events-none z-10"
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      

    </div>
  );
};

export default Spotify;
