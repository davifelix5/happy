import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from "leaflet";

import { FiPlus, FiX } from "react-icons/fi";

import mapIcon from '../../utils/mapIcon'

import Sidebar from '../../components/Sidebar'

import '../../styles/pages/create-orphanage.css';

import api from '../../services/api'

const CreateOrphanage: React.FC = () => {

  const history = useHistory()

  const [latLong, setLatLong] = useState<[number, number]>([-23.5489, -46.6388]);
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [openingHours, setOpeningHours] = useState('')
  const [openOnWeekends, setOpenOnWeekends] = useState(true)
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagesPreviewUrl, setImagesPreviewUrl] = useState<string[]>([])

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setLatLong([lat, lng]);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(res => {
      const { latitude, longitude } = res.coords
      setLatLong([latitude, longitude])
    })
  }, [])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const [latitude, longitude] = latLong
    const data = new FormData()

    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('name', name)
    data.append('about', about)
    data.append('instructions', instructions)
    data.append('opening_hours', openingHours)
    data.append('open_on_weekends', String(openOnWeekends))
    imageFiles.forEach(img => data.append('images', img))

    await api.post('/orphanages', data)

    alert('Cadastro realizado com sucesso!')

    history.push('/app')
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return
    const filesArray = Array.from(event.target.files)
    setImageFiles([...imageFiles, ...filesArray])

    const previewUrls = filesArray.map(img => URL.createObjectURL(img))
    setImagesPreviewUrl([...imagesPreviewUrl, ...previewUrls])
  }

  function handleRemoveImage(index: number) {
    setImageFiles(imageFiles.filter((file, i) => i !== index))
    setImagesPreviewUrl(imagesPreviewUrl.filter((file, i) => i !== index))
  }

  return (
    <div id="page-create-orphanage">

      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={latLong}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker interactive={false} icon={mapIcon} position={latLong} />
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name" maxLength={300}
                value={about}
                onChange={e => setAbout(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {imagesPreviewUrl.map((url, index) => {
                  return (
                    <div key={url} className="image-container">
                      <button type="button" onClick={() => handleRemoveImage(index)}>
                        <FiX size={24} color="#FF669D" />
                      </button>
                      <img src={url} alt={name} />
                    </div>
                  )
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

              </div>
              <input
                multiple
                type="file"
                id="image[]"
                onChange={handleSelectImages}
                accept=".jpg,.jpeg,.png"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={openingHours}
                onChange={e => setOpeningHours(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={`yes ${openOnWeekends ? 'active' : ''}`}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={`no ${!openOnWeekends ? 'active' : ''}`}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateOrphanage

