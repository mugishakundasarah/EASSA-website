import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFire, FaMusic, FaMugHot, FaCalendar, FaExternalLinkAlt } from 'react-icons/fa';
import { fetchEventsFromSheet } from '../services/googleSheets';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsData = await fetchEventsFromSheet();
        setEvents(eventsData);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
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
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, i) => {
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