import { model, Schema } from 'mongoose';

export const Product = model('Product', new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ingredients: {
    required: true,
    type: [{
      name: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
    }],
  },
  category: {
    // a category é o ID de alguma categoria;
    type: Schema.Types.ObjectId,
    required: true,
    // estabele um relacionamento/referência com a categoria - 'Category';
    ref: 'Category',
  },
}));
