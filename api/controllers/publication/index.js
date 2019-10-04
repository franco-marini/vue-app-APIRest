const Publication = require('../../models/publication');
const Category = require('../../models/category');

const getAll = (req, res, next) => {
    Publication.find()
      .select('date link title content categories image')
      .populate('categories', 'name')
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          publications: docs.map(doc => {
            return {
              ...{ doc },
              request: {
                type: 'GET',
                url: 'http://localhost:3000/publications/' + doc.id
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
  Publication.findById(id)
    .select('date link title content categories image')
    .exec()
    .then( doc => { 
        if (doc) {
          res.status(200).json({
            ...{ doc },
            request: {
              type: 'GET',
              url: 'http://localhost:3000/publications/' + doc.id
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

const getByCategory = (req, res, next) => {
  const { categoryId } = req.params;
  Publication.find( { categories: categoryId } )
    .select('date link title content categories image')
    .exec()
    .then(publications => {
      console.log(publications)
      if (publications < 1) {
        return res.status(404).json({
          message: 'Category not found',
        });
      }
      return res.status(200).json({
        publications: publications
      });
    })
    .catch(err => { 
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
};

const insert = (req, res, next) => {
  Category.findById(req.body.categoryId)
    .then(category => {
      if (!category) {
        return res.status(404).json({
          message: 'Category not found'
        });
      }
      const publication = new Publication ({
        date: req.body.date,
        link: req.body.link,
        title: req.body.title,
        content: req.body.content,
        image: req.file.path
      });
      publication.categories.push(req.body.categoryId);
      return publication
        .save()
    })
    .then(result => { 
      res.status(201).json({
        message: 'Created publication successfully',
        createdPublication: {
          id: result.id,
          date: result.date,
          link: result.link,
          title: result.title,
          content: result.content,
          categories: result.categories,
          image: req.file.path, 
          request: {
            type: 'GET',
            url: 'http://localhost:3000/publications/' + result.id
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
  Publication.update(
    { id: id },
    { $set: updateOps })
    .exec()
    .then( result => {
      res.status(200).json({
        message: 'Publication updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/publications/' + id
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
  Publication.remove({id: id})
    .exec()
    .then(publication => {
      if (!publication) {
        return res.status(404).json({
          message: 'Publication not found'
        });
      }
      res.status(200).json({
        message: 'Publication deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:3000/publications/'
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
  getById,
  getByCategory,
  insert,
  update,
  remove,
};