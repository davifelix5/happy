import { Request, Response } from 'express'

import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';

export default {
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