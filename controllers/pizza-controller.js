const { Pizza } = require('../models');


const pizzaController = {
    //same as .GETs
    // get all pizzas
    getAllPizza(req, res) {
      Pizza.find({})
      .populate({//this is to make comments populate
        path: 'comments',
        select: '-__v'//if we dont have this line it would return only __v field
      })
      .select('-__v')
      .sort({ _id: -1 })//sort new to old
      .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  
    // get one pizza by id
    getPizzaById({ params }, res) {
      Pizza.findOne({ _id: params.id })
        .populate({//this is to make comments populate
          path: 'comments',
          select: '-__v'
        })
        .select('-__v')
        .then(dbPizzaData => {
          // If no pizza is found, send 404
          if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
          }
          res.json(dbPizzaData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },

    // createPizza // same as .POST
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

  //same as .PUT
  // update pizza by id
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true  })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete pizza
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }

  }

module.exports = pizzaController;