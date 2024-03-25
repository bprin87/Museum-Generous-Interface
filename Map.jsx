import './Map.css'
import {useRef, useState, useEffect} from 'react';
import {MapContainer, TileLayer, ZoomControl, Marker, Tooltip} from "react-leaflet";
import {setKey, fromAddress} from 'react-geocode';
import "leaflet/dist/leaflet.css";

function Map() {

    // items need to be displayed inside artefact component
    const [items, setItems] = useState([]);

    // variable for total items in a location
    const [locationTotal, setLocationTotal] = useState([]);

    // API key for google geocode
    setKey(import.meta.env.VITE_API_KEY); 

    // retrieve first 20 items from museum api 
    useEffect(() => {
        const fetchData = async () => {
        const museum_url = 'https://api.vam.ac.uk/v2/objects/search';
        const itemsPerPage = 15;
        const totalItems = 20; //500
        const totalPages = Math.ceil(totalItems/itemsPerPage);
        let allItems = [];
        const totalLocations = [];

        // loop through each page and retrieve items
        for(let page = 1; page <= totalPages; page++) {
            const response = await fetch(`${museum_url}?page=${page}&page_size=${itemsPerPage}`);
            const data = await response.json();

            // loop through api data records
            for (const record of data.records) {
                // use geocode to get coordinates of primaryPlace which is the
                // original location of each item
                if(record._primaryPlace) {
                    const results = await fromAddress(record._primaryPlace);
                    const {lat, lng} = results.results[0].geometry.location;

                    // store coordinates in each record
                    record.coordinates = {lat, lng};

                    // count total number of each item location
                    totalLocations[record._primaryPlace] = (totalLocations[record._primaryPlace] || 0) + 1;
                    
                }
            }

            allItems = [...allItems, ...data.records];  
        }

        setItems(allItems);
        setLocationTotal(totalLocations);
       
        };

        fetchData();
        
    }, []);

    // gains direct access to Leaflet map instance for better control of features
    const mapRef = useRef(null);
    const latitutude = 20;
    const longitude = 0;
    
    return (

       
       <MapContainer className='map-container' data-testid='map-container' center={[latitutude, longitude]} zoom={2} minZoom={2} maxZoom={18} zoomControl={false} ref={mapRef}>
            <TileLayer attribution='attribution: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'/>
            <ZoomControl position='bottomright'/>
            {items.map((item, index) => (item.coordinates && (
                <Marker key={index} position={[item.coordinates.lat, item.coordinates.lng]}>
                    <Tooltip direction='right' offset={[0, 0]} permanent>{locationTotal[item._primaryPlace]}</Tooltip>
                </Marker>
            )
            ))}
       </MapContainer>
       
    )

}

export default Map


