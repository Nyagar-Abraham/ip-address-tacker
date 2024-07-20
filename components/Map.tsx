'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { DivIcon } from 'leaflet';
import { FC, useEffect } from 'react';

// Define custom icon inside the client component
const createCustomIcon = (): DivIcon => {
	return L.divIcon({
		className: '',
		html: `
        <div class="flex items-center justify-center">
            <svg class="w-10 h-10 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C8.68629 2 6 4.68629 6 8C6 12.5615 12 22 12 22C12 22 18 12.5615 18 8C18 4.68629 15.3137 2 12 2ZM8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8C16 10.4853 13.9566 14.0057 12 17.2548C10.0434 14.0057 8 10.4853 8 8ZM10 8C10 6.89543 10.8954 6 12 6C13.1046 6 14 6.89543 14 8C14 9.10457 13.1046 10 12 10C10.8954 10 10 9.10457 10 8Z" fill="currentColor"/>
            </svg>
        </div>`,
		iconSize: [40, 40], // Size of the custom marker
		iconAnchor: [20, 40], // Anchor point of the icon (half of width and height)
		popupAnchor: [0, -40], // Position of the popup relative to the icon
	});
};

interface MyMapClientComponentProps {
	position: [number, number];
	place: string;
}

const ChangeView: FC<{ position: [number, number] }> = ({ position }) => {
	const map = useMap();
	useEffect(() => {
		map.setView(position);
	}, [position, map]);
	return null;
};

const Map: FC<MyMapClientComponentProps> = ({ position, place }) => {
	return (
		<MapContainer
			center={position}
			zoom={13}
			className="h-screen w-full"
			scrollWheelZoom={false}
		>
			<ChangeView position={position} />
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={position} icon={createCustomIcon()}>
				<Popup>
					<div className="text-sm bg-primary-peach text-white p-2 rounded-lg">
						{place}
					</div>
				</Popup>
			</Marker>
		</MapContainer>
	);
};

export default Map;
