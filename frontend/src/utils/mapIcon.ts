import Leaflet from 'leaflet';

import mapMarkerImage from '../images/map-marker.svg'

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImage,
  iconAnchor: [29, 68],
  iconSize: [58, 68],
  popupAnchor: [170, 5]
})

export default mapIcon;
