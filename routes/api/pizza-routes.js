const router = require('express').Router();
const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
  } = require('../../controllers/pizza-controller');

//NOTE // this code
        // router.route('/').get(getCallbackFunction).post(postCallbackFunction);
// // is this same as this
        // router.get('/', getCallbackFunction);
        // router.post('/' postCallbackFunction);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!ASK ABOUT HOW BELOW RELATES TO REQ RES


// Set up GET all and POST at /api/pizzas
// /api/pizzas
router
.route('/')
.get(getAllPizza)
.post(createPizza);

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
// /api/pizzas/:id
router
  .route('/:id')
  .get(getPizzaById)
  .put(updatePizza)
  .delete(deletePizza);

module.exports = router;