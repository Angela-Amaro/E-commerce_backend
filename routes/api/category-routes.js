const router = require('express').Router();
const { Category, Product, Category } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const Category = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(Category);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const Category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!Category) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(Category);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryNew = await Category.create({
      id: req.body.Category_id,
      Category_name: req.body.Category_name,
    });
    res.status(200).json(categoryNew);
  } catch (err) {
    res.status(400).json(err);
  }
  });

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryUpdate = await Category.update(req.body, {
      where: {
        id: req.params.id,
       }
    });
     res.status(200).json(categoryUpdate);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDelete = await Category.destroy(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(categoryDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
