const express           = require("express");
const router            = express.Router();

const routes = function () {

  router.get('/', (req, res) => {
    res.render('home');
  });

  router.get('/*', (req, res) => {
    res.render('home');
  });

  return router;
}

module.exports = routes;
