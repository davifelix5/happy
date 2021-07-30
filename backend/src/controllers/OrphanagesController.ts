import { Request, Response } from 'express'

import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';

import orphanagesView from '../views/orphanages_view'

import orphanageSchema from '../validation/schemas/orphanageSchema'
import orphanageUpdateSchema from '../validation/schemas/orphanageUpdateSchema'

export default {
  async index(req: Request, res: Response) {

    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images'],
      where: { approved: true }
    })

    return res.status(200).json({
      data: orphanagesView.renderMany(orphanages),
      message: 'Orphanages found successfully',
      status: 200,
    })

  },

  async listPending(req: Request, res: Response) {

    const orphanageRepository = getRepository(Orphanage)

    const orphanages = await orphanageRepository.find({
      where: { approved: false }
    })


    if (!orphanages.length) {
      return res.status(404).json({
        message: 'There are no pending registrations',
        status: 404
      })
    }

    return res.status(200).json({
      data: orphanagesView.renderMany(orphanages),
      message: 'Orphanages found successfully',
      status: 200,
    })

  },

  async show(req: Request, res: Response) {

    const { id } = req.params

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    })

    return res.status(200).json({
      data: orphanagesView.render(orphanage),
      message: 'Orphanage found successfully',
      status: 200,
    })

  },

  async create(req: Request, res: Response) {

    const {
      name,
      whatsapp,
      opening_hours,
      latitude,
      longitude,
      about,
      instructions,
      open_on_weekends
    } = req.body;

    const requestImages = req.files as Express.Multer.File[]
    const images = requestImages.map(file => {
      return { path: file.filename }
    })

    const orphanagesRepository = getRepository(Orphanage);

    const data = {
      name,
      opening_hours,
      whatsapp,
      latitude,
      longitude,
      about,
      instructions,
      open_on_weekends: open_on_weekends.toLowerCase() === 'true',
      images,
    }

    await orphanageSchema.validate(data, {
      abortEarly: false
    })

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return res.status(201).json({
      data: orphanagesView.render(orphanage),
      message: 'Orphanage created successfully',
      status: 201,
    })

  },

  async delete(req: Request, res: Response) {

    const { id } = req.params
    const orphanageRepository = getRepository(Orphanage)

    try {

      const orphanage = await orphanageRepository.findOne(id)

      if (!orphanage) {
        return res.status(404).json({
          message: 'There is not an orphanage with such id',
          status: 404
        })
      }

      await orphanageRepository.remove(orphanage)

      return res.status(204).send()

    } catch (err) {
      return res.status(400).json({
        message: 'There has been an error while deleting the orphanage',
        status: 400
      })
    }

  },

  async update(req: Request, res: Response) {

    const id = Number(req.params.id)
    const data = req.body
    const orphanageRepository = getRepository(Orphanage)

    await orphanageUpdateSchema.validate(data, {
      abortEarly: false,
    })

    try {

      const orphanage = await orphanageRepository.findOne(id)

      if (!orphanage) {
        return res.status(404).json({
          message: 'There is no orphanage with such id',
          status: 404
        })
      }
      orphanageRepository.merge(orphanage, data)

      await orphanageRepository.save(orphanage)

      return res.status(204).send()

    } catch (err) {
      return res.status(400).json({
        message: 'There has been an error while updating orphanage',
        status: 400
      })
    }

  },

  async approve(req: Request, res: Response) {

    const { id } = req.params
    const orphanageRepository = getRepository(Orphanage)

    try {

      const orphanage = await orphanageRepository.findOne({ where: { id } })

      if (!orphanage) {
        return res.status(404).json({
          message: 'There is no orphanage with such id!',
          status: 404,
        })
      }

      orphanage.approved = true
      await orphanageRepository.save(orphanage)

      return res.status(204).json({
        message: 'Orphanage updated successfully',
        status: 204
      })

    } catch (err) {
      return res.status(400).json({
        message: 'There has been an error while approving the orphanage',
        status: 400
      })
    }

  }
}