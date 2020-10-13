import { Request, Response } from 'express'

import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';

export default {
  async index(req: Request, res: Response) {

    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    })

    return res.status(200).json({
      data: orphanages,
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
      data: orphanage,
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

    const orphanage = orphanagesRepository.create({
      name,
      opening_hours,
      latitude,
      longitude,
      about,
      instructions,
      open_on_weekends,
      images,
    });

    await orphanagesRepository.save(orphanage);

    return res.status(201).json({
      data: { ...orphanage },
      message: 'Orphanage created successfully',
      status: 201,
    })

  }
};