'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import '../styles/style.css';

type Weather = {
  temperature: number;
  windSpeed: number;
  lat: number;
  lon: number;
};

type Product = {
  id: string;
  name: string;
  category: string;
  image_url: string;
};

const MapView = dynamic(() => import('./components/MapView'), { ssr: false });

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<Weather | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<string | null>(null);
  const [dark, setDark] = useState(false);
  const [error, setError] = useState(''); 

  // Check if the weather data for this city is already cached
  const checkCache = (city: string) => {
    const cachedWeather = localStorage.getItem(`weather-${city}`);
    if (cachedWeather) {
      return JSON.parse(cachedWeather);
    }
    return null;
  };

  const fetchWeather = async () => {
    setLoading(true);
    setError(''); 

    // Check if the weather data for the city is cached
    const cachedWeather = checkCache(city);
    if (cachedWeather) {
      setWeather(cachedWeather);
      // Fetch products based on cached weather data
      const productsRes = await fetch(`/api/products?temperature=${cachedWeather.temperature}`);
      const data: Product[] = await productsRes.json();
      setProducts(data);
      setLoading(false);
      return; // Exit as we already have the data
    }

    try {
      const weatherRes = await fetch(`/api/weather?city=${city}`);
      if (!weatherRes.ok) {
        throw new Error('City not found');//If city does not exist
      }

      const weatherData: Weather = await weatherRes.json();
      setWeather(weatherData);

      const productsRes = await fetch(`/api/products?temperature=${weatherData.temperature}`);
      const data: Product[] = await productsRes.json();
      setProducts(data);

      // Store the weather data in localStorage to cache it for future 
      localStorage.setItem(`weather-${city}`, JSON.stringify(weatherData));
    } catch (err: any) {
      setError('No matching city found. Please try another city.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = category
    ? products.filter((p) => p.category === category)
    : products;

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <main className={`min-h-screen p-4 ${dark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'} transition-all`}>
   
      <div className="hero bg-gradient-to-r from-teal-400 to-teal-300 p-8 text-white text-center rounded-xl shadow-2xl">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-4xl font-extrabold mb-4"
        >
          🌦️ Weather-Based Product Recommendations
        </motion.h1>
        <p className="text-lg mb-6">
          Get weather-based recommendations tailored just for you. Choose your city and discover products for any weather condition!
        </p>
      </div>

      {/* Dark Mode toggle */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="p-3 rounded-full bg-gray-300 dark:bg-gray-700 transition-all hover:bg-gray-400 dark:hover:bg-gray-600"
          onClick={() => setDark((prev) => !prev)}
        >
          {dark ? <Sun className="text-yellow-400" /> : <Moon className="text-yellow-300" />}
        </button>
      </div>

      {/* City input and Search button */}
      <div className="my-4 flex gap-2 justify-center items-center flex-col sm:flex-row">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button
          onClick={fetchWeather}
          className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-3 rounded-lg shadow-md transition-all hover:scale-105"
        >
          Search
        </button>
      </div>

      {/* Error Handling */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {/* Loading indicator */}
      {loading && <motion.p className="text-lg font-semibold text-center animate-pulse">Loading...</motion.p>}

      {/* Weather and Map */}
      {weather && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-teal-500 via-green-400 to-blue-500 p-6 rounded-xl shadow-lg my-4"
        >
          <h3 className="text-2xl font-semibold text-center">Weather in {city}</h3>
          <p className="text-lg">
            📌 Temperature: {weather.temperature}°C
            <br />
            💨 Wind Speed: {weather.windSpeed} km/h
            <br />
            📍 Location: {weather.lat}, {weather.lon}
          </p>

          {/* MapView Component */}
          {weather.lat && weather.lon ? (
            <MapView key={`${weather.lat}-${weather.lon}`} lat={weather.lat} lon={weather.lon} />
          ) : (
            <p className="text-sm text-gray-400">Map unavailable: missing coordinates.</p>
          )}
        </motion.div>
      )}

      {/* Filter by Category */}
      {categories.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-xl mb-2">Filter by Category</h4>
          <div className="flex gap-2 my-2 flex-wrap justify-center">
            <button
              onClick={() => setCategory(null)}
              className={`px-4 py-2 rounded-full text-white ${!category ? 'bg-gradient-to-r from-teal-400 to-teal-600' : 'bg-gray-300'}`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-white ${category === cat ? 'bg-gradient-to-r from-teal-400 to-teal-600' : 'bg-gray-300'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 p-6 rounded-lg">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl transition-all hover:shadow-2xl"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-40 object-cover mb-4 rounded-lg shadow-sm"
            />
            <h4 className="font-bold text-xl text-center">{product.name}</h4>
            <p className="text-sm text-gray-500 text-center">{product.category}</p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}












// export default async function Home() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-black">
//       <main className="max-w-2xl w-full text-center space-y-8">
//         <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-8 animate-fade-in">
//           Hey there! 👋
//         </h1>
//         <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
//           🌦️ Weather-Based Product Recommendations
//         </h2>
        
//         <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
//           <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
//             Welcome to our coding challenge! You will be building a web application that recommends products based on real-time weather conditions.
//           </p>
          
//           <div className="space-y-4">
//             <p className="text-gray-500 dark:text-gray-400">
//               Ready to showcase your skills in:
//             </p>
//             <ul className="text-gray-600 dark:text-gray-300 grid grid-cols-2 gap-3">
//               <li className="flex items-center justify-center p-2 bg-blue-50 dark:bg-gray-700 rounded">
//                 ✨ Frontend Development
//               </li>
//               <li className="flex items-center justify-center p-2 bg-blue-50 dark:bg-gray-700 rounded">
//                 🔄 API Integration
//               </li>
//               <li className="flex items-center justify-center p-2 bg-blue-50 dark:bg-gray-700 rounded">
//                 💾 Database Queries
//               </li>
//               <li className="flex items-center justify-center p-2 bg-blue-50 dark:bg-gray-700 rounded">
//                 🎨 UI/UX Design
//               </li>
//             </ul>
//           </div>
//         </div>

//         <p className="text-lg font-medium text-gray-600 dark:text-gray-300 mt-8">
//           Good luck! 🚀
//         </p>
//       </main>
//     </div>
//   );
// }
