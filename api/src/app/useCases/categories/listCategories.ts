import { Request, Response } from 'express';

import { Category } from '../../models/Category';

// acessa a coleção de categorias no BD e busca todos os itens;
export async function listCategories(req: Request, res: Response) {
  try {
    // await: espera a resposta da Promise;
    const categories = await Category.find();

    // o json retorna um objeto javascript, ou seja, um array de categories;
    res.status(201).json(categories);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
