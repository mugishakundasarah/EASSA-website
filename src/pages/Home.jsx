import React from 'react'
import { motion } from 'framer-motion'
import { FaFire, FaMusic, FaMugHot } from 'react-icons/fa'
import HeroSection from '../components/HeroSection'
import { useTeams } from '../hooks/useTeams'
import { useEvents } from '../hooks/useEvents'
import missionImage from "../assets/imigongo.png";

const Home = () => {
  const { teams, loading: teamsLoading } = useTeams();
  const { events, loading: eventsLoading } = useEvents();

  // Helper function to get event icon based on name
  const getEventIcon = (eventName) => {
    if (!eventName || typeof eventName !== 'string') return FaMugHot;
    const name = eventName.toLowerCase();
    if (name.includes('nyama') || name.includes('choma') || name.includes('bbq')) return FaFire;
    if (name.includes('sauti') || name.includes('music') || name.includes('dance')) return FaMusic;
    return FaMugHot;
  };

  // Helper function to extract file ID from Google Drive URL
  const extractFileId = (url) => {
    if (!url) return null;
    
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return match[1];
    } else if (/^[a-zA-Z0-9_-]+$/.test(url.trim())) {
      return url.trim();
    }
    return null;
  };

  // Helper function to get all possible Google Drive image URL formats
  const getDriveImageUrls = (url) => {
    const fileId = extractFileId(url);
    if (!fileId) return [url];
    
    return [
      `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
      `https://drive.google.com/uc?export=view&id=${fileId}`,
      `https://drive.google.com/uc?export=download&id=${fileId}`,
      // CORS proxy as last resort
      `https://corsproxy.io/?${encodeURIComponent(`https://drive.google.com/uc?export=view&id=${fileId}`)}`
    ];
  };

  // Component to handle image loading with fallbacks
  const DriveImage = ({ url, alt, className, onError }) => {
    const [currentUrlIndex, setCurrentUrlIndex] = React.useState(0);
    const urls = getDriveImageUrls(url);
    const currentUrl = urls[currentUrlIndex];

    const handleError = (e) => {
      if (currentUrlIndex < urls.length - 1) {
        // Try next URL format
        setCurrentUrlIndex(currentUrlIndex + 1);
      } else {
        // All formats failed, call onError if provided
        if (onError) onError(e);
      }
    };

    if (!url) return null;

    return (
      <img
        src={currentUrl}
        alt={alt}
        className={className}
        loading="lazy"
        onError={handleError}
      />
    );
  };

  return (
    <>
        <HeroSection />
        {/* About snapshot */}
      <section className="bg-white py-16">
        <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
            <h2 className="text-3xl font-bold mb-6">About EASSA</h2>
            <p className="text-gray-700 mb-4">
              EASSA builds a vibrant home for students, faculty, alumni, and friends of East Africa at Stanford.
              We celebrate together through music, language, food, and stories.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Signature events like Nyama Choma Social and Sauti Motomoto</li>
              <li>Tea circles, film nights, and community gatherings</li>
              <li>Mentorship, academic support, and alumni connections</li>
            </ul>
            <div className="mt-6 space-x-4">
              <a href="/about" className="bg-[#5C0000] text-white px-5 py-2 rounded-full text-sm font-medium border-2 border-[#5C0000]">Learn more</a>
              <a href="/events" className="border-2 border-[var(--accent)] text-gray-800 px-5 py-2 rounded-full text-sm font-medium">See events</a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.1 }}>
            <img src={missionImage} alt="Imigongo motif" className="w-full rounded-lg shadow" loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-[#5C0000] text-white py-16">
          <div className="max-w-screen-xl mx-auto px-4 
                    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                    gap-12 place-items-center justify-center text-center">
          {teamsLoading ? (
            <div className="col-span-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
              <p className="mt-4 text-gray-200">Loading team...</p>
            </div>
          ) : (
            teams.map((person, i) => {
              const role = person.Role || person.role || person.title;
              const name = person.Name || person.name;
              const from = person["From "] || person["From"] || person.from || person.country || person.location;
              
              const photoUrl = person.Photo || person["Photo"] || person.photo;
              
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                  {photoUrl ? (
                    <DriveImage
                      url={photoUrl}
                      alt={name || 'Team member'}
                      className="w-32 h-32 object-cover rounded-full mx-auto mb-4 ring-4 ring-white/20 shadow-lg justify-center bg-gray-700"
                      onError={(e) => {
                        console.error('Failed to load image after trying all formats:', photoUrl);
                        // Show placeholder
                        e.target.style.display = 'none';
                        const placeholder = document.createElement('div');
                        placeholder.className = 'w-32 h-32 rounded-full mx-auto mb-4 ring-4 ring-white/20 shadow-lg bg-gray-700 flex items-center justify-center';
                        placeholder.innerHTML = '<span class="text-white text-2xl">👤</span>';
                        e.target.parentNode.appendChild(placeholder);
                      }}
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full mx-auto mb-4 ring-4 ring-white/20 shadow-lg bg-gray-700 flex items-center justify-center">
                      <span className="text-white text-2xl">👤</span>
                    </div>
                  )}
                  <p className="text-sm uppercase text-gray-200">{role}</p>
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <p className="text-sm text-gray-300">{from}</p>
                </motion.div>
              );
            })
          )}
        </div>
      </section>

      {/* Events */}
      <section className="bg-white py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Events</h2>
          {eventsLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5C0000] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading events...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {events.slice(0, 3).map((event, i) => {
                // Handle field names with trailing spaces and different cases
                const eventName = event.name || event["name "] || event.Name || event["Name "] || 'Event';
                const eventDescription = event.description || event["description "] || event.Description || event["Description "] || '';
                const eventImageUrl = event.imageUrl || event["imageUrl "] || event.ImageUrl || event["ImageUrl "] || event.Photo || event["Photo "];
                
                const EventIcon = getEventIcon(eventName);
                
                return (
                  <motion.a key={i} href="/events" className="bg-gray-50 rounded-lg shadow block overflow-hidden"
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.08 }}
                    whileHover={{ y: -4, boxShadow: '0 10px 16px rgba(0,0,0,0.08)' }}
                  >
                    <div className="relative">
                      {eventImageUrl ? (
                        <DriveImage
                          url={eventImageUrl}
                          alt={eventName}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200"></div>
                      )}
                      <div className="absolute top-2 left-2 bg-white/90 text-[#5C0000] rounded-full p-2 shadow">
                        <EventIcon />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-md font-semibold mb-1">{eventName}</h3>
                      {eventDescription && (
                        <p className="text-sm text-gray-600">{eventDescription}</p>
                      )}
                    </div>
                  </motion.a>
                );
              })}
              {events.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-600">No events scheduled at the moment. Check back soon!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Home