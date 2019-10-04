const Category = require('../../models/category');

const getAll = (req, res, next) => {
    Category.find()
      .select('id name')
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          categories: docs.map(doc => {
            return {
              ...{ doc },
              request: {
                type: 'GET',
                url: 'http://localhost:3000/categories/' + doc.id
              }
            }
          })
        };
        res.status(200).json(response);  
      })
      .catch(
        err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        } 
      );
};

const getById = (req, res, next) => {
  const { id } = req.params;
  Category.findById(id)
    .select('name')
    .exec()
    .then( doc => { 
        if (doc) {
          res.status(200).json({
            ...{ doc },
            request: {
              type: 'GET',
              url: 'http://localhost:3000/categories/' + doc.id
            } 
          });
        } else {
          res.status(404).json({ message: 'No valid entry found for provided ID'});
        }
      })
    .catch( err => { 
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
};

const insert = (req, res, next) => {
  const category = new Category ({
    name: req.body.name
  });
  category.save()
    .then(result => { 
      res.status(201).json({
        message: 'Created category successfully',
        createdCategory: {
          id: result.id,
          name: result.name,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/categories/' + result.id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    }); 
};

const update = (req, res, next) => {
  const { id } = req.params;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Category.update(
    { id: id },
    { $set: updateOps })
    .exec()
    .then( result => {
      res.status(200).json({
        message: 'Category updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/categories/' + id
        }
      });
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
};

const remove = (req, res, next) => {
  const { id } = req.params;
  Category.remove({id: id})
    .exec()
    .then( () => {
      res.status(200).json({
        message: 'Category deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:3000/categories/'
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
};

module.exports = {
  getAll,
  insert,
  getById,
  update,
  remove,
};
