import { Request, Response } from 'express'

import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';

import orphanagesView from '../views/orphanages_view'

import * as Yup from 'yup'

export default {
  async index(req: Request, res: Response) {

    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    })

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
      latitude,
      longitude,
      about,
      instructions,
      open_on_weekends,
      images,
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      opening_hours: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required()
      }))
    })

    await schema.validate(data, {
      abortEarly: false
    })

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return res.status(201).json({
      data: orphanagesView.render(orphanage),
      message: 'Orphanage created successfully',
      status: 201,
    })

  }
};