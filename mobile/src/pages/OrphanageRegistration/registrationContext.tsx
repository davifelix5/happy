import React, { createContext, useState } from 'react'

import api from '../../services/api'

interface ProviderProps {
  children: React.ReactNode
}

interface RegistrationContextData {
  name: string,
  setName(name: string): void
  whatsapp: string
  setWhatsapp(name: string): void
  opening_hours: string
  setOpeningHours(name: string): void
  open_on_weekends: boolean
  setOpenOnWeekends(name: boolean): void
  latitude: number
  setLatitude(name: number): void
  longitude: number
  setLongitude(name: number): void
  instructions: string
  setInstructions(name: string): void
  about: string
  setAbout(name: string): void
  images: string[],
  setImages(name: string[]): void
  sending: boolean
  setSending(sending: boolean): void
  handleCreateOrphanage(): Promise<void>
}

export const RegistrationContext = createContext<RegistrationContextData>({} as RegistrationContextData)

export function RegistrationContextProvider({ children }: ProviderProps) {
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [opening_hours, setOpeningHours] = useState('')
  const [instructions, setInstructions] = useState('')
  const [about, setAbout] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<string[]>([])
  const [sending, setSending] = useState(false)

  async function handleCreateOrphanage() {

    const data = new FormData()

    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('name', name)
    data.append('whatsapp', whatsapp)
    data.append('opening_hours', opening_hours)
    data.append('instructions', instructions)
    data.append('about', about)
    data.append('open_on_weekends', String(open_on_weekends))

    images.forEach((img, index) => {
      data.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: img
      } as any)
    })

    await api.post('orphanages', data)
  }

  return (
    <RegistrationContext.Provider value={{
      name, setName,
      whatsapp, setWhatsapp,
      opening_hours, setOpeningHours,
      instructions, setInstructions,
      about, setAbout,
      open_on_weekends, setOpenOnWeekends,
      images, setImages,
      latitude, setLatitude,
      longitude, setLongitude,
      sending, setSending,
      handleCreateOrphanage,
    }}>
      {children}
    </RegistrationContext.Provider>
  )
}

