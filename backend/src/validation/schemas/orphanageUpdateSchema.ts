import * as Yup from 'yup'

export default Yup.object().shape({
  name: Yup.string(),
  whatsapp: Yup.string().matches(/^\d{11}$/),
  opening_hours: Yup.string(),
  latitude: Yup.number(),
  longitude: Yup.number(),
  about: Yup.string().max(300),
  instructions: Yup.string(),
  open_on_weekends: Yup.boolean(),
  images: Yup.array(Yup.object().shape({
    path: Yup.string()
  }))
})
