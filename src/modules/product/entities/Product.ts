import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../../config/database';

interface ProductAttributes {
  id: number;
  name: string;
  description?: string;
  price: number;
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductCreationAttributes
  extends Optional<ProductAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public name!: string;
  public description?: string;
  public price!: number;
  public amount!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT.UNSIGNED,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: true,
  },
);
