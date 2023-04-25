const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    if (!oneCategory) {
      res.status(404).json({ message: 'no category with this id was found'});
      return;
    }
    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updateCategory) {
      res.status(404).json({ message: 'there is no category with that id'});
      return;
    }
    res.status(200).json({ message: 'Success! Updates Complete'});
  } catch (err) {
    console.log("error", err);
    res.status(500).json(err);
  }
  });

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
try {
  const deleteCategory = await Category.destroy({
    where: {
      id: req.params.id
    }
    
  });
  if (!deleteCategory) {
    res.status (404).json({ message: "there was no category with that ID found"});
    return;
  }
  res.status(200).json({ message: "Success! It is gone."});
} catch (err) {
  res.status(500).json(err);
}
});


module.exports = router;
