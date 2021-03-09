const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: [
      'id',
      'category_name',

      // from product data
      'product_name',
      'price',
      'stock',
      // 'category_id',

      // from tag
      'tag_name'
    ],
    include: [
      {
        model: Product,
        attributes: [ 'product_name', 'price', 'stock'],
      },
      {
        model: Tag,
        attributes: ['tag_name']
      }
    ]
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'category_name',

      // from product data
      'product_name',
      'price',
      'stock',
      // 'category_id',

      // from tag
      'tag_name'
    ],
    include: [
      {
        model: Product,
        attributes: [ 'product_name', 'price', 'stock'],
      },
      {
        model: Tag,
        attributes: ['tag_name']
      }
    ]

  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(400).json({ message: "No category id found!" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    catagory_name: req.body.category_name
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value

  Category.update(req.body, {
    where: {
      id: req.params.id,
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(400).json({ message: 'No category found with this ID!' });
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value

  Category.destroy(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(400).json({ message: 'No category found with this ID!' });
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
