import './Map.css'
import {useRef} from 'react';
import {MapContainer, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "@maptiler/sdk/dist/maptiler-sdk.css";



function Map() {

    const mapRef = useRef(null);
    const latitutude = 20;
    const longitude = 0;
    
    return (
       <MapContainer className='map-container' center={[latitutude, longitude]} zoom={2} minZoom={2} maxZoom={18} ref={mapRef}>
            <TileLayer attribution='attribution: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'/>
       </MapContainer>
    )

}

export default Map


