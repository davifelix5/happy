import { Request, Response } from 'express'

import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';

export default {
  async index(req: Request, res: Response) {

    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find()

    return res.status(200).json({
      data: orphanages,
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
    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = orphanagesRepository.create({
      name,
      opening_hours,
      latitude,
      longitude,
      about,
      instructions,
      open_on_weekends
    });

    await orphanagesRepository.save(orphanage);

    return res.status(201).json({
      data: { ...orphanage },
      message: 'Orphanage created successfully',
      status: 201,
    })

  }
};