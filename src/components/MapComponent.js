import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const customIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

// Kümeleme içindeki sayıları göstermek için özel ikon
const createClusterCustomIcon = function (cluster) {
    return new L.DivIcon({
        html: `<div style="
            background-color: rgba(255, 165, 0, 0.8);
            color: white;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            font-size: 16px;
            font-weight: bold;
            ">${cluster.getChildCount()}</div>`,
        className: 'custom-marker-cluster',
        iconSize: [40, 40],
    });
};

const createCustomIcon = (number) => {
    return new L.DivIcon({
        html: `<div style="
            background-color: rgba(255, 165, 0, 0.8);
            color: white;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            font-size: 16px;
            font-weight: bold;
            ">${number}</div>`,
        className: 'custom-marker',
        iconSize: [40, 40],
    });
};

const MapComponent = () => {
    const [coordinates, setCoordinates] = useState([
        {name: 'Ahmet Yılmaz', createdDate: '01-02-2025 14:25', latitude: 51.505, longitude: -0.09},
        {name: 'Mehmet Kaya', createdDate: '01-02-2025 09:15', latitude: 51.505, longitude: -0.09},
        {name: 'Fatma Demir', createdDate: '01-02-2025 11:30', latitude: 51.505, longitude: -0.09},
        {name: 'Ali Çelik', createdDate: '01-02-2025 16:45', latitude: 51.505, longitude: -0.09},
        {name: 'Zeynep Şahin', createdDate: '01-02-2025 13:20', latitude: 51.505, longitude: -0.09},
        {name: 'Mustafa Özdemir', createdDate: '01-02-2025 10:05', latitude: 51.505, longitude: -0.09},
        {name: 'Ayşe Arslan', createdDate: '01-02-2025 15:40', latitude: 51.505, longitude: -0.09},
        {name: 'Hüseyin Doğan', createdDate: '01-02-2025 12:55', latitude: 51.505, longitude: -0.09},
        {name: 'Emine Aydın', createdDate: '01-02-2025 08:30', latitude: 51.505, longitude: -0.09},
        {name: 'İbrahim Yıldız', createdDate: '01-02-2025 17:15', latitude: 51.505, longitude: -0.09},
        {name: 'Hatice Özkan', createdDate: '01-02-2025 14:50', latitude: 51.505, longitude: -0.09},
        {name: 'Yusuf Koç', createdDate: '01-02-2025 11:25', latitude: 51.505, longitude: -0.09},
        {name: 'Merve Şen', createdDate: '01-02-2025 09:40', latitude: 51.505, longitude: -0.09},
        {name: 'Can Erdoğan', createdDate: '01-02-2025 16:10', latitude: 51.515, longitude: -0.1},
        {name: 'Selin Kurt', createdDate: '01-02-2025 13:35', latitude: 51.512, longitude: -0.084},
        {name: 'Burak Çetin', createdDate: '01-02-2025 10:20', latitude: 51.508, longitude: -0.087},
        {name: 'Esra Aslan', createdDate: '01-02-2025 15:45', latitude: 51.513, longitude: -0.092},
        {name: 'Emre Yavuz', createdDate: '01-02-2025 12:15', latitude: 51.509, longitude: -0.095},
        {name: 'Elif Öztürk', createdDate: '01-02-2025 08:50', latitude: 51.511, longitude: -0.088},
        {name: 'Ömer Kılıç', createdDate: '01-02-2025 17:30', latitude: 51.507, longitude: -0.091},
        {name: 'Ayşe Demir', createdDate: '01-02-2025 14:05', latitude: 51.514, longitude: -0.086},
        {name: 'Mehmet Arslan', createdDate: '01-02-2025 11:40', latitude: 51.506, longitude: -0.093},
        {name: 'Fatma Yıldız', createdDate: '01-02-2025 09:25', latitude: 51.510, longitude: -0.089},
        {name: 'Ali Özkan', createdDate: '01-02-2025 16:50', latitude: 51.515, longitude: -0.085},
        {name: 'Zeynep Koç', createdDate: '01-02-2025 13:15', latitude: 51.508, longitude: -0.094},
        {name: 'Mustafa Şen', createdDate: '01-02-2025 10:30', latitude: 51.512, longitude: -0.087},
        {name: 'Ayşe Erdoğan', createdDate: '01-02-2025 15:55', latitude: 51.509, longitude: -0.092},
        {name: 'Hüseyin Kurt', createdDate: '01-02-2025 12:40', latitude: 51.513, longitude: -0.088},
        {name: 'Emine Çetin', createdDate: '01-02-2025 08:15', latitude: 51.507, longitude: -0.095},
        {name: 'İbrahim Aslan', createdDate: '01-02-2025 17:40', latitude: 51.511, longitude: -0.086}
    ]);

    // useEffect(() => {
    //     fetch('https://api.example.com/coordinates')
    //         .then(response => response.json())
    //         .then(data => setCoordinates(data))
    //         .catch(error => console.error('Error fetching coordinates:', error));
    // }, []);

    return (
        <MapContainer center={[51.505, -0.09]} zoom={17} style={{ height: '1000px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={19}
            />
            <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}
                maxClusterRadius={80} >
                {coordinates.map((coord, index) => (
                    <Marker key={index} position={[coord.latitude, coord.longitude]} icon={createCustomIcon(index + 1)}>
                        <Tooltip>
                            <div>
                                <strong>İsim:</strong> {coord.name}<br />
                                <strong>Oluşturulma Tarihi:</strong> {coord.createdDate}<br />
                                <strong>Koordinatlar:</strong> {coord.latitude}, {coord.longitude}<br />
                                <strong>Sayı:</strong> 10
                            </div>
                        </Tooltip>
                        <Popup>
                            <div>
                                <strong>İsim:</strong> {coord.name}<br />
                                <strong>Oluşturulma Tarihi:</strong> {coord.createdDate}<br />
                                <strong>Koordinatlar:</strong> {coord.latitude}, {coord.longitude}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    );
};

export default MapComponent; 