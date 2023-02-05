import { useState } from 'react';
import { toast } from 'react-toastify';

import { Order } from '../../types/Order';
import { api } from '../../utils/api';
import { OrdersModal } from '../OrdersModal';
import { Board, OrdersContainer } from './styles';

// cria uma interface para dizer qual o formato do objeto de props;
interface OrdersBoardProps {
  icon: string;
  title: string;

  // estamos tipando o objeto de orders, que vai ser um array de objetos do tipo Order;
  // mostra quais pedidos estão dentro do OrdersBoard;
  orders: Order[];
  // criando componentes do Orders;
  // serve para simplificar o código, crio aqui a estrutura do meu código e
  // chamo esse componentes quantas vezes quiser no componente Orders.

  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void;
}

// para renderizar pedidos e títulos diferentes devem ser criadas as Props;
// props: são propriedades ou atributos de um elemento;
export function OrdersBoard({ icon, title, orders, onCancelOrder, onChangeOrderStatus }: OrdersBoardProps) {

  // o modal só será aberto quando o botão for clicado;
  // useState armazena a informação se o modal está aberto(true) ou não(false);
  // inicialmente o modal está fechado (false), so abre quando clicado;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);

  // criando um modal (função handleOpenModal), ou seja, uma nova página com os detalhes do pedido;
  // essa função será executada no momento que clicar no botão, que por sua vez vai fazer alterações no estato e isModalVisible para true;
  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  // criando uma função para fechar o botão X da tela de OrdersModal;
  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  // criando uma função para mudar o status do pedido de
  // 'fila de espera' para 'em produção';
  async function handleChangeOrderStatus() {
    setIsLoading(true);

    const status = selectedOrder?.status === 'WAITING'
      ? 'IN_PRODUCTION'
      : 'DONE';

    await api.patch(`/orders/${selectedOrder?._id}`, { status });

    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado!`);

    onChangeOrderStatus(selectedOrder!._id, status);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  // criando uma função para 'Cancelar Pedido';
  async function handleCancelOrder() {
    setIsLoading(true);

    // await new Promise(resolve => setTimeout(resolve, 3000));
    await api.delete(`/orders/${selectedOrder?._id}`);

    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado!`);

    onCancelOrder(selectedOrder!._id);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  return (
    <Board>
      <OrdersModal
        // passa para o arquivo OrdersModal via props;
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
        onChangeOrderStatus={handleChangeOrderStatus}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order) => (
            <button type='button' key={order._id} onClick={() => handleOpenModal(order)}>
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  );
}

// Deve renderizar os elementos do array de Orders no React através do MAP;
// Map: gera um novo array, a partir do array que está colocando dentro dele, no caso, o array de order;
// Precisa saber qual é o item que o usuário clicou, para saber qual pedido desse cliente;
