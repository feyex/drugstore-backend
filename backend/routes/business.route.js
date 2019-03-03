const express = require('express');
const app = express();
const businessRoutes = express.Router();

//require business model in route model
let Business = require('../models/Business');

//Defined store route
businessRoutes.route('/add').post(function (req, res) {
  let business = new Business(req.body);
  business.save()
    .then(business => {
      res.status(200).json({'business': 'business is added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
businessRoutes.route('/').get(function (req, res) {
  Business.find(function (err, businesses){
  if(err){
    console.log(err);
  }
  else {
    res.json(businesses);
  }
});
});

// Defined edit route
businessRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Business.findById(id, function (err, business){
      res.json(business);
  });
});


//  Defined update route
businessRoutes.route('/update/:id').post(function (req, res) {
  let id = req.params.id;
  Business.findById(id, function(err, business) {
    $set: {
      business.drug_name = req.body.drug_name;
      business.quantity = req.body.quantity;
     business.price = req.body.price;
     business.save().then(business => {
      res.json('Update complete');
    })
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, 
  
  (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })

});

// Defined delete | remove | destroy route
businessRoutes.route('/delete/:id').get(function (req, res) {
  Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
      if(err) res.json(err);
      else res.json('Successfully removed');
  });
});

// Define Search
businessRoutes.route('/search?').get(function (req, res) {
  Business.find({$or:[{name: req.query.q}, {price: req.query.q}]}, 
    (err, business) => {
      if (err) {
        return res.status(422).send({
          message: 'error'
        });
      } else {
        res.json(business);
      }
  });
});

module.exports = businessRoutes;