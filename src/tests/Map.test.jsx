import Map from '../components/Map';
import { expect, test} from 'vitest';
import {render} from '@testing-library/react';


test('renders map correctly', () => {
    const { container } = render(<Map />);
    
    // check if the map container is rendered
    const mapContainer = container.querySelector('.map-container');
    expect(mapContainer).toBeInTheDocument();
  
    // check tile layer is present
    const tileLayer = mapContainer.querySelector('.leaflet-tile-pane');
    expect(tileLayer).toBeInTheDocument();

});