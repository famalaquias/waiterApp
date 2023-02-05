import { model, Schema } from 'mongoose';

// o model vai executar dois argumentos: o Categoty (nome da const model) e a tipagem (Schema),
// ou seja, o formato/elementos que uma Category tem: name e icon;
export const Category = model('Category', new Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
}));
