// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  through: {
    model: Product,
    unique: false,
    foreignKey: 'category_id'
    },
    as : 'product_category'
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE'
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false,
    foreignKey: 'product_id'
  },
  as: 'product_tag' 
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false,
    foreignKey: 'tag_id'
  },
    });
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
