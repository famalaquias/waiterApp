import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function listProductByCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;

    // lista todos os produtos onde a categoria for igual a categoria que está
    // recebendo nos paths (pelo id na URL).
    const products = await Product.find().where('category').equals(categoryId);

    res.status(201).json(products);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
