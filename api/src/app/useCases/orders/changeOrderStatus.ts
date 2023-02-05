import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function changeOrderStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // verifica se o status que está vindo dentro do body, ou seja, se está dentro desse array;
    if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
      // se o status não estiver dentro do array, retorna um erro;
      return res.status(400).json({
        error: 'Status should be one of these: WAITING, IN_PRODUCTION, DONE'
      });
    }

    // está buscando um documento por ID(orderId) e quando encontrar esse documento,
    // quer que faça um update no status setando o novo status como sendo o status
    // que está vindo no body;
    await Order.findByIdAndUpdate(orderId, { status });

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
