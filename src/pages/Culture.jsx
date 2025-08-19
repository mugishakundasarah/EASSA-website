import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFire, FaMusic, FaMugHot, FaCalendar, FaExternalLinkAlt } from 'react-icons/fa';
import { fetchEventsFromSheet } from '../services/googleSheets';

const Culture = () => {
  const [cultureEvents, setCultureEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCultureEvents = async () => {
      try {
        const allEvents = await fetchEventsFromSheet();
        const cultureOnly = allEvents.filter(event => event.category === 'Culture');
        setCultureEvents(cultureOnly);
      } catch (error) {
        console.error('Error loading culture events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCultureEvents();
  }, []);

  const getEventIcon = (eventName) => {
    const name = eventName.toLowerCase();
    if (name.includes('nyama') || name.includes('choma') || name.includes('bbq')) return FaFire;
    if (name.includes('sauti') || name.includes('music') || name.includes('dance')) return FaMusic;
    return FaMugHot;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="bg-white py-16">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5C0000] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading culture events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <motion.h1 
          className="text-4xl md:text-5xl font-extrabold mb-6 text-center text-[#5C0000]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Culture
        </motion.h1>
        
        {cultureEvents.length > 0 ? (
          <>
            <motion.p 
              className="text-xl text-gray-600 mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Explore East African culture through our events
            </motion.p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cultureEvents.map((event, i) => {
                const EventIcon = getEventIcon(event.name);
                return (
                  <motion.div 
                    key={event.name}
                    className="bg-gray-50 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    {event.imageUrl && (
                      <div className="relative">
                        <img 
                          src={event.imageUrl} 
                          alt={event.name} 
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
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <FaCalendar className="text-[#5C0000]" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-[#5C0000]">{event.name}</h3>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      {event.registrationUrl && (
                        <a 
                          href={event.registrationUrl}
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
              })}
            </div>
          </>
        ) : (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl text-gray-600 mb-8">Coming Up</p>
            <div className="bg-gray-50 rounded-lg p-8 max-w-2xl mx-auto">
              <p className="text-gray-700">
                We're working on bringing you amazing content about East African culture, traditions, and community stories. 
                Stay tuned for updates!
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Culture;