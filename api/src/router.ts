import path from 'node:path';

import { Router } from 'express';
import multer from 'multer';

import { createCategory } from './app/useCases/categories/createCategory';
import { listCategories } from './app/useCases/categories/listCategories';
import { createProduct } from './app/useCases/products/createProduct';
import { listProducts } from './app/useCases/products/listProducts';
import { listProductByCategory } from './app/useCases/categories/listProductByCategory';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrder } from './app/useCases/orders/createOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';

export const router = Router();

// o upload vai ser a execução do multer;
const upload = multer({
  // diskStorage: é um armazenamento em disco, dentro da máquina onde a aplicação está rodando;
  storage: multer.diskStorage({
    // no diskStorage será passado um objeto de configuração, onde:
    // primeira propriedade passada será uma função chamada destination:
    // caminho pro diretório onde quero que salve as imagens que estou fazendo upload dentro do projeto;
    // destination recebe o requeste, o arquivo que está sendo enviado e uma callback;
    // a callback recebe dois argumentos: um erro (null) e o caminho para a pasta onde salvo as imagens (uploads);
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    // serve para definir o nome dos arquivos que vamos fazer o upload;
    filename(req, file, callback) {
      // a callback recebe dois argumentos: um erro (null) e nome do arquivo que será salvo em uploads;
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// listar categorias - categories;
router.get('/categories', listCategories);

// criar categorias - categories;
router.post('/categories', createCategory);

// listar produtos - products;
router.get('/products', listProducts);

// criar produtos - products;
router.post('/products', upload.single('image'), createProduct);

// pegar um produto a partir de uma categoria;
router.get('/categories/:categoryId/products', listProductByCategory);

// listar ordens - orders;
router.get('/orders', listOrders);

// criar ordens - orders;
router.post('/orders',createOrder);

// alterar o order status;
// usa-se o patch ou o put quando está fazendo alterações dentro de um BD;
// patch: quando a alteração é parcial, por exemplo, aqui só o status será alterado;
// put: quando a alteração é total/completa, ou seja, em todo o BD;
router.patch('/orders/:orderId', changeOrderStatus);

// deletar/cancelar ordens - order;
router.delete('/orders/:orderId', cancelOrder);
