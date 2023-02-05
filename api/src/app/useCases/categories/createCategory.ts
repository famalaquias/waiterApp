import { Request, Response } from 'express';

import { Category } from '../../models/Category';

// request: lugar onde estão armazenadas as informações que estão sendo recebidas, mais especificamente, no body;
export async function createCategory(req: Request, res: Response) {
  try {
    const { icon, name } = req.body;

    const category = await Category.create({ icon, name });

    res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
