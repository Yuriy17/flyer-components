export async function fetchAirports(query) {
  // const apiUrl = import.meta.env.JSON_SERVER_PORT || 'http://localhost:3000';
  // const response = await fetch(`${apiUrl}/airports?q=${query}`);
  const response = await fetch(
    `https://flyer-club.com/api/search_location?query=${query}`
  );

  if (response.ok) {
    const airports = await response.json();
    console.log("🚀 ~ fetchAirports ~ airports:", airports)
    // Filter results based on the query
    return airports?.locations;
  } else {
    throw new Error('Error fetching airport data');
  }
}
