import React from 'react';
import { motion } from 'framer-motion';
import { FaFire, FaMusic, FaMugHot, FaCalendar, FaExternalLinkAlt } from 'react-icons/fa';
import { useEvents } from '../hooks/useEvents';

const Events = () => {
  const { events, loading } = useEvents();

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
        setCurrentUrlIndex(currentUrlIndex + 1);
      } else {
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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="bg-white py-16">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5C0000] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  // Separate events into past and upcoming
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

  const { upcomingEvents, pastEvents } = events.reduce((acc, event) => {
    // Handle field names with trailing spaces
    const eventDate = event.date || event["date "] || event.Date || event["Date "];
    
    if (!eventDate) {
      // If no date, treat as upcoming
      acc.upcomingEvents.push(event);
      return acc;
    }

    try {
      const eventDateObj = new Date(eventDate);
      eventDateObj.setHours(0, 0, 0, 0);
      
      if (isNaN(eventDateObj.getTime())) {
        // Invalid date, treat as upcoming
        acc.upcomingEvents.push(event);
      } else if (eventDateObj >= now) {
        acc.upcomingEvents.push(event);
      } else {
        acc.pastEvents.push(event);
      }
    } catch (error) {
      acc.upcomingEvents.push(event);
    }

    return acc;
  }, { upcomingEvents: [], pastEvents: [] });

  // Sort upcoming events by date (ascending) and past events by date (descending)
  upcomingEvents.sort((a, b) => {
    const dateA = new Date(a.date || a["date "] || a.Date || a["Date "] || 0);
    const dateB = new Date(b.date || b["date "] || b.Date || b["Date "] || 0);
    return dateA - dateB;
  });

  pastEvents.sort((a, b) => {
    const dateA = new Date(a.date || a["date "] || a.Date || a["Date "] || 0);
    const dateB = new Date(b.date || b["date "] || b.Date || b["Date "] || 0);
    return dateB - dateA;
  });

  // Render event card component
  const EventCard = ({ event, index }) => {
    // Handle field names with trailing spaces and different cases
    const eventName = event.name || event["name "] || event.Name || event["Name "] || 'Event';
    const eventDescription = event.description || event["description "] || event.Description || event["Description "] || '';
    const eventDate = event.date || event["date "] || event.Date || event["Date "] || '';
    const eventImageUrl = event.imageUrl || event["imageUrl "] || event.ImageUrl || event["ImageUrl "] || event.Photo || event["Photo "];
    const eventRegistrationUrl = event.registrationUrl || event.RegistrationUrl || event["Registration Url"] || event["Registration URL"] || event["registrationUrl "];
    
    const EventIcon = getEventIcon(eventName);
    const uniqueKey = eventName + '-' + index;
    
    return (
      <motion.div 
        key={uniqueKey}
        className="bg-gray-50 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        {eventImageUrl && (
          <div className="relative">
            <DriveImage
              url={eventImageUrl}
              alt={eventName}
              className="w-full h-48 object-cover rounded-t-lg"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="absolute top-2 left-2 bg-white/90 text-[#5C0000] rounded-full p-2 shadow">
              <EventIcon />
            </div>
          </div>
        )}
        <div className="p-6">
          {eventDate && (
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <FaCalendar className="text-[#5C0000]" />
              <span>{formatDate(eventDate)}</span>
            </div>
          )}
          <h3 className="text-lg font-semibold mb-2 text-[#5C0000]">{eventName}</h3>
          {eventDescription && (
            <p className="text-gray-600 mb-4">{eventDescription}</p>
          )}
          {eventRegistrationUrl && (
            <a 
              href={eventRegistrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#5C0000] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#7a0000] transition"
            >
              Register <FaExternalLinkAlt />
            </a>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <motion.h1 
          className="text-3xl font-bold mb-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Events
        </motion.h1>
        <motion.p 
          className="text-gray-600 mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Here's what's happening at EASSA
        </motion.p>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="mb-16">
            <motion.h2 
              className="text-2xl font-bold mb-6 text-[#5C0000]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Upcoming Events
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, i) => (
                <EventCard key={i} event={event} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <div>
            <motion.h2 
              className="text-2xl font-bold mb-6 text-[#5C0000]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Past Events
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event, i) => (
                <EventCard key={i} event={event} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* No events message */}
        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No events scheduled at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;