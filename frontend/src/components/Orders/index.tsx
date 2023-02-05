import { useEffect, useState } from 'react';

import socketIo from 'socket.io-client';

import { Container } from './styles';

import { Order } from '../../types/Order';

import { api } from '../../utils/api';

import { OrdersBoard } from '../OrdersBoard';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket'],
    });

    socket.on('orders@new', (order) => {
      setOrders(prevState => prevState.concat(order));
    });
  }, []);

  useEffect(() => {
    api.get('/orders')
      .then(( { data }) => {
        setOrders(data);
      });
  }, []);

  const waiting = orders.filter((order) => order.status === 'WAITING');
  const inProduction = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const done = orders.filter((order) => order.status === 'DONE');

  function handleCancelOrder(orderId: string) {
    setOrders((prevState) => prevState.filter(order => order._id != orderId));
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders((prevState) => prevState.map((order) => (
      order._id === orderId
        ? { ...order, status}
        : order
    )));
  }

  return (
    <Container>
      <OrdersBoard
        icon="🕑"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="👩‍🍳"
        title="Em preparação"
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
    </Container>
  );
}

// // criando um array genérico de Orders:  colunas com os pedidos;
// const orders: Order[] = [
//   {
//     '_id': '6372e48cbcd195b0d3d0f7f3',
//     'table': '123',
//     'status': 'WAITING',
//     'products': [
//       {
//         'product': {
//           'name': 'Pizza quatro queijos',
//           'imagePath': '1668472896991-quatro-queijos.png',
//           'price': 40,
//         },
//         'quantity': 3,
//         '_id': '6372e48cbcd195b0d3d0f7f4'
//       },
//       {
//         'product': {
//           'name': 'Coca cola',
//           'imagePath': '1668473462705-coca-cola.png',
//           'price': 7,
//         },
//         'quantity': 2,
//         '_id': '6372e48cbcd195b0d3d0f7f5'
//       }
//     ],
//   }
// ];
