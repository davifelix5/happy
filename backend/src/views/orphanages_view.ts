import Orphanage from '../models/Orphanage'
import imagesView from './images_view'

export default {

  render(orphanage: Orphanage) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      whatsapp: orphanage.whatsapp,
      opening_hours: orphanage.opening_hours,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      open_on_weekends: orphanage.open_on_weekends,
      images: orphanage.images && imagesView.renderMany(orphanage.images),
      pending: !orphanage.approved
    }
  },

  renderMany(orphanages: Orphanage[]) {
    return orphanages.map(orphanage => this.render(orphanage))
  }

}