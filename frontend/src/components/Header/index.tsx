import logo from '../../assets/images/logo.svg';

import { Container, Content } from './styles';

export function Header() {
  return (
    <Container>
      <Content>
        <div className="page-details">
          <h1>Pedidos</h1>
          <h2>Acompanhe os pedidos dos clientes</h2>
        </div>

        <img src={logo} alt="WAITERAPP" />
      </Content>
    </Container>
  );
}

// Usa a extensão TSX quando o arquivo for usado dentro de outro arquivo.
