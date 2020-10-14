import React from 'react';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapIcon from '../../utils/mapIcon'

import Sidebar from '../../components/Sidebar'

import '../../styles/pages/orphanages-map.css'


const OrphanagesMap: React.FC = () => {
  return (
    <div id="page-map">
      <Sidebar />
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
            <Link to="/orphanage/1">
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