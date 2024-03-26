import './Map.css'
import {useRef} from 'react';
import {MapContainer, TileLayer, ZoomControl, Marker, Tooltip} from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import "leaflet/dist/leaflet.css";
import Api from './Api';

export default function Map() {

    // variables to be reused from Api component 
    const {items, locationTotal} = Api();

    // gains direct access to Leaflet map instance for better control of features
    const mapRef = useRef(null);
    const latitutude = 20;
    const longitude = 0;

    return (

        <MapContainer className='map-container' data-testid='map-container' center={[latitutude, longitude]} zoom={2} minZoom={2} maxZoom={18} zoomControl={false} ref={mapRef}>
                <TileLayer attribution='attribution: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'/>
                <ZoomControl position='bottomright'/>
                <MarkerClusterGroup maxClusterRadius={30} disableClusteringAtZoom={11}>
                {items.map((item, index) => (item.coordinates && (
                    <Marker key={index} position={[item.coordinates.lat, item.coordinates.lng]}>
                        <Tooltip direction='right' offset={[0, 0]} permanent>{locationTotal[item._primaryPlace]}</Tooltip>
                    </Marker>
                )
                ))}
                </MarkerClusterGroup>
        </MapContainer>

    )

}