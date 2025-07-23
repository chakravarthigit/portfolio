import React, { useState } from "react";

interface Photo {
  id: string;
  url: string;
  title: string;
  date: string;
  location?: string;
  favorite?: boolean;
}

interface Album {
  id: string;
  title: string;
  cover: string;
  count: number;
}

const Photos = () => {
  const [activeTab, setActiveTab] = useState("library");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "detail">("grid");
  
  // Sample photo data
  const photos: Photo[] = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: "Mountain Landscape",
      date: "May 30, 2025",
      location: "Yosemite National Park",
      favorite: true
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      title: "Sunset at Beach",
      date: "May 25, 2025",
      location: "Malibu, California"
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      title: "Forest Trail",
      date: "May 18, 2025",
      location: "Redwood National Park",
      favorite: true
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1497449493050-aad1e7cad165",
      title: "Cascading Waterfall",
      date: "May 15, 2025",
      location: "Olympic National Park"
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
      title: "Desert Landscape",
      date: "May 10, 2025",
      location: "Joshua Tree National Park"
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1520962922320-2038eebab146",
      title: "Urban Cityscape",
      date: "May 5, 2025",
      location: "San Francisco, California",
      favorite: true
    },
    {
      id: "7",
      url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0",
      title: "Autumn Colors",
      date: "April 28, 2025",
      location: "Vermont"
    },
    {
      id: "8",
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      title: "Mountain Lake",
      date: "April 20, 2025",
      location: "Banff National Park"
    }
  ];
  
  // Sample albums
  const albums: Album[] = [
    {
      id: "1",
      title: "Vacations",
      cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      count: 56
    },
    {
      id: "2",
      title: "Family",
      cover: "https://images.unsplash.com/photo-1511895426328-dc8714191300",
      count: 124
    },
    {
      id: "3",
      title: "Nature",
      cover: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f",
      count: 89
    },
    {
      id: "4",
      title: "City Trips",
      cover: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
      count: 32
    }
  ];
  
  const getSelectedPhoto = () => {
    return photos.find(photo => photo.id === selectedPhoto);
  };
  
  const togglePhotoFavorite = (id: string) => {
    // In a real app, this would update state
    console.log(`Toggle favorite for photo ${id}`);
  };
  
  const renderLibrary = () => (
    <div className="photo-library">
      <div className="library-header p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold">Library</h2>
        <div className="flex space-x-2">
          <button 
            className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onClick={() => setViewMode("grid")}
          >
            <span className="i-heroicons-squares-2x2 w-5 h-5" />
          </button>
          <button 
            className={`p-2 rounded-md ${viewMode === 'detail' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onClick={() => setViewMode("detail")}
          >
            <span className="i-heroicons-list-bullet w-5 h-5" />
          </button>
        </div>
      </div>
      
      {viewMode === "grid" ? (
        <div className="photo-grid p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map(photo => (
            <div 
              key={photo.id} 
              className="photo-item relative cursor-pointer rounded-lg overflow-hidden group"
              onClick={() => setSelectedPhoto(photo.id)}
            >
              <img 
                src={photo.url} 
                alt={photo.title} 
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
              <button 
                className={`absolute top-2 right-2 p-1 rounded-full ${photo.favorite ? 'text-red-500 bg-white bg-opacity-70' : 'text-gray-200 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100'} transition-opacity`}
                onClick={(e) => { e.stopPropagation(); togglePhotoFavorite(photo.id); }}
              >
                <span className={photo.favorite ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="photo-list">
          {photos.map(photo => (
            <div 
              key={photo.id}
              className={`flex items-center p-3 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${selectedPhoto === photo.id ? 'bg-blue-50 dark:bg-blue-900/30' : ''}`}
              onClick={() => setSelectedPhoto(photo.id)}
            >
              <img 
                src={photo.url} 
                alt={photo.title} 
                className="w-16 h-16 object-cover rounded"
              />
              <div className="ml-4 flex-1">
                <div className="font-medium">{photo.title}</div>
                <div className="text-sm text-gray-500 flex items-center">
                  <span className="i-heroicons-map-pin text-sm mr-1" />
                  {photo.location}
                </div>
                <div className="text-xs text-gray-500">{photo.date}</div>
              </div>
              {photo.favorite && (
                <span className="i-heroicons-heart-solid text-red-500 mr-2" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  const renderAlbums = () => (
    <div className="photo-albums">
      <div className="albums-header p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold">Albums</h2>
      </div>
      
      <div className="albums-grid p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {albums.map(album => (
          <div key={album.id} className="album-item cursor-pointer">
            <div className="album-cover h-40 rounded-lg overflow-hidden shadow-md">
              <img 
                src={album.cover} 
                alt={album.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-2">
              <h3 className="font-medium">{album.title}</h3>
              <div className="text-sm text-gray-500">{album.count} photos</div>
            </div>
          </div>
        ))}
        
        <div className="album-item cursor-pointer">
          <div className="album-cover h-40 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
            <div className="text-center">
              <span className="i-heroicons-plus-circle text-4xl text-gray-400" />
              <div className="mt-2 text-gray-500 font-medium">Create Album</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderPhotoDetail = () => {
    const photo = getSelectedPhoto();
    if (!photo) return null;
    
    return (
      <div className="photo-detail h-full flex flex-col">
        <div className="photo-detail-header p-3 border-b border-gray-200 dark:border-gray-700 flex items-center">
          <button 
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 mr-2"
            onClick={() => setSelectedPhoto(null)}
          >
            <span className="i-heroicons-arrow-left" />
          </button>
          <h3 className="font-medium">{photo.title}</h3>
          <div className="ml-auto flex space-x-2">
            <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="i-heroicons-share" />
            </button>
            <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="i-heroicons-pencil-square" />
            </button>
            <button 
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => togglePhotoFavorite(photo.id)}
            >
              <span className={photo.favorite ? 'i-heroicons-heart-solid text-red-500' : 'i-heroicons-heart'} />
            </button>
          </div>
        </div>
        
        <div className="photo-detail-content flex-1 overflow-auto bg-gray-900 flex items-center justify-center">
          <img 
            src={photo.url} 
            alt={photo.title} 
            className="max-w-full max-h-full object-contain"
          />
        </div>
        
        <div className="photo-detail-info p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{photo.title}</h4>
              <div className="text-sm text-gray-500">{photo.date}</div>
            </div>
            <div className="flex space-x-3">
              <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                <span className="i-heroicons-adjustments-horizontal" />
              </button>
              <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                <span className="i-heroicons-arrow-down-tray" />
              </button>
              <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                <span className="i-heroicons-trash" />
              </button>
            </div>
          </div>
          
          {photo.location && (
            <div className="mt-2 text-sm flex items-center text-gray-600 dark:text-gray-400">
              <span className="i-heroicons-map-pin mr-1" />
              {photo.location}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="photos-container h-full flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* App Toolbar */}
      <div className="photos-toolbar h-12 flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-1">
          <button 
            className={`px-3 py-1.5 rounded-md ${activeTab === 'library' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onClick={() => setActiveTab("library")}
          >
            Library
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md ${activeTab === 'forYou' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onClick={() => setActiveTab("forYou")}
          >
            For You
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md ${activeTab === 'albums' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onClick={() => setActiveTab("albums")}
          >
            Albums
          </button>
        </div>
        
        <div className="ml-auto">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-gray-100 dark:bg-gray-800 rounded-md px-8 py-1.5 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-2 top-2 text-gray-400 i-heroicons-magnifying-glass" />
          </div>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="photos-content flex-1 overflow-hidden">
        {selectedPhoto ? renderPhotoDetail() : (
          <>
            {activeTab === "library" && renderLibrary()}
            {activeTab === "albums" && renderAlbums()}
            {activeTab === "forYou" && (
              <div className="for-you-content p-6">
                <h2 className="text-xl font-semibold mb-4">For You</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="memory-box p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <h3 className="font-medium mb-2">Memories</h3>
                    <div className="memory-preview h-48 rounded-lg overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1529655683826-aba9b3e77383" 
                        alt="Memory" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <h4 className="font-medium">Summer Adventures</h4>
                      <div className="text-sm text-gray-500">1 year ago</div>
                    </div>
                  </div>
                  
                  <div className="memory-box p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <h3 className="font-medium mb-2">Featured Photos</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {photos.slice(0, 4).map(photo => (
                        <div key={photo.id} className="rounded-lg overflow-hidden h-24">
                          <img 
                            src={photo.url} 
                            alt={photo.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <button className="mt-3 w-full py-1.5 rounded-md bg-blue-500 hover:bg-blue-600 text-white">
                      View All
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Photos;
