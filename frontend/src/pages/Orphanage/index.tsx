import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import Sidebar from '../../components/Sidebar';

import mapIcon from '../../utils/mapIcon'

import './orphanage.css';

import api from '../../services/api';

interface Params {
  id?: string
}

interface Image {
  id: number
  url: string
}

interface Orphanage {
  id: number
  name: string
  latitude: number
  longitude: number
  opening_hours: string
  open_on_weekends: boolean
  instructions: string
  about: string
  images: Image[]
}

const Orphanage: React.FC = () => {

  const [orphanage, setOrphanage] = useState<Orphanage>({} as Orphanage)
  const { id: orphanageId } = useParams<Params>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    api.get(`/orphanages/${orphanageId}`)
      .then(res => res.data)
      .then(res => res.data)
      .then(orphanage => setOrphanage(orphanage))
  }, [orphanageId]);

  if (!Object.keys(orphanage).length) {
    return <div>Loading...</div>
  }

  console.log(orphanage)

  return (
    <div id="page-orphanage">

      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[currentImageIndex].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map((img, index) => {
              return (
                <button
                  key={img.id}
                  className={currentImageIndex === index ? 'active' : ''}
                  type="button"
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img src={img.url} alt={orphanage.name} />
                </button>
              )
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {orphanage.opening_hours}
              </div>
              {
                orphanage.open_on_weekends ? (
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                  </div>
                ) : (
                    <div className="open-on-weekends dont-open">
                      <FiInfo size={32} color="#FF6690" />
                    Não atendemos <br />
                    fim de semana
                    </div>
                  )
              }
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Orphanage