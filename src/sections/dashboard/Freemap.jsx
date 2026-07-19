// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Fix for default Leaflet marker icons using standard open-source assets
// const greenIcon = new L.Icon({
//   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41]
// });

// const redIcon = new L.Icon({
//   iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41]
// });

// const FreeRoutingMap = () => {
//   const ahmedabadCenter = [23.0225, 72.5714];
  
//   // Coordinates in [Latitude, Longitude] format for Leaflet
//   const stationLocation = [23.0300, 72.5400]; 
//   const [accidentLocation, setAccidentLocation] = useState([23.0500, 72.5850]);
//   const [routeCoordinates, setRouteCoordinates] = useState([]);
//   const [routeStats, setRouteStats] = useState({ distance: 0, duration: 0 });

//   // Fetch routing path from the free OSRM API
//   const calculateRoute = async (start, end) => {
//     try {
//       // OSRM expects coordinates in [Longitude,Latitude] format inside the URL string
//       const url = `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
      
//       const response = await fetch(url);
//       const data = await response.json();

//       if (data.code === 'Ok' && data.routes.length > 0) {
//         const route = data.routes[0];
        
//         // OSRM returns [Lng, Lat], Leaflet needs [Lat, Lng], so we flip them
//         const flippedCoords = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
        
//         setRouteCoordinates(flippedCoords);
//         setRouteStats({
//           distance: (route.distance / 1000).toFixed(2), // meters to km
//           duration: Math.ceil(route.duration / 60) // seconds to minutes
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching path from free OSRM server:", error);
//     }
//   };

//   useEffect(() => {
//     calculateRoute(stationLocation, accidentLocation);
//   }, [accidentLocation]);

//   const triggerNewAccident = () => {
//     // Generates a random coordinate within city limits
//     const randomLat = 22.9800 + Math.random() * 0.12;
//     const randomLng = 72.5000 + Math.random() * 0.12;
//     setAccidentLocation([randomLat, randomLng]);
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.controlPanel}>
//         <h3 style={{ margin: 0, color: '#d32f2f' }}>🚨 Open-Source Dispatch System</h3>
//         <button style={styles.btn} onClick={triggerNewAccident}>Simulate New Crash Location</button>
        
//         {routeStats.distance > 0 && (
//           <div style={styles.stats}>
//             <p style={styles.text}><strong>Distance:</strong> {routeStats.distance} km</p>
//             <p style={styles.text}><strong>Est. Travel Time:</strong> {routeStats.duration} mins</p>
//           </div>
//         )}
//       </div>

//       <MapContainer center={ahmedabadCenter} zoom={12} style={styles.map}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         <Marker position={stationLocation} icon={greenIcon}>
//           <Popup>Emergency Station Base</Popup>
//         </Marker>

//         <Marker position={accidentLocation} icon={redIcon}>
//           <Popup>Accident Site Location</Popup>
//         </Marker>

//         {routeCoordinates.length > 0 && (
//           <Polyline positions={routeCoordinates} color="#d32f2f" weight={15} opacity={0.7} />
//         )}
//       </MapContainer>
//     </div>
//   );
// };

// const styles = {
//   container: { display: 'flex', flexDirection: 'column', width: '100%', height: '600px', fontFamily: 'sans-serif' },
//   controlPanel: { padding: '15px', backgroundColor: '#f8f9fa', display: 'flex', flexDirection: 'column', gap: '10px', borderBottom: '1px solid #ddd' },
//   btn: { padding: '8px 12px', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', alignSelf: 'flex-start' },
//   stats: { backgroundColor: '#e3f2fd', padding: '10px', borderRadius: '4px', borderLeft: '4px solid #1976d2' },
//   text: { margin: '4px 0', fontSize: '14px' },
//   map: { width: '100%', flexGrow:1 }
// };

// export default FreeRoutingMap;

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState, useCallback } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // ---- Icons (open-source leaflet-color-markers) ----
// const makeIcon = (color) => new L.Icon({
//   iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41]
// });

// const redIcon = makeIcon('red');       // accident site
// const blueIcon = makeIcon('blue');     // nearest hospital
// const violetIcon = makeIcon('violet'); // nearest police station

// const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
// const OSRM_URL = 'https://router.project-osrm.org/route/v1/driving';

// // Straight-line distance in km, used only to rank Overpass candidates
// const haversineKm = (a, b) => {
//   const toRad = (deg) => (deg * Math.PI) / 180;
//   const R = 6371;
//   const dLat = toRad(b[0] - a[0]);
//   const dLon = toRad(b[1] - a[1]);
//   const lat1 = toRad(a[0]);
//   const lat2 = toRad(b[0]);
//   const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
//   return 2 * R * Math.asin(Math.sqrt(h));
// };

// // Query OpenStreetMap (via Overpass) for the nearest amenity of a given type,
// // expanding the search radius outward if nothing is found nearby.
// const findNearestFacility = async (location, amenity, radius = 6000) => {
//   const [lat, lon] = location;
//   const query = `[out:json][timeout:25];(node["amenity"="${amenity}"](around:${radius},${lat},${lon});way["amenity"="${amenity}"](around:${radius},${lat},${lon});relation["amenity"="${amenity}"](around:${radius},${lat},${lon}););out center;`;

//   const res = await fetch(OVERPASS_URL, { method: 'POST', body: query });
//   if (!res.ok) throw new Error(`Overpass request failed (${res.status})`);
//   const data = await res.json();

//   const candidates = (data.elements || [])
//     .map((el) => {
//       const elLat = el.lat ?? el.center?.lat;
//       const elLon = el.lon ?? el.center?.lon;
//       if (elLat == null || elLon == null) return null;
//       const loc = [elLat, elLon];
//       return {
//         name: el.tags?.name || (amenity === 'hospital' ? 'Unnamed Hospital' : 'Unnamed Police Station'),
//         location: loc,
//         straightLineKm: haversineKm(location, loc)
//       };
//     })
//     .filter(Boolean);

//   if (candidates.length === 0) {
//     if (radius >= 20000) return null; // give up after ~20km
//     return findNearestFacility(location, amenity, radius + 6000);
//   }

//   candidates.sort((a, b) => a.straightLineKm - b.straightLineKm);
//   return candidates[0];
// };

// // Road route + ETA between two [lat, lon] points via OSRM
// const fetchRoute = async (start, end) => {
//   const url = `${OSRM_URL}/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
//   const res = await fetch(url);
//   const data = await res.json();
//   if (data.code !== 'Ok' || !data.routes?.length) return null;
//   const route = data.routes[0];
//   return {
//     path: route.geometry.coordinates.map((c) => [c[1], c[0]]),
//     distanceKm: (route.distance / 1000).toFixed(2),
//     durationMin: Math.ceil(route.duration / 60)
//   };
// };

// const FreeRoutingMap = () => {
//   const ahmedabadCenter = [23.0225, 72.5714];

//   const [accidentLocation, setAccidentLocation] = useState([23.0500, 72.5850]);
//   const [hospital, setHospital] = useState(null); // { name, location }
//   const [police, setPolice] = useState(null);
//   const [hospitalRoute, setHospitalRoute] = useState(null); // { path, distanceKm, durationMin }
//   const [policeRoute, setPoliceRoute] = useState(null);
//   const [status, setStatus] = useState('idle'); // idle | locating | routing | done | error
//   const [errorMsg, setErrorMsg] = useState('');

//   const dispatch = useCallback(async (site) => {
//     setStatus('locating');
//     setErrorMsg('');
//     setHospitalRoute(null);
//     setPoliceRoute(null);

//     try {
//       const [nearestHospital, nearestPolice] = await Promise.all([
//         findNearestFacility(site, 'hospital'),
//         findNearestFacility(site, 'police')
//       ]);

//       setHospital(nearestHospital);
//       setPolice(nearestPolice);
//       setStatus('routing');

//       const [hRoute, pRoute] = await Promise.all([
//         nearestHospital ? fetchRoute(nearestHospital.location, site) : null,
//         nearestPolice ? fetchRoute(nearestPolice.location, site) : null
//       ]);

//       setHospitalRoute(hRoute);
//       setPoliceRoute(pRoute);
//       setStatus('done');
//     } catch (err) {
//       console.error('Dispatch lookup failed:', err);
//       setStatus('error');
//       setErrorMsg('Could not reach the map/routing service. Try again in a moment.');
//     }
//   }, []);

//   useEffect(() => {
//     dispatch(accidentLocation);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const triggerNewAccident = () => {
//     const randomLat = 22.9800 + Math.random() * 0.12;
//     const randomLng = 72.5000 + Math.random() * 0.12;
//     const newSite = [randomLat, randomLng];
//     setAccidentLocation(newSite);
//     dispatch(newSite);
//   };

//   const isBusy = status === 'locating' || status === 'routing';

//   return (
//     <div style={styles.container}>
//       <div style={styles.controlPanel}>
//         <h3 style={{ margin: 0, color: '#d32f2f' }}>🚨 Auto-Dispatch System</h3>

//         <button style={{ ...styles.btn, opacity: isBusy ? 0.6 : 1 }} onClick={triggerNewAccident} disabled={isBusy}>
//           {isBusy ? 'Dispatching…' : 'Simulate New Crash Location'}
//         </button>

//         {status === 'locating' && <p style={styles.statusText}>📡 Scanning OpenStreetMap for the nearest hospital &amp; police station…</p>}
//         {status === 'routing' && <p style={styles.statusText}>🛣️ Calculating road routes…</p>}
//         {status === 'error' && <p style={{ ...styles.statusText, color: '#d32f2f' }}>⚠️ {errorMsg}</p>}

//         {hospital && (
//           <div style={{ ...styles.stats, borderLeftColor: '#1976d2' }}>
//             <p style={styles.text}><strong>🏥 Nearest Hospital:</strong> {hospital.name}</p>
//             {hospitalRoute ? (
//               <p style={styles.text}>
//                 <strong>Distance:</strong> {hospitalRoute.distanceKm} km &nbsp;|&nbsp; <strong>ETA:</strong> {hospitalRoute.durationMin} min
//               </p>
//             ) : status === 'done' ? (
//               <p style={styles.text}>No drivable route found.</p>
//             ) : null}
//           </div>
//         )}

//         {police && (
//           <div style={{ ...styles.stats, borderLeftColor: '#7b1fa2' }}>
//             <p style={styles.text}><strong>🚓 Nearest Police Station:</strong> {police.name}</p>
//             {policeRoute ? (
//               <p style={styles.text}>
//                 <strong>Distance:</strong> {policeRoute.distanceKm} km &nbsp;|&nbsp; <strong>ETA:</strong> {policeRoute.durationMin} min
//               </p>
//             ) : status === 'done' ? (
//               <p style={styles.text}>No drivable route found.</p>
//             ) : null}
//           </div>
//         )}
//       </div>

//       <MapContainer center={ahmedabadCenter} zoom={12} style={styles.map}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         <Marker position={accidentLocation} icon={redIcon}>
//           <Popup>Accident Site</Popup>
//         </Marker>

//         {hospital && (
//           <Marker position={hospital.location} icon={blueIcon}>
//             <Popup>{hospital.name}</Popup>
//           </Marker>
//         )}

//         {police && (
//           <Marker position={police.location} icon={violetIcon}>
//             <Popup>{police.name}</Popup>
//           </Marker>
//         )}

//         {hospitalRoute && (
//           <Polyline positions={hospitalRoute.path} color="#1976d2" weight={6} opacity={0.75} />
//         )}

//         {policeRoute && (
//           <Polyline positions={policeRoute.path} color="#7b1fa2" weight={6} opacity={0.75} />
//         )}
//       </MapContainer>
//     </div>
//   );
// };

// const styles = {
//   container: { display: 'flex', flexDirection: 'column', width: '100%', height: '600px', fontFamily: 'sans-serif' },
//   controlPanel: { padding: '15px', backgroundColor: '#f8f9fa', display: 'flex', flexDirection: 'column', gap: '10px', borderBottom: '1px solid #ddd' },
//   btn: { padding: '8px 12px', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', alignSelf: 'flex-start' },
//   stats: { backgroundColor: '#f3f3f9', padding: '10px', borderRadius: '4px', borderLeft: '4px solid #1976d2' },
//   statusText: { margin: '4px 0', fontSize: '13px', color: '#555' },
//   text: { margin: '4px 0', fontSize: '14px' },
//   map: { width: '100%', flexGrow: 1 }
// };

// export default FreeRoutingMap;


import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// ---- Icons ----
const makeIcon = (color) => new L.Icon({
  iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const redIcon = makeIcon('red');       // accident site
const blueIcon = makeIcon('blue');     // nearest hospital
const violetIcon = makeIcon('violet'); // nearest police station

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
const OSRM_URL = 'https://router.project-osrm.org/route/v1/driving';

const haversineKm = (a, b) => {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

const findNearestFacility = async (location, amenity, radius = 6000) => {
  const [lat, lon] = location;
  const query = `[out:json][timeout:25];(node["amenity"="${amenity}"](around:${radius},${lat},${lon});way["amenity"="${amenity}"](around:${radius},${lat},${lon});relation["amenity"="${amenity}"](around:${radius},${lat},${lon}););out center;`;

  const res = await fetch(OVERPASS_URL, { method: 'POST', body: query });
  if (!res.ok) throw new Error(`Overpass request failed (${res.status})`);
  const data = await res.json();

  const candidates = (data.elements || [])
    .map((el) => {
      const elLat = el.lat ?? el.center?.lat;
      const elLon = el.lon ?? el.center?.lon;
      if (elLat == null || elLon == null) return null;
      const loc = [elLat, elLon];
      return {
        name: el.tags?.name || (amenity === 'hospital' ? 'Unnamed Hospital' : 'Unnamed Police Station'),
        location: loc,
        straightLineKm: haversineKm(location, loc)
      };
    })
    .filter(Boolean);

  if (candidates.length === 0) {
    if (radius >= 20000) return null;
    return findNearestFacility(location, amenity, radius + 6000);
  }

  candidates.sort((a, b) => a.straightLineKm - b.straightLineKm);
  return candidates[0];
};

const fetchRoute = async (start, end) => {
  const url = `${OSRM_URL}/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.code !== 'Ok' || !data.routes?.length) return null;
  const route = data.routes[0];
  return {
    path: route.geometry.coordinates.map((c) => [c[1], c[0]]),
    distanceKm: (route.distance / 1000).toFixed(2),
    durationMin: Math.ceil(route.duration / 60)
  };
};

const FreeRoutingMap = () => {
  const ahmedabadCenter = [23.0225, 72.5714];

  const [accidentLocation, setAccidentLocation] = useState([23.0500, 72.5850]);
  const [hospital, setHospital] = useState(null);
  const [police, setPolice] = useState(null);
  const [hospitalRoute, setHospitalRoute] = useState(null);
  const [policeRoute, setPoliceRoute] = useState(null);
  
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  
  // New State for handling the SMS/Email Dispatch
  const [alertStatus, setAlertStatus] = useState('idle'); // idle | sending | sent

  const dispatch = useCallback(async (site) => {
    setStatus('locating');
    setErrorMsg('');
    setHospitalRoute(null);
    setPoliceRoute(null);
    setAlertStatus('idle'); // Reset alert status on new crash

    try {
      const [nearestHospital, nearestPolice] = await Promise.all([
        findNearestFacility(site, 'hospital',5000),
        findNearestFacility(site, 'police',5000)
      ]);

      setHospital(nearestHospital);
      setPolice(nearestPolice);
      setStatus('routing');

      const [hRoute, pRoute] = await Promise.all([
        nearestHospital ? fetchRoute(nearestHospital.location, site) : null,
        nearestPolice ? fetchRoute(nearestPolice.location, site) : null
      ]);

      setHospitalRoute(hRoute);
      setPoliceRoute(pRoute);
      setStatus('done');
    } catch (err) {
      console.error('Dispatch lookup failed:', err);
      setStatus('error');
      setErrorMsg('Could not reach the map/routing service. Try again in a moment.');
    }
  }, []);

  useEffect(() => {
    dispatch(accidentLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const triggerNewAccident = () => {
    const randomLat = 22.9800 + Math.random() * 0.12;
    const randomLng = 72.5000 + Math.random() * 0.12;
    const newSite = [randomLat, randomLng];
    setAccidentLocation(newSite);
    dispatch(newSite);
  };

  // --- NEW FUNCTION: Simulate sending data to Node.js backend for SMS/Email ---
  const sendEmergencyAlerts = () => {
    setAlertStatus('sending');
    
    // The payload that would be sent to your actual backend API via fetch/axios
    const emergencyPayload = {
        crashCoordinates: accidentLocation,
        hospitalAssigned: hospital?.name,
        policeAssigned: police?.name,
        severity: 'HIGH_IMPACT',
        timestamp: new Date().toISOString()
    };
    
    console.log("Transmitting to backend API:", emergencyPayload);

    // Simulate network delay of 1.5 seconds to show the UI loading state
    setTimeout(() => {
        setAlertStatus('sent');
        // In production, this is where you handle the real backend response
    }, 1500);
  };

  const isBusy = status === 'locating' || status === 'routing';

  return (
    <div style={styles.container}>
      <div style={styles.controlPanel}>
        <h3 style={{ margin: 0, color: '#d32f2f' }}>🚨 Auto-Dispatch System</h3>

        <button style={{ ...styles.btn, opacity: isBusy ? 0.6 : 1 }} onClick={triggerNewAccident} disabled={isBusy}>
          {isBusy ? 'System Scanning…' : 'Simulate New Crash Location'}
        </button>

        {status === 'locating' && <p style={styles.statusText}>📡 Scanning OpenStreetMap for nearest responders…</p>}
        {status === 'routing' && <p style={styles.statusText}>🛣️ Calculating ETA and road paths…</p>}
        {status === 'error' && <p style={{ ...styles.statusText, color: '#d32f2f' }}>⚠️ {errorMsg}</p>}

        {/* --- Alert Dispatch UI Section --- */}
        {status === 'done' && (
            <div style={styles.alertSection}>
                {alertStatus === 'idle' && (
                    <button style={styles.alertBtn} onClick={sendEmergencyAlerts}>
                        Transmit SMS/Email to Responders
                    </button>
                )}
                {alertStatus === 'sending' && (
                    <span style={styles.sendingText}>⏳ Establishing secure connection... Sending data...</span>
                )}
                {alertStatus === 'sent' && (
                    <div style={styles.successBox}>
                        ✅ <strong>SUCCESS:</strong> Encrypted SMS & Email dispatched to {hospital?.name} and {police?.name}.
                    </div>
                )}
            </div>
        )}

        {hospital && (
          <div style={{ ...styles.stats, borderLeftColor: '#1976d2' }}>
            <p style={styles.text}><strong>🏥 Nearest Hospital:</strong> {hospital.name}</p>
            {hospitalRoute ? (
              <p style={styles.text}>
                <strong>Distance:</strong> {hospitalRoute.distanceKm} km &nbsp;|&nbsp; <strong>ETA:</strong> {hospitalRoute.durationMin} min
              </p>
            ) : status === 'done' ? (
              <p style={styles.text}>No drivable route found.</p>
            ) : null}
          </div>
        )}

        {police && (
          <div style={{ ...styles.stats, borderLeftColor: '#7b1fa2' }}>
            <p style={styles.text}><strong>🚓 Nearest Police Station:</strong> {police.name}</p>
            {policeRoute ? (
              <p style={styles.text}>
                <strong>Distance:</strong> {policeRoute.distanceKm} km &nbsp;|&nbsp; <strong>ETA:</strong> {policeRoute.durationMin} min
              </p>
            ) : status === 'done' ? (
              <p style={styles.text}>No drivable route found.</p>
            ) : null}
          </div>
        )}
      </div>

      <MapContainer center={ahmedabadCenter} zoom={12} style={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={accidentLocation} icon={redIcon}>
          <Popup>💥 Accident Site</Popup>
        </Marker>

        {hospital && (
          <Marker position={hospital.location} icon={blueIcon}>
            <Popup>🏥 {hospital.name}</Popup>
          </Marker>
        )}

        {police && (
          <Marker position={police.location} icon={violetIcon}>
            <Popup>🚓 {police.name}</Popup>
          </Marker>
        )}

        {hospitalRoute && (
          <Polyline positions={hospitalRoute.path} color="#1976d2" weight={6} opacity={0.75} />
        )}

        {policeRoute && (
          <Polyline positions={policeRoute.path} color="#7b1fa2" weight={6} opacity={0.75} />
        )}
      </MapContainer>
    </div>
  );
};

const styles = {
  container: { display: 'flex', flexDirection: 'column', width: '100%', height: '700px', fontFamily: 'sans-serif' },
  controlPanel: { padding: '15px', backgroundColor: '#1e1e1e', color: '#fff', display: 'flex', flexDirection: 'column', gap: '10px' },
  btn: { padding: '10px 14px', backgroundColor: '#d32f2f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  alertSection: { marginTop: '10px', marginBottom: '10px' },
  alertBtn: { padding: '10px', width: '100%', backgroundColor: '#ff9800', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' },
  sendingText: { color: '#ff9800', fontWeight: 'bold', fontSize: '14px' },
  successBox: { backgroundColor: '#2e7d32', color: '#fff', padding: '10px', borderRadius: '4px', fontSize: '13px' },
  stats: { backgroundColor: '#2c2c2c', padding: '10px', borderRadius: '4px', borderLeft: '4px solid' },
  statusText: { margin: '4px 0', fontSize: '13px', color: '#aaa' },
  text: { margin: '4px 0', fontSize: '14px', color: '#eee' },
  map: { width: '100%', flexGrow: 1 }
};

export default FreeRoutingMap;