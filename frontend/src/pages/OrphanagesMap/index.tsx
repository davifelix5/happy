import React from 'react';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet'

import mapMarkerImg from '../../images/map-marker.svg'

import 'leaflet/dist/leaflet.css'
import '../../styles/pages/orphanages-map.css'

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconAnchor: [29, 68],
  iconSize: [58, 68],
  popupAnchor: [170, 5]
})

const OrphanagesMap: React.FC = () => {
  return (
    <div id="page-map">

      <aside>

        <header>
          <img src={mapMarkerImg} alt="Happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>São Paulo</strong>
          <span>São Paulo</span>
        </footer>

      </aside>

      <Map
        center={[-23.5668582, -46.660879]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <Marker
          icon={mapIcon}
          position={[-23.5668582, -46.660879]}
        >
          <Popup closeButton={false} minWidth={248} maxWidth={248} className="map-popup">
            <span>Lar da Alegria</span>
            <Link to="">
              <FiArrowRight size={20} color="#fff" />
            </Link>
          </Popup>
        </Marker>
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </Map>

      <Link to="/" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>

    </div>
  );
}

export default OrphanagesMap;