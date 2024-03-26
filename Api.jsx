import {useState, useEffect} from 'react';
import {setKey, fromAddress} from 'react-geocode';

export default function Api() {

    // variable for artefact items which will be displayed inside artefact component
    const [items, setItems] = useState([]);

    // variable for total items in a location
    const [locationTotal, setLocationTotal] = useState([]);

    // variable to display loading text
    const [loading, setLoading] = useState(true);

    // retrieve first 20 items from museum api 
    useEffect(() => {

        // API key for google geocode
        setKey(import.meta.env.VITE_API_KEY); 

        // fetch museum api data
        const fetchData = async () => {
        const museum_url = 'https://api.vam.ac.uk/v2/objects/search';

        // each page has 15 artefact items
        const itemsPerPage = 15;

        // set total artefact items 
        const totalItems = 20; //500

        // get total number of pages based on total items
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

                    // store coordinates for each item
                    record.coordinates = {lat, lng};

                    // count total number of each item location
                    totalLocations[record._primaryPlace] = (totalLocations[record._primaryPlace] || 0) + 1;
  
                }
            }

            allItems = [...allItems, ...data.records];  
        }

        setItems(allItems);
        setLocationTotal(totalLocations);
        setLoading(false);
       
        };

        fetchData();
        
    }, []);

    // export variables to be reused inside other components
    return {items, locationTotal, loading};
}