'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet'; // No need to import Map type
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

export default function MapView({ lat, lon }: { lat: number; lon: number }) {
  const [mapKey, setMapKey] = useState<string>(`${lat}-${lon}`); // Track map key for re-renders
  const position: LatLngExpression = [lat, lon];


  useEffect(() => {
    setMapKey(`${lat}-${lon}`);
  }, [lat, lon]);

  const isValid = typeof lat === 'number' && typeof lon === 'number' && !isNaN(lat) && !isNaN(lon);
  if (!isValid) return null;

  return (
    <div className="my-4" style={{ height: '300px', width: '100%' }}>
      <MapContainer
        key={mapKey} 
        center={position}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        whenReady={() => {
          console.log('Map is ready');
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={position}>
          <Popup>You're here!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}