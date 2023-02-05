import styled from 'styled-components';

// pode executar funções usando crase ``;
// passa estilos para o componente Container, que será exportado e chamado no componente Header;
export const Container = styled.header`
  background: #D73035; // cor de fundo;
  display: flex;
  justify-content: center; // alinha os elementos no centro;
  height: 198px; // altura;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%; // largura;
  max-width: 1216px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  // dentro de Content consigo estilizar a div com className page-details;
  .page-details {
    h1 {
      color: #fff;
      font-size: 32px;
    }

    h2 {
      color: #fff;
      font-size: 16px;
      font-weight: 400;
      opacity: 0.9;
      margin-top: 6px;
    }
  }
`;
