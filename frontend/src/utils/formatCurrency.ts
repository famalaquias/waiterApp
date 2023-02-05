// função que vai implementar a moeda brasileira R$ no preço;
export function formatCurrency(value: number) {
  return new Intl.NumberFormat(
    'pt-br',
    { style: 'currency', currency:'BRL' }
  ).format(value);
}
