// Google Sheets service for fetching events
const GOOGLE_SHEET_ID = '1CBBavI4_3u66NxOudn56JOBUYlZilxIsKno00mkpNjc'; // You'll need to replace this
const GOOGLE_API_KEY = 'YOUR_API_KEY_HERE'; // You'll need to replace this
export const fetchEventsFromSheet = async () => {
  try {
    // For now, we'll use a public sheet approach
    // You'll need to make your Google Sheet public and get the sheet ID
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/Events!A2:F?key=${GOOGLE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    
    const data = await response.json();
    return parseEventsData(data.values || []);
  } catch (error) {
    console.error('Error fetching events:', error);
    // Return fallback data if sheet is not available
    return getFallbackEvents();
  }
};

const parseEventsData = (rows) => {
  return rows
    .filter(row => row.length >= 6) // Ensure we have all required columns
    .map(row => ({
      name: row[0] || '',
      description: row[1] || '',
      imageUrl: row[2] || '',
      date: row[3] || '',
      registrationUrl: row[4] || '',
      category: row[5] || 'Events', // Events or Culture
      status: row[6] || 'Active'
    }))
    .filter(event => event.status === 'Active')
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by most recent
};

const getFallbackEvents = () => {
  return [
    {
      name: "Nyama Choma Social",
      description: "Grill meat the East-African way and dance to Afro-fusion playlists.",
      imageUrl: "/src/assets/bubbles.png",
      date: "2024-03-15",
      registrationUrl: "",
      category: "Events",
      status: "Active"
    },
    {
      name: "Sauti Motomoto",
      description: "High-energy party with traditional and modern East-African music.",
      imageUrl: "/src/assets/Gradie.png",
      date: "2024-03-10",
      registrationUrl: "",
      category: "Events",
      status: "Active"
    },
    {
      name: "Study-Jam & Game Night",
      description: "Quiet revision space followed by board games and chai.",
      imageUrl: "/src/assets/Food.png",
      date: "2024-03-05",
      registrationUrl: "",
      category: "Events",
      status: "Active"
    }
  ];
};
