import React, { useState } from "react";

interface Show {
  id: string;
  title: string;
  image: string;
  year: string;
  category: string;
  description: string;
  rating?: number;
  episodes?: number;
  featured?: boolean;
}

interface Collection {
  id: string;
  title: string;
  shows: Show[];
}

const AppleTV = () => {
  const [activeTab, setActiveTab] = useState("watch-now");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedShow, setSelectedShow] = useState<string | null>(null);
  
  // Sample shows data
  const shows: Show[] = [
    {
      id: "1",
      title: "Avatar",
      image: "img/icons/launchpad/avatar.jpg",
      year: "2020",
      category: "Comedy",
      description: "A powerful, war-driven nation of firebenders aiming to conquer the world in Avatar: The Last Airbender..",
      rating: 8.8,
      episodes: 34,
      featured: true
    },
    {
      id: "2",
      title: "Batman",
      image: "img/icons/launchpad/Batman.jpg",
      year: "2022",
      category: "Sci-Fi",
      description: " A dark, gritty detective thriller starring Robert Pattinson as a younger Bruce Wayne uncovering corruption in Gotham while facing the Riddler.",
      rating: 8.7,
      episodes: 9,
      featured: true
    },
    {
      id: "3",
      title: "Foundation",
      image: "https://is1-ssl.mzstatic.com/image/thumb/Features112/v4/cc/43/0a/cc430a07-53ca-aeee-a5c3-e16e60f093ed/a896f935-ef06-4b68-bb07-9e2bc1bcc8c8.png/999x999bb.webp",
      year: "2021",
      category: "Sci-Fi",
      description: "A complex saga of humans scattered on planets throughout the galaxy all living under the rule of the Galactic Empire.",
      rating: 7.4,
      episodes: 10
    },
    {
      id: "4",
      title: "For All Mankind",
      image: "https://is1-ssl.mzstatic.com/image/thumb/BRxLtc6lVttuo9n_zK_Mdw/999x562.jpg",
      year: "2019",
      category: "Drama",
      description: "Explore what would have happened if the global space race had never ended.",
      rating: 8.0,
      episodes: 30
    },
    {
      id: "5",
      title: "Guntur Karam",
      image: "img/icons/launchpad/guntur.jpg",
      year: "2024",
      category: "Comedy",
      description: "A high-octane Telugu action drama starring Mahesh Babu, directed by Trivikram Srinivas, centered around intense family emotions and fiery confrontations.",
      rating: 9.1,
      episodes: 10,
      featured: true
    },
    {
      id: "6",
      title: "Prehistoric Planet",
      image: "https://is1-ssl.mzstatic.com/image/thumb/eK_mXUkF-85PwdN6q3_sSA/999x562.jpg",
      year: "2022",
      category: "Documentary",
      description: "Experience the wonders of our world like never before in this epic documentary series from Jon Favreau and the producers of Planet Earth.",
      rating: 8.6,
      episodes: 10
    },
    {
      id: "7",
      title: "The Morning Show",
      image: "https://is1-ssl.mzstatic.com/image/thumb/WGM1ZSbMcI2_UkZbJKbP5w/999x562.jpg",
      year: "2019",
      category: "Drama",
      description: "An inside look at the lives of the people who help America wake up in the morning, exploring the unique challenges faced by the men and women who carry out this daily televised ritual.",
      rating: 8.2,
      episodes: 20
    },
    {
      id: "8",
      title: "Slow Horses",
      image: "https://is1-ssl.mzstatic.com/image/thumb/Features116/v4/e6/d6/92/e6d692c0-a37b-2235-3130-b90b74ddb623/5b151880-2baa-4d99-a3c5-7e235bc4cbd8.png/999x999bb.webp",
      year: "2022",
      category: "Thriller",
      description: "A dysfunctional team of MI5 agents—and their obnoxious boss, the notorious Jackson Lamb—navigate the espionage world's smoke and mirrors to defend England from sinister forces.",
      rating: 8.5,
      episodes: 12
    }
  ];
  
  // Sample collections
  const collections: Collection[] = [
    {
      id: "featured",
      title: "Featured Shows",
      shows: shows.filter(show => show.featured)
    },
    {
      id: "recent",
      title: "New & Notable",
      shows: shows.slice(0, 4)
    },
    {
      id: "drama",
      title: "Drama Series",
      shows: shows.filter(show => show.category === "Drama")
    },
    {
      id: "scifi",
      title: "Science Fiction",
      shows: shows.filter(show => show.category === "Sci-Fi")
    }
  ];
  
  const filteredShows = searchQuery 
    ? shows.filter(show => 
        show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        show.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        show.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  const getSelectedShow = () => {
    return shows.find(show => show.id === selectedShow);
  };
  
  const renderShowDetail = () => {
    const show = getSelectedShow();
    if (!show) return null;
    
    return (
      <div className="show-detail h-full overflow-y-auto">
        <div className="show-hero relative h-80">
          <img 
            src={show.image} 
            alt={show.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{show.title}</h1>
            <div className="flex items-center text-sm space-x-3 mb-4">
              <span>{show.year}</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span>{show.category}</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span>{show.episodes} Episodes</span>
              {show.rating && (
                <>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span className="flex items-center">
                    <span className="i-heroicons-star-solid text-yellow-400 mr-1" />
                    {show.rating}/10
                  </span>
                </>
              )}
            </div>
            <div className="flex space-x-3">
              <button className="bg-white text-black px-6 py-2 rounded-full font-medium flex items-center">
                <span className="i-heroicons-play-solid mr-2" />
                Play
              </button>
              <button className="bg-gray-600/60 text-white px-6 py-2 rounded-full font-medium flex items-center">
                <span className="i-heroicons-plus mr-2" />
                Add to Watch Later
              </button>
            </div>
          </div>
        </div>
        
        <div className="show-info p-6">
          <div className="description mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600 dark:text-gray-400">{show.description}</p>
          </div>
          
          <div className="episodes">
            <h2 className="text-lg font-semibold mb-2">Episodes</h2>
            <div className="episodes-list space-y-3">
              {Array.from({ length: Math.min(5, show.episodes || 0) }).map((_, index) => (
                <div key={index} className="episode p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex">
                    <div className="w-32 h-20 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden mr-3">
                      <img 
                        src={show.image} 
                        alt={`${show.title} Episode ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Episode {index + 1}</span>
                        <span className="text-sm text-gray-500">42 min</span>
                      </div>
                      <h3 className="text-sm font-medium mt-1">Episode Title</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        This is a brief description of the episode content and plot points.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {(show.episodes || 0) > 5 && (
                <button className="w-full py-2 text-center text-blue-500 font-medium">
                  View All Episodes
                </button>
              )}
            </div>
          </div>
          
          <div className="more-like-this mt-8">
            <h2 className="text-lg font-semibold mb-3">More Like This</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {shows
                .filter(s => s.id !== show.id && s.category === show.category)
                .slice(0, 5)
                .map(similarShow => (
                  <div 
                    key={similarShow.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedShow(similarShow.id)}
                  >
                    <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 mb-1">
                      <img 
                        src={similarShow.image} 
                        alt={similarShow.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-sm font-medium truncate">{similarShow.title}</h3>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderWatchNow = () => (
    <div className="watch-now p-6 space-y-8 overflow-y-auto">
      {/* Featured banner */}
      <div className="featured-banner relative h-80 rounded-xl overflow-hidden mb-8">
        <img 
          src={shows[1].image} 
          alt={shows[1].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{shows[1].title}</h1>
          <p className="max-w-2xl mb-4">{shows[1].description}</p>
          <div className="flex space-x-3">
            <button className="bg-white text-black px-6 py-2 rounded-full font-medium flex items-center">
              <span className="i-heroicons-play-solid mr-2" />
              Play
            </button>
            <button className="bg-gray-600/60 text-white px-6 py-2 rounded-full font-medium">
              + Add to Watch Later
            </button>
          </div>
        </div>
      </div>
      
      {/* Collections */}
      {collections.map(collection => (
        <div key={collection.id} className="collection">
          <h2 className="text-xl font-semibold mb-4">{collection.title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {collection.shows.map(show => (
              <div 
                key={show.id}
                className="show-card cursor-pointer"
                onClick={() => setSelectedShow(show.id)}
              >
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 mb-2">
                  <img 
                    src={show.image} 
                    alt={show.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium truncate">{show.title}</h3>
                <div className="text-xs text-gray-500 flex items-center">
                  <span>{show.year}</span>
                  <span className="mx-1">•</span>
                  <span>{show.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  
  const renderSearch = () => (
    <div className="search-results p-6 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">
        {filteredShows.length > 0 
          ? `Search Results for "${searchQuery}"`
          : `No results found for "${searchQuery}"`
        }
      </h2>
      
      {filteredShows.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredShows.map(show => (
            <div 
              key={show.id}
              className="show-card cursor-pointer"
              onClick={() => setSelectedShow(show.id)}
            >
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 mb-2">
                <img 
                  src={show.image} 
                  alt={show.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium truncate">{show.title}</h3>
              <div className="text-xs text-gray-500 flex items-center">
                <span>{show.year}</span>
                <span className="mx-1">•</span>
                <span>{show.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  return (
    <div className="appletv-container h-full flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Toolbar */}
      <div className="appletv-toolbar h-14 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-6">
          <button 
            className={`font-medium ${activeTab === 'watch-now' ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
            onClick={() => setActiveTab("watch-now")}
          >
            Watch Now
          </button>
          <button 
            className={`font-medium ${activeTab === 'originals' ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
            onClick={() => setActiveTab("originals")}
          >
            Apple TV+
          </button>
          <button 
            className={`font-medium ${activeTab === 'movies' ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
            onClick={() => setActiveTab("movies")}
          >
            Movies
          </button>
          <button 
            className={`font-medium ${activeTab === 'tv-shows' ? 'text-blue-500' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
            onClick={() => setActiveTab("tv-shows")}
          >
            TV Shows
          </button>
        </div>
        
        <div className="ml-auto relative">
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-gray-100 dark:bg-gray-800 rounded-full px-10 py-1.5 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-3 top-2 text-gray-400 i-heroicons-magnifying-glass" />
          {searchQuery && (
            <button 
              className="absolute right-3 top-2 text-gray-400 i-heroicons-x-mark"
              onClick={() => setSearchQuery("")}
            />
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="appletv-content flex-1 overflow-hidden">
        {selectedShow ? (
          renderShowDetail()
        ) : searchQuery ? (
          renderSearch()
        ) : (
          renderWatchNow()
        )}
      </div>
    </div>
  );
};

export default AppleTV;
