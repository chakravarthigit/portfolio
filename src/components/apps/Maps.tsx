import React, { useState, useEffect, useRef } from "react";

// Google Maps type definitions
declare global {
  var google: any;
}

// Remove redeclaration of Window interface to avoid conflicts
declare global {
  // Extend the Window interface only if needed, or just declare the property directly
  var initMap: () => void;
}

interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number];
  category?: string;
  favorite?: boolean;
}

interface Route {
  id: string;
  name: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  mode: "driving" | "walking" | "transit" | "cycling";
}

const Maps = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"map" | "transit" | "satellite">("map");
  const [showDirections, setShowDirections] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Vijayawada coordinates
  const defaultLocation = { lat: 16.5062, lng: 80.6480 };
  
  // Sample locations around Vijayawada
  const locations: Location[] = [
    {
      id: "1",
      name: "Kanaka Durga Temple",
      address: "Indrakeeladri, Vijayawada, Andhra Pradesh 520010",
      coordinates: [16.5176, 80.6217],
      category: "religious",
      favorite: true
    },
    {
      id:"2",
      name:"Home",
      address:"Nekkalam Gollagudem, Vijayawada, Andhra Pradesh 521212",
      coordinates: [16.3832, 80.4333],
      category: "home",
      favorite: true
    },
    {
      id: "3",
      name: "Prakasam Barrage",
      address: "Prakasam Barrage, Vijayawada, Andhra Pradesh 520004",
      coordinates: [16.5062, 80.6217],
      category: "landmark",
      favorite: true
    },
    {
      id: "4",
      name: "Undavalli Caves",
      address: "Undavalli, Guntur, Andhra Pradesh 522501",
      coordinates: [16.4833, 80.5667],
      category: "tourist"
    },
    {
      id: "5",
      name: "Vijayawada Railway Station",
      address: "Railway Station Rd, Patamatalanka, Vijayawada, Andhra Pradesh 520003",
      coordinates: [16.5193, 80.6158],
      category: "transportation"
    },
    {
      id: "6",
      name: "Bhavani Island",
      address: "Krishna River, Vijayawada, Andhra Pradesh 520007",
      coordinates: [16.5400, 80.6100],
      category: "tourist"
    }
  ];
  
  // Sample routes
  const routes: Route[] = [
    {
      id: "1",
      name: "Home to Work",
      from: "Home",
      to: "Apple Park",
      distance: "12.4 miles",
      duration: "25 min",
      mode: "driving"
    },
    {
      id: "2",
      name: "Work to Gym",
      from: "Apple Park",
      to: "24 Hour Fitness",
      distance: "3.2 miles",
      duration: "10 min",
      mode: "driving"
    },
    {
      id: "3",
      name: "Weekend Trip",
      from: "Home",
      to: "Golden Gate Bridge",
      distance: "38.5 miles",
      duration: "45 min",
      mode: "driving"
    }
  ];
  
  // Initialize Google Maps
  useEffect(() => {
    const loadGoogleMaps = () => {
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
      if (!apiKey) {
        console.error('Google Maps API key not found in environment variables');
        setIsLoading(false);
        return;
      }

      if (window.google) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      window.initMap = initializeMap;
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current) return;

      const mapOptions = {
        center: defaultLocation,
        zoom: 13,
        mapTypeId: activeTab === 'satellite' ? 'satellite' : 'roadmap',
        styles: activeTab === 'map' ? [
          {
            featureType: 'all',
            elementType: 'geometry.fill',
            stylers: [{ color: '#f5f5f5' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#c9c9c9' }]
          }
        ] : undefined
      };

      const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);
      setIsLoading(false);

      // Add markers for locations
      locations.forEach(location => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.coordinates[0], lng: location.coordinates[1] },
          map: newMap,
          title: location.name,
          icon: location.favorite ? {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#FF6B6B"/>
                <circle cx="12" cy="9" r="2.5" fill="white"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(24, 24)
          } : undefined
        });

        marker.addListener('click', () => {
          setSelectedLocation(location.id);
        });
      });
    };

    loadGoogleMaps();
  }, [activeTab]);

  const getSelectedLocation = () => {
    return locations.find(location => location.id === selectedLocation);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!map || !searchQuery.trim()) return;
    
    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      query: searchQuery,
      location: defaultLocation,
      radius: 50000
    };
    
    service.textSearch(request, (results: any[], status: any) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results[0]) {
        map.setCenter(results[0].geometry.location);
        map.setZoom(15);
        
        new window.google.maps.Marker({
          position: results[0].geometry.location,
          map: map,
          title: results[0].name
        });
      }
    });
  };
  
  const handleMapTypeChange = (type: 'roadmap' | 'satellite' | 'hybrid' | 'terrain') => {
    if (map) {
      map.setMapTypeId(type);
    }
  };
  
  const zoomIn = () => {
    if (map) {
      map.setZoom(map.getZoom() + 1);
    }
  };
  
  const zoomOut = () => {
    if (map) {
      map.setZoom(map.getZoom() - 1);
    }
  };
  
  const goToCurrentLocation = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
        map.setZoom(15);
        
        new window.google.maps.Marker({
          position: pos,
          map: map,
          title: 'Your Location',
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="8" fill="#4285F4" stroke="white" stroke-width="2"/>
                <circle cx="10" cy="10" r="3" fill="white"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(20, 20)
          }
        });
      });
    }
  };
  
  const toggleDirections = () => {
    setShowDirections(!showDirections);
  };
  
  const renderLocationDetail = () => {
    const location = getSelectedLocation();
    if (!location) return null;
    
    return (
      <div className="location-detail p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">{location.name}</h2>
          <button className={`text-lg ${location.favorite ? 'text-red-500' : 'text-gray-400'}`}>
            <span className={location.favorite ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'} />
          </button>
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">{location.address}</div>
        
        <div className="action-buttons grid grid-cols-5 gap-2 mb-6">
          <div className="action-button flex flex-col items-center">
            <button className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-1">
              <span className="i-heroicons-map" />
            </button>
            <span className="text-xs">Directions</span>
          </div>
          <div className="action-button flex flex-col items-center">
            <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-1">
              <span className="i-heroicons-phone" />
            </button>
            <span className="text-xs">Call</span>
          </div>
          <div className="action-button flex flex-col items-center">
            <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-1">
              <span className="i-heroicons-globe-alt" />
            </button>
            <span className="text-xs">Website</span>
          </div>
          <div className="action-button flex flex-col items-center">
            <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-1">
              <span className="i-heroicons-share" />
            </button>
            <span className="text-xs">Share</span>
          </div>
          <div className="action-button flex flex-col items-center">
            <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-1">
              <span className="i-heroicons-bookmark" />
            </button>
            <span className="text-xs">Save</span>
          </div>
        </div>
        
        <div className="additional-info">
          <div className="info-section mb-4">
            <h3 className="text-sm font-medium mb-2">Hours</h3>
            <div className="text-sm">
              <div className="flex justify-between mb-1">
                <span>Monday - Friday</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Saturday</span>
                <span>10:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
          
          <div className="info-section mb-4">
            <h3 className="text-sm font-medium mb-2">Contact</h3>
            <div className="text-sm">
              <div className="flex items-center mb-1">
                <span className="i-heroicons-phone mr-2 text-gray-500" />
                <span>(123) 456-7890</span>
              </div>
              <div className="flex items-center">
                <span className="i-heroicons-envelope mr-2 text-gray-500" />
                <span>info@example.com</span>
              </div>
            </div>
          </div>
          
          <div className="info-section">
            <h3 className="text-sm font-medium mb-2">Reviews</h3>
            <div className="flex items-center mb-1">
              <div className="flex text-yellow-400">
                <span className="i-heroicons-star-solid" />
                <span className="i-heroicons-star-solid" />
                <span className="i-heroicons-star-solid" />
                <span className="i-heroicons-star-solid" />
                <span className="i-heroicons-star-half-solid" />
              </div>
              <span className="ml-2 text-sm">4.5 (1,234 reviews)</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderDirections = () => (
    <div className="directions-panel p-4">
      <div className="directions-form mb-4">
        <div className="form-group flex items-center mb-2 bg-gray-100 dark:bg-gray-800 rounded-md p-2">
          <span className="i-heroicons-map-pin text-red-500 mr-2" />
          <input 
            type="text" 
            placeholder="Starting point" 
            className="flex-1 bg-transparent focus:outline-none"
            defaultValue="Current Location"
          />
        </div>
        <div className="form-group flex items-center mb-4 bg-gray-100 dark:bg-gray-800 rounded-md p-2">
          <span className="i-heroicons-flag text-red-500 mr-2" />
          <input 
            type="text" 
            placeholder="Destination" 
            className="flex-1 bg-transparent focus:outline-none"
            defaultValue={getSelectedLocation()?.name || ""}
          />
        </div>
        
        <div className="travel-mode-tabs flex rounded-md bg-gray-100 dark:bg-gray-800 p-1 mb-4">
          <button className="flex-1 py-1.5 text-center rounded text-sm font-medium bg-white dark:bg-gray-700 shadow">
            <span className="i-heroicons-truck inline-block mr-1" />
            Drive
          </button>
          <button className="flex-1 py-1.5 text-center rounded text-sm font-medium text-gray-600 dark:text-gray-400">
            <span className="i-heroicons-user inline-block mr-1" />
            Walk
          </button>
          <button className="flex-1 py-1.5 text-center rounded text-sm font-medium text-gray-600 dark:text-gray-400">
            <span className="i-heroicons-truck inline-block mr-1" />
            Transit
          </button>
          <button className="flex-1 py-1.5 text-center rounded text-sm font-medium text-gray-600 dark:text-gray-400">
            <span className="i-heroicons-truck inline-block mr-1" />
            Cycle
          </button>
        </div>
      </div>
      
      <div className="route-options">
        <div className="route-option p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800 mb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Fastest route</span>
            <span className="text-sm">25 min (12.4 mi)</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Via US-101 S • Light traffic
          </div>
        </div>
        
        <div className="route-option p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 mb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Alternative route</span>
            <span className="text-sm">30 min (11.8 mi)</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Via CA-85 N • Moderate traffic
          </div>
        </div>
        
        <div className="route-option p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Scenic route</span>
            <span className="text-sm">35 min (13.5 mi)</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Via Skyline Blvd • Light traffic
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderSearchResults = () => (
    <div className="search-results p-4">
      <h3 className="text-sm font-medium mb-2">Search Results</h3>
      <div className="results-list space-y-2">
        {locations.map(location => (
          <div 
            key={location.id}
            className="result-item p-3 border border-gray-200 dark:border-gray-700 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={() => setSelectedLocation(location.id)}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{location.name}</span>
              {location.favorite && (
                <span className="text-red-500 i-heroicons-heart-solid" />
              )}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{location.address}</div>
            <div className="text-xs text-gray-500 mt-1">
              {location.category && (
                <span className="capitalize">{location.category}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  return (
    <div className="maps-container h-full flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Toolbar */}
      <div className="maps-toolbar h-12 flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1.5 rounded-md ${activeTab === 'map' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onClick={() => setActiveTab("map")}
          >
            Map
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md ${activeTab === 'transit' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onClick={() => setActiveTab("transit")}
          >
            Transit
          </button>
          <button 
            className={`px-3 py-1.5 rounded-md ${activeTab === 'satellite' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onClick={() => setActiveTab("satellite")}
          >
            Satellite
          </button>
        </div>
        
        <div className="ml-auto flex items-center space-x-2">
          <button 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${showDirections ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            onClick={toggleDirections}
          >
            <span className="i-heroicons-map" />
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800">
            <span className="i-heroicons-bookmark" />
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800">
            <span className="i-heroicons-cog-6-tooth" />
          </button>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="search-bar p-3 border-b border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input 
            type="text" 
            placeholder="Search for a place or address" 
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-md px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-gray-400 i-heroicons-magnifying-glass" />
          {searchQuery && (
            <button 
              type="button"
              className="absolute right-3 top-2.5 text-gray-400 i-heroicons-x-mark"
              onClick={() => setSearchQuery("")}
            />
          )}
        </form>
      </div>
      
      {/* Content area */}
      <div className="maps-content flex-1 flex overflow-hidden">
        {/* Left sidebar */}
        <div className={`maps-sidebar w-72 border-r border-gray-200 dark:border-gray-700 overflow-y-auto ${showDirections ? 'block' : 'hidden md:block'}`}>
          {showDirections ? (
            renderDirections()
          ) : selectedLocation ? (
            renderLocationDetail()
          ) : searchQuery ? (
            renderSearchResults()
          ) : (
            <div className="p-4">
              <h3 className="text-sm font-medium mb-3">Favorites</h3>
              <div className="space-y-2">
                {locations.filter(l => l.favorite).map(location => (
                  <div 
                    key={location.id}
                    className="favorite-item p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => setSelectedLocation(location.id)}
                  >
                    <div className="flex items-center">
                      <span className="i-heroicons-star text-yellow-500 mr-2" />
                      <span>{location.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <h3 className="text-sm font-medium mt-4 mb-3">Recent</h3>
              <div className="space-y-2">
                {routes.map(route => (
                  <div 
                    key={route.id}
                    className="recent-item p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{route.name}</div>
                        <div className="text-xs text-gray-500">
                          {route.from} to {route.to}
                        </div>
                      </div>
                      <div className="text-sm">
                        {route.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Map area */}
        <div className="map-area flex-1 bg-gray-100 dark:bg-gray-800 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">Loading Google Maps...</p>
              </div>
            </div>
          )}
          <div ref={mapRef} className="w-full h-full" style={{ minHeight: '400px' }} />
          
          {/* Map controls */}
          <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
            <button className="w-10 h-10 rounded-md bg-white dark:bg-gray-700 shadow flex items-center justify-center">
              <span className="i-heroicons-plus" />
            </button>
            <button className="w-10 h-10 rounded-md bg-white dark:bg-gray-700 shadow flex items-center justify-center">
              <span className="i-heroicons-minus" />
            </button>
            <button className="w-10 h-10 rounded-md bg-white dark:bg-gray-700 shadow flex items-center justify-center">
              <span className="i-heroicons-view-columns" />
            </button>
            <button className="w-10 h-10 rounded-md bg-white dark:bg-gray-700 shadow flex items-center justify-center">
              <span className="i-heroicons-user-circle" />
            </button>
          </div>
          
          {/* Current location indicator */}
          <div className="absolute bottom-4 left-4">
            <button className="h-10 px-4 rounded-md bg-white dark:bg-gray-700 shadow flex items-center justify-center">
              <span className="i-heroicons-location-crosshairs text-blue-500 mr-2" />
              <span>Current Location</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maps;
