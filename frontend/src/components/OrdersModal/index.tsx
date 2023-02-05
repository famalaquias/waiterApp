import closeIcon from '../../assets/images/close-icon.svg';

import { Overlay, ModalBody, OrderDetails, Actions } from './styles';

import { Order } from '../../types/Order';

import { formatCurrency } from '../../utils/formatCurrency';


interface OrdersModalProps {
  visible: boolean;
  order: Order | null;

  // onClose: é uma propriedade que recebe uma função que não retorna nada (void);
  // a onClose contém a função para fechar o botão X da tela de OrdersModal;
  onClose: () => void;
  onCancelOrder: () => Promise<void>;
  isLoading: boolean;
  onChangeOrderStatus: () => void;
}

export function OrdersModal({
  visible,
  order,
  onClose,
  onCancelOrder,
  isLoading,
  onChangeOrderStatus
}: OrdersModalProps) {
  if (!visible || !order) { // se isModalVisible for 'false', não mostre nada na tela;
    return null;
  }

  // Função que calcula o valor total dos pedidos;
  // Pega o valor que tem dentro de total e soma a ele o resultado preço * a quantidade;
  // 1ª Formula de fazer:
  // let total = 0;
  // order.products.forEach(({ product, quantity }) => {
  //   total += product.price * quantity;
  // });

  // 2ª Formula de fazer:
  // Reduce: pega o valor inicial que passamos 0 e vai jogar para dentro do total (que é o acumulador);
  // Na próxima execução, o valor desse total será o que retornar de dentro da função: total + (product.price * quantity);
  const total = order.products.reduce((total, { product, quantity }) => {
    return total + (product.price * quantity);
  }, 0);

  return (
    // se o isModalVisible for 'true', cai no Overlay, mostrando os detalhes do pedido na tela.
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>

          <button type='button' onClick={onClose}>
            <img src={closeIcon} alt='Ícone de fechar página' />
          </button>
        </header>

        <div className='status-container'>
          <small>Status do Pedido</small>
          <div>
            <span>
              {order.status === 'WAITING' && '🕑'}
              {order.status === 'IN_PRODUCTION' && '👩‍🍳'}
              {order.status === 'DONE' && '✅'}
            </span>
            <strong>
              {order.status === 'WAITING' && 'Fila de espera'}
              {order.status === 'IN_PRODUCTION' && 'Em preparação'}
              {order.status === 'DONE' && 'Pronto!'}
            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>

          <div className='order-items'>
            {order.products.map(({ _id, product, quantity }) => (
              <div className='item' key={_id}>
                <img
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
                  alt={product.name}
                  width="56"
                  height="28.51"
                />

                <span className='quantity'>{quantity}x</span>

                <div className='product-details'>
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className='total'>
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetails>

        <Actions>
          {order.status != 'DONE' && (
            <button
              type='button'
              className='primary'
              disabled={isLoading}
              onClick={onChangeOrderStatus}
            >
              <span>
                {order.status === 'WAITING' && '👩‍🍳'}
                {order.status === 'IN_PRODUCTION' && '✅'}
              </span>
              <strong>
                {order.status === 'WAITING' && 'Iniciar Produção'}
                {order.status === 'IN_PRODUCTION' && 'Concluir Pedido'}
              </strong>
            </button>
          )}

          <button
            type='button'
            className='secondary'
            onClick={onCancelOrder}
            disabled={isLoading}
          >
            Cancelar Pedido
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}

// renderizar a lista de produtos pedido através dp MAP;
